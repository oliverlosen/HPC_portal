/* Independent intent scenarios + editorial corpus consistency. No DOM/network required. */
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),ctx={window:{}};
for(const name of ['data','smart-knowledge','smart-engine'])vm.runInNewContext(fs.readFileSync(path.join(root,'dist',name+'.js'),'utf8'),ctx);
const {HPC_SMART_ENGINE:E,HPC_SMART_KNOWLEDGE:K,HPC_DATA:D}=ctx.window;
const parse=(text,context={})=>E.analyze(text,context,D);
const cases=[
 ['barrenos','project',{project:'drill'}],
 ['servicio','service',{}],
 ['centros','service',{}],
 ['garantías','warranty',{}],
 ['factura','register',{}],
 ['ayuda','help',{}],
 ['Mi barreno no enciende','service',{}],
 ['La aspiradora dejó de funcionar','service',{}],
 ['No tengo factura para garantía','warranty',{}],
 ['Se descompuso el ROTI-20A3','service',{}],
 ['Hidrolavadora para los asientos del carro','clarify',{}],
 ['Lavar a presión la tapicería','clarify',{}],

 ['Ando buscando un bareno para concrecto, de vez en cuando y barato','project',{project:'drill',material:'concrete',frequency:'occasional',priority:'economy'}],
 ['TALADRO PARA METAL TODOS LOS DÍAS CON MAYOR CAPACIDAD','project',{project:'drill',material:'metal',frequency:'daily',priority:'power'}],
 ['Necesito atornillar MDF cada semana, quiero equilibrio','project',{project:'drill',material:'wood',frequency:'regular',priority:'balance'}],
 ['Poner un soporte en una pared','project',{project:'drill'}],
 ['Hidrolabadora para lavar la moto ocasionalmente y economica','project',{project:'wash',material:'car',frequency:'occasional',priority:'economy'}],
 ['Aspirar las alfombras del carro, a diario, presupuesto','project',{project:'vacuum',material:'car',frequency:'daily',priority:'economy'}],
 ['Un chorro para el lavatrastos','project',{project:'faucet',material:'kitchen'}],
 ['Grifo para la ducha todos los dias barato','project',{project:'faucet',material:'shower',frequency:'daily',priority:'economy'}],
 ['Chorro de lavamanos de vez en cuando buena combinacion','project',{project:'faucet',material:'bathroom',frequency:'occasional',priority:'balance'}],
 ['Lavar patio y moto cada semana','project',{project:'wash',material:'both',frequency:'regular'}],
 ['Sacar polvo del interior de mi automóvil','project',{project:'vacuum',material:'car'}],
 ['Aspiradora para recoger agua en mi taller','project',{project:'vacuum',material:'liquids'}],
 ['Aspirdora para bodega con mayor capacidad','project',{project:'vacuum',material:'workshop',priority:'power'}],
 ['Me gustaria limpiar mi carro','clarify',{}],
 ['Quiero un barreno y también una aspiradora','clarify',{}],
 ['No quiero hidrolavadora, sino aspiradora para el carro','project',{project:'vacuum',material:'car'}],
 ['No es para madera, es para concreto','project',{project:'drill',material:'concrete'},{project:'drill',material:'wood'}],
 ['No quiero algo caro, busco un barreno','project',{project:'drill'}],
 ['Quiero un barreno que no sea caro','project',{project:'drill',priority:'economy'}],
 ['Necesito cortar metal con una sierra','unsupported',{}],
 ['Busco una aspiradora para gasolina','unsupported',{}],
 ['Quiero aspirar cenizas','unsupported',{}],
 ['Quiero un rotomartillo para demoler una pared','unsupported',{}],
 ['Necesito un compresor para pintar','unsupported',{}],
 ['mi taladro no funciona y necesito repararlo','service',{}],
 ['¿Dónde atienden mantenimiento en Quetzaltenango?','service',{}],
 ['garntia para mi aspiradora','warranty',{}],
 ['necesito registrar una factura','register',{}],
 ['Quiero consultar mi factura guardada','tools',{}],
 ['Ya compré un taladro, quiero guardar mi compra','register',{}],
 ['Cómo registro y veo mis herramientas','clarify',{}],
 ['Me das información sobre ROTI 20A3','product',{}],
 ['Busco el producto 103247','product',{}],
 ['Quiero conocer el ASPI-12','product',{}],
 ['Es el M-048PB','product',{}],
 ['Necesito un producto que no existe ABC-999','unknown',{}],
 ['¿Cuál es la capital de Guatemala?','unknown',{}],
 ['<script>alert("hola")</script>','unknown',{}],
 ['','unknown',{}],
 ['  !?  ','unknown',{}],
 ['No sé cuál comprar','clarify',{}],
 ['concreto','project',{project:'drill',material:'concrete'},{project:'drill'}],
 ['todos los días','project',{project:'wash',material:'patio',frequency:'daily'},{project:'wash',material:'patio'}],
 ['quiero cuidar mi presupuesto','project',{project:'vacuum',priority:'economy'},{project:'vacuum'}],
 ['mejor para metal','project',{project:'drill',material:'metal'},{project:'drill',material:'wood'}],
 ['ahora quiero lavar la terraza','project',{project:'wash',material:'patio'},{project:'drill',material:'concrete'}],
 ['perforar madera y concreto','project',{project:'drill'}],
 ['un barreno para madera, diario y ocasional','project',{project:'drill',material:'wood'}],
 ['No concreto','clarify',{}, {project:'drill',material:'concrete'}]
];
const errors=[];
for(const [text,intent,entities,context] of cases){const r=parse(text,context);try{assert.equal(r.intent,intent);for(const [k,v] of Object.entries(entities))assert.equal(r.entities[k],v);}catch(e){errors.push({text,expected:{intent,entities},actual:r});}}
for(const row of K.corpus){const r=parse(row.text);if(r.intent!==row.intent||Object.entries(row.entities).some(([k,v])=>r.entities[k]!==v))errors.push({corpus:row.text,actual:r});}
assert.ok(K.corpus.length>=200);assert.equal(new Set(K.corpus.map(r=>r.text.toLowerCase())).size,K.corpus.length);
assert.ok(parse('Quiero un barreno').missing.includes('frequency'));
assert.ok(parse('Quiero un barreno').missing.includes('priority'));
assert.ok(parse('perforar madera y concreto').missing.includes('material'));
assert.ok(parse('un barreno para madera, diario y ocasional').missing.includes('frequency'));
assert.equal(parse('No concreto',{project:'drill',material:'concrete'}).entities.material,undefined,'Negation must clear the rejected material from context');
assert.equal(parse('Ahora quiero lavar el patio',{project:'drill',material:'wood',frequency:'daily',priority:'power'}).entities.frequency,undefined);
assert.equal(parse('ROTI-20A3').productId,'drill-pro');
assert.equal(parse('ASPI 12').productId,'vacuum-large');
assert.equal(parse('No quiero ROTI-20A3').productId,null);
assert.equal(parse('ahora quiero una aspiradora',{project:'drill',material:'concrete'}).entities.material,undefined);
if(errors.length){console.error(JSON.stringify(errors,null,2));process.exit(1);}
console.log(`OK: ${cases.length} independent scenarios, ${K.corpus.length} annotated phrases, negation, ambiguity, corrections, direct models, no invented frequency/priority.`);
