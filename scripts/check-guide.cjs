/* Behavioral checks with a minimal browser adapter. No layout or network checks. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

function browser() {
  const elements = new Map();
  const element = id => {
    if (!elements.has(id)) elements.set(id, {innerHTML:'', style:{}, classList:{add(){}, remove(){}}, querySelector(){return null;}});
    return elements.get(id);
  };
  const documentListeners = {}, windowListeners = {}, storage = new Map();
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
    setTimeout(){return 0;}, clearTimeout(){}, requestAnimationFrame(callback){callback();return 0;}, console
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
  return {window, html, overlay, click, guide, events:()=>JSON.parse(storage.get('hpc-demo-events'))};
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
console.log(`OK: ${drillChecks} drill combinations; 144 valid guide combinations; rendered controls, alternative events and 8 vacuum explanations. Layout, external images and receipts require a real browser.`);
