/* Behavioral checks with a minimal browser adapter. No layout or network checks. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

function browser(seed={}, now) {
  const elements = new Map();
  const element = id => {
    if (!elements.has(id)) elements.set(id, {innerHTML:'', style:{}, classList:{add(){}, remove(){}}, querySelector(){return null;}});
    return elements.get(id);
  };
  const documentListeners = {}, windowListeners = {}, storage = new Map(Object.entries(seed));
  let hash = '', pendingHash = false;
  const location = {search:'', get hash(){return hash;}, set hash(value){hash='#'+value.replace(/^#/, '');pendingHash=true;}};
  const document = {
    body:element('body'), activeElement:null, title:'',
    getElementById:element, querySelector(){return null;}, querySelectorAll(){return [];},
    addEventListener(name, callback){documentListeners[name]=callback;}
  };
  const window = {addEventListener(name, callback){windowListeners[name]=callback;}, dispatchEvent(){}, scrollTo(){}};
  const context = vm.createContext({window, document, location, URLSearchParams, performance,
    CustomEvent:class {constructor(name, init){this.type=name;this.detail=init.detail;}},
    localStorage:{getItem:key=>storage.get(key)??null, setItem:(key,value)=>storage.set(key,value)},
    setTimeout(){return 0;}, clearTimeout(){}, requestAnimationFrame(callback){callback();return 0;}, console,
    ...(now?{Date:class extends Date {constructor(...args){args.length?super(...args):super(now);} static now(){return new Date(now).getTime();}}}:{})
  });
  vm.runInContext(read('dist/data.js'), context, {filename:'dist/data.js'});
  vm.runInContext(read('dist/app.js'), context, {filename:'dist/app.js'});
  const html = () => element('app').innerHTML;
  const overlay = () => element('overlay-root').innerHTML;
  function click(action, values={}) {
    const buttons = [...(html()+overlay()).matchAll(/<button\b([^>]*)>[\s\S]*?<\/button>/g)];
    const found = buttons.map(match=>{
      const attrs = Object.fromEntries([...match[1].matchAll(/([\w-]+)="([^"]*)"/g)].map(x=>[x[1],x[2]]));
      const dataset = Object.fromEntries(Object.entries(attrs).filter(([key])=>key.startsWith('data-')).map(([key,value])=>[key.slice(5),value]));
      return {attrs:match[1], dataset};
    }).find(button=>button.dataset.action===action&&Object.entries(values).every(([key,value])=>button.dataset[key]===value));
    assert.ok(found, `Missing rendered control: ${action} ${JSON.stringify(values)}`);
    assert.doesNotMatch(found.attrs, /\sdisabled\b/, 'Cannot click a disabled control');
    const target = {dataset:found.dataset, closest(){return this;}};
    documentListeners.click({target});
    if(pendingHash){pendingHash=false;windowListeners.hashchange();}
  }
  function guide(project, material, frequency, priority) {
    click('nav', {route:'inicio'});
    click('start', {category:project});
    for(const value of [material,frequency,priority]){click('choose',{value});click('next');}
    return html();
  }
  function navigate(value) {
    location.hash = value;
    pendingHash = false;
    windowListeners.hashchange();
  }
  return {window, html, overlay, click, guide, navigate, events:()=>JSON.parse(storage.get('hpc-demo-events'))};
}

const b = browser();
const choose = b.window.HPC_GUIDE.chooseProduct;
const frequencies = ['occasional','regular','daily'];
const priorities = ['economy','balance','power'];
const rows = {
  wood:[['drill-single','drill-pro','drill-pro'],['drill-single','drill-pro','drill-pro'],['drill-pro','drill-pro','drill-pro']],
  metal:[['drill-single','drill-pro','drill-pro'],['drill-single','drill-pro','drill-pro'],['drill-pro','drill-pro','drill-pro']],
  block:[['drill-single','drill-pro','drill-sds'],['drill-single','drill-pro','drill-sds'],['drill-single','drill-sds','drill-sds']],
  concrete:Array.from({length:3},()=>['drill-sds','drill-sds','drill-sds'])
};
let drillChecks=0;
for(const [material, expected] of Object.entries(rows)){
  frequencies.forEach((frequency,f)=>priorities.forEach((priority,p)=>{
    assert.equal(choose({project:'drill',material,frequency,priority}).id, expected[f][p], `${material}/${frequency}/${priority}`);
    drillChecks++;
  }));
}
for(const project of b.window.HPC_DATA.projects){
  for(const [material] of project.materials){
    for(const frequency of frequencies){
      for(const priority of priorities){
        const product=choose({project:project.id,material,frequency,priority});
        if(project.id==='faucet'&&material!=='bathroom')assert.equal(product,null);
        else assert.equal(product?.category,project.id);
        const html=b.guide(project.id,material,frequency,priority);
        if(product)assert.ok(html.includes(`Modelo ${product.model}`),'Guide must render its selected model');
        else assert.match(html,/Encontramos una necesidad para explorar/);
      }
    }
  }
}

for(const material of ['wood','metal']){
  const html=b.guide('drill',material,'daily','economy');
  assert.match(html,/Modelo ROTI-20A3/);
  assert.match(html,/sin percusión/);
  assert.match(html,/dos baterías de 2 Ah/);
  assert.match(html,/uso intenso o continuo, consulta con HPC/);
  b.click('compare');
  assert.doesNotMatch(b.overlay(),/drill-sds|ROEL-50N2/);
  assert.match(b.overlay(),/data-id="drill-single"/);
  const before=b.events().length;
  b.click('close',{id:'drill-pro'});
  assert.equal(b.events().length,before,'Mantener esta must not track an alternative');
  assert.equal(b.overlay(),'');
  b.click('compare');
  b.click('select-alternative',{id:'drill-single'});
  assert.match(b.html(),/Modelo ROTI-20A2/);
  assert.match(b.html(),/una batería de 2 Ah/);
  assert.equal(b.events().filter(e=>e.name==='alternative_selected').length,material==='wood'?1:2);
}
for(const material of ['block','concrete']){
  const html=b.guide('drill',material,'daily','power');
  const reason=html.match(/class="why-card">[\s\S]*?<p>(.*?)<\/p>/)[1];
  assert.match(html,/Modelo ROEL-50N2/);
  assert.doesNotMatch(reason,/inalámbrico|atornill/);
}
const vacuumUses={home:'la limpieza de tu casa y espacios pequeños',car:'el interior de tu carro',workshop:'tu taller o negocio',liquids:'la limpieza de sólidos y líquidos'};
for(const [material,text] of Object.entries(vacuumUses)){
  for(const priority of ['economy','power']){
    const html=b.guide('vacuum',material,'occasional',priority);
    const reason=html.match(/class="why-card">[\s\S]*?<p>(.*?)<\/p>/)[1];
    assert.ok(reason.includes(text),`${material}/${priority}: incorrect vacuum explanation`);
  }
}
assert.equal(choose({project:'faucet',material:'bathroom'}).id,'faucet-basic');
assert.equal(choose({project:'faucet',material:'kitchen'}),null);
assert.equal(choose({}),null);
assert.match(b.html(),/w=828/);

const washSurfaces={car:'tu carro o moto',patio:'tu patio o terraza',both:'tu carro, el patio y otros espacios de la casa',heavy:'superficies muy sucias'};
for(const [material,text] of Object.entries(washSurfaces)){
  const reason=b.guide('wash',material,'occasional','balance').match(/class="why-card">[\s\S]*?<p>(.*?)<\/p>/)[1];
  assert.ok(reason.startsWith(`Quieres limpiar ${text}.`),`${material}: incorrect wash explanation`);
}

// Going back to a recommendation from an earlier guide must not mix its answers.
b.guide('drill','wood','daily','power');
b.click('compare');
b.click('select-alternative',{id:'drill-single'});
b.guide('wash','car','occasional','balance');
b.navigate('recomendacion/drill-single');
assert.match(b.html(),/Modelo ROTI-20A2/);
assert.doesNotMatch(b.html(),/Lavar con presión|Mi carro o moto/);
b.guide('drill','concrete','regular','balance');
b.navigate('recomendacion/drill-single');
assert.doesNotMatch(b.html(),/Elegiste trabajar sobre concreto|<span class="chip">Concreto<\/span>/);
b.guide('drill','wood','daily','power');
b.click('compare');
b.click('select-alternative',{id:'drill-single'});
assert.match(b.html(),/Buscas trabajar sobre madera/,'An alternative keeps the answers of its own guide');

// The attention code summarizes the four answers; it only appears with the answers of the guide that chose the product.
const attentionCodes=new Set();
for(const project of b.window.HPC_DATA.projects)for(const [material] of project.materials)for(const frequency of frequencies)for(const priority of priorities)
  attentionCodes.add(b.window.HPC_GUIDE.attentionCode({project:project.id,material,frequency,priority}));
assert.equal(attentionCodes.size,144,'Each combination needs its own attention code');
assert.ok([...attentionCodes].every(code=>/^[PLAG][1-4][1-3][1-3][ACDEFHJKLMNPRTUVWXY]$/.test(code)));
assert.equal(b.window.HPC_GUIDE.attentionCode({project:'drill',material:'wood'}),null);
b.guide('drill','concrete','occasional','economy');
b.click('colleague');
const attentionCodeShown=code=>`CÓDIGO DE ATENCIÓN</small><strong>${code}</strong>`;
assert.ok(b.overlay().includes(attentionCodeShown('P412L')),'Colleague screen must show the attention code');
b.click('close');
b.guide('drill','wood','daily','power');
b.click('compare');
b.click('select-alternative',{id:'drill-single'});
b.click('colleague');
assert.ok(b.overlay().includes(attentionCodeShown('P133T')),'An alternative keeps the attention code of its guide');
b.click('close');
assert.ok(b.guide('faucet','kitchen','occasional','balance').includes(attentionCodeShown('G211M')),'No-match page must show the attention code');
const direct=browser();
direct.navigate('recomendacion/drill-single');
direct.click('colleague');
assert.match(direct.overlay(),/CÓDIGO DE PRODUCTO/);
assert.doesNotMatch(direct.overlay(),/CÓDIGO DE ATENCIÓN/,'A direct link has no answers to summarize');

// Each purchase record gets its own card, even for the same product.
const record=(id,date)=>({id,productId:'drill-pro',date,store:'Tienda',serial:'',receiptId:null,receiptName:null,createdAt:'2026-10-18T00:00:00.000Z'});
const tools=browser({'hpc-records':JSON.stringify([record('r1','2026-10-01'),record('r2','2026-10-05')]),'hpc-saved':JSON.stringify([{id:'drill-pro',at:'2026-10-01T00:00:00.000Z',store:'cemaco'}])});
tools.navigate('herramientas');
assert.deepEqual([...tools.html().matchAll(/data-action="record" data-id="([^"]+)"/g)].map(m=>m[1]),['r1','r2']);
assert.match(tools.html(),/<span class="nav-number">2<\/span>/);

// At 20:00 in Guatemala the UTC date is already the next day; the purchase date limit must stay local.
process.env.TZ='America/Guatemala';
const evening=browser({}, '2026-10-13T02:00:00Z');
evening.navigate('herramientas');
evening.click('register');
assert.match(evening.overlay(),/max="2026-10-12"/,'Purchase date limit must use the local date');

console.log(`OK: ${drillChecks} drill combinations; 144 valid guide combinations; rendered controls, alternative events, 8 vacuum and 4 wash explanations, back navigation, 144 attention codes, one card per purchase record and local purchase date. Layout, external images and receipts require a real browser.`);
