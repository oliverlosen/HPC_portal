/* Reproducible offline previews. No network or build dependencies. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const check=process.argv.includes('--check'),differences=[];
const write=(file,value)=>{if(check){if(!fs.existsSync(path.join(root,file))||read(file)!==value)differences.push(file);}else fs.writeFileSync(path.join(root,file),value,'utf8');};
const safe=value=>JSON.stringify(value).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
const tag=source=>'<script>\n'+source.replace(/<\/script/gi,'<\\/script')+'\n</script>';
const inlineStyle=css=>'<style>\n'+css+'\n</style>';
const dataUrl=(file,mime)=>`data:${mime};base64,${fs.readFileSync(path.join(root,file)).toString('base64')}`;
const models=fs.readdirSync(path.join(root,'dist/assets/products')).filter(f=>f.endsWith('.jpg')).sort();
const assets=Object.fromEntries(models.map(f=>[path.basename(f,'.jpg'),dataUrl('dist/assets/products/'+f,'image/jpeg')]));
const fonts=read('dist/fonts.css').replace(/url\(([^)]+)\)/g,(_,file)=>`url(${dataUrl('dist/'+file,'font/ttf')})`);
const icon=dataUrl('dist/assets/favicon.svg','image/svg+xml');
const common=['storage.js','smart-knowledge.js','smart-engine.js','smart-ui.js'].map(f=>read('dist/'+f)).join('\n');
const localAssets='window.HPC_ASSETS = window.HPC_ASSETS || '+safe(Object.fromEntries(models.map(f=>[path.basename(f,'.jpg'),'../dist/assets/products/'+f])))+';';
let internal=read('prototipos/portal-interno.html');
internal=internal.replace(/\/\* HPC_SHARED_BEGIN \*\/[\s\S]*?\/\* HPC_SHARED_END \*\//,()=>`/* HPC_SHARED_BEGIN */\n${localAssets}\n${common}\n/* HPC_SHARED_END */`);
write('prototipos/portal-interno.html',internal);
function clientHTML(offline){
 let html=read('dist/index.html');
 html=html.replace(/<link rel="stylesheet" href="([^"]+)">/g,(_,file)=>file==='fonts.css'?(offline?inlineStyle(fonts):''):inlineStyle(read('dist/'+file)));
 html=html.replace(/<script src="([^"]+)" defer><\/script>/g,'');
 html=html.replace('href="assets/favicon.svg"',`href="${icon}"`);
 const scripts=[offline?'window.HPC_ASSETS='+safe(assets)+';':'',read('dist/storage.js'),read('dist/data.js'),read('dist/smart-knowledge.js'),read('dist/smart-engine.js'),read('dist/smart-ui.js'),read('dist/app.js')].join('\n');
 return html.replace('</body>',()=>tag(scripts)+'\n</body>');
}
function internalHTML(){
 return internal.replace(/<link rel="stylesheet" href="\.\.\/dist\/([^"]+)">/g,(_,file)=>file==='fonts.css'?'':inlineStyle(read('dist/'+file)));
}
const literal=name=>{const match=internal.match(new RegExp(`const ${name} = (\\[[\\s\\S]*?\\n  \\]);`));if(!match)throw Error('Missing '+name);return vm.runInNewContext('('+match[1]+')');};
const ctx={window:{}};vm.runInNewContext(read('dist/data.js'),ctx);
const bundle={cliente:clientHTML(false),interno:internalHTML(),inteligencia:read('presentation/inteligencia-comercial.html'),collaborators:literal('COLLABORATORS'),accounts:literal('ACCOUNTS'),stores:ctx.window.HPC_DATA.stores};
const fontLicenses=['OFL-DM-Sans.txt','OFL-Manrope.txt'].map(f=>read('dist/assets/fonts/'+f)).join('\n\n');
let unified=read('presentation/shell.html').replace('<!-- HPC_HEAD -->',()=>`<link rel="icon" href="${icon}">\n<!-- Embedded font licenses\n${fontLicenses.replace(/-->/g,'-- >')}\n-->\n`+inlineStyle(fonts+'\n'+read('presentation/shell.css')));
unified=unified.replace('<!-- HPC_SCRIPTS -->',()=>tag('window.HPC_ASSETS='+safe(assets)+';\nwindow.HPC_FONT_CSS='+safe(fonts)+';\nwindow.HPC_BUNDLE='+safe(bundle)+';\n'+read('dist/storage.js')+'\n'+read('presentation/shell.js')));
fs.mkdirSync(path.join(root,'preview'),{recursive:true});
write('preview/HPC_Cliente_Mockup.html',clientHTML(true));
write('HPC_Portal_Unificado.html',unified);
if(differences.length){console.error('Regenera los archivos: '+differences.join(', '));process.exit(1);}
console.log(`${check?'Comprobado':'HTML unificado'}: ${Buffer.byteLength(unified)} bytes; ${models.length} fotografías integradas. Copia de cliente y módulos compartidos ${check?'al día':'actualizados'}.`);
