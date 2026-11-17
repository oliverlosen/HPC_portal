const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),vm=require('node:vm'),{execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
execFileSync(process.execPath,[path.join(root,'scripts/export-preview.cjs'),'--check'],{stdio:'pipe'});
const html=read('HPC_Portal_Unificado.html');
const extract=name=>JSON.parse(html.match(new RegExp(`window\\.${name}=(.+);\\n`))[1]);
const assets=extract('HPC_ASSETS'),bundle=extract('HPC_BUNDLE'),fonts=extract('HPC_FONT_CSS');
assert.equal(Object.keys(assets).length,9);
for(const [model,url]of Object.entries(assets)){assert.match(url,/^data:image\/jpeg;base64,/);const bytes=Buffer.from(url.split(',')[1],'base64');assert.equal(bytes[0],255);assert.ok(bytes.length>10000,model);}
assert.ok(fonts.includes('data:font/ttf;base64,'));assert.doesNotMatch(fonts,/https?:/);
assert.equal(bundle.collaborators.length,5);assert.equal(bundle.accounts.length,2);
assert.equal(bundle.inteligencia,read('presentation/inteligencia-comercial.html'));
for(const [name,document]of Object.entries({shell:html,client:bundle.cliente,internal:bundle.interno,intelligence:bundle.inteligencia,portable:read('preview/HPC_Cliente_Mockup.html')})){
 assert.doesNotMatch(document,/<script\b[^>]*\bsrc\s*=/i,`${name}: external script`);
 assert.doesNotMatch(document,/<link\b[^>]*href=["'](?:https?:|\.\.\/|styles|fonts|smart|polish)/i,`${name}: external style`);
 for(const [index,script]of [...document.matchAll(/<script>([\s\S]*?)<\/script>/g)].entries())new vm.Script(script[1],{filename:`${name}-${index}.js`});
}
assert.ok(bundle.cliente.includes('window.HPC_SMART_ENGINE'));
assert.ok(bundle.interno.includes('window.HPC_SMART_ENGINE'));
assert.ok(html.includes('SIL OPEN FONT LICENSE'));
console.log('OK: reproducible standalone HTML, 9 embedded JPEGs, embedded fonts/licenses, isolated portals, no external stylesheet/script dependencies, JavaScript syntax.');
