/* Comprobaciones del portal interno (prototipos/portal-interno.html), sin dependencias.
   El portal copia de la guía de clientes los productos, reglas, preguntas, explicaciones, centros de servicio y textos
   de garantía. Este script confirma que siguen iguales a dist/data.js y dist/app.js, y prueba funciones propias del
   portal. No comprueba diseño, red ni el comportamiento en un navegador. */
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const PORTAL = 'prototipos/portal-interno.html';

// Adaptador mínimo del navegador: suficiente para cargar los scripts, sin dibujar nada.
function context() {
  const element = () => ({innerHTML:'', hidden:true, style:{}, classList:{add(){}, remove(){}, toggle(){}},
    querySelector(){return null;}, querySelectorAll(){return [];}, append(){}, focus(){}, scrollIntoView(){}, setAttribute(){}, addEventListener(){}});
  const elements = {};
  const document = {body:element(), title:'', activeElement:null, getElementById:id => elements[id] || (elements[id] = element()),
    querySelector(){return null;}, querySelectorAll(){return [];}, addEventListener(){}, createElement:element};
  return vm.createContext({window:{addEventListener(){}, dispatchEvent(){}, scrollTo(){}}, document, location:{search:'', hash:''},
    URL, URLSearchParams, TextEncoder, performance, console, Intl,
    CustomEvent:class {constructor(name, init){this.type = name; this.detail = init && init.detail;}},
    localStorage:{getItem:() => null, setItem(){}, removeItem(){}}, setTimeout(){return 0;}, clearTimeout(){},
    requestAnimationFrame(callback){callback(); return 0;}, HTMLImageElement:function(){}, navigator:{}, Blob:function(){}, innerWidth:1280});
}

// Guía de clientes
const guideContext = context();
vm.runInContext(read('dist/data.js'), guideContext, {filename:'dist/data.js'});
vm.runInContext(read('dist/app.js'), guideContext, {filename:'dist/app.js'});
const data = guideContext.window.HPC_DATA, guide = guideContext.window.HPC_GUIDE;
const appSource = read('dist/app.js');

// Portal interno: un solo script en línea, sin scripts externos
const html = read(PORTAL);
const problems = [];
if (/<script\s[^>]*src=/i.test(html)) problems.push('el portal no debe cargar scripts externos');
const inline = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
if (inline.length !== 1) throw new Error(`${PORTAL} debe tener un solo script en línea; tiene ${inline.length}`);
const portalContext = context();
vm.runInContext(inline[0][1], portalContext, {filename:PORTAL});
const portal = portalContext.window.HPC_PORTAL;
if (!portal) throw new Error(`${PORTAL} debe exponer window.HPC_PORTAL`);

// Los objetos vienen de contextos distintos: se comparan como JSON.
const same = (label, actual, expected) => {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) problems.push(`${label}: portal=${JSON.stringify(actual)} esperado=${JSON.stringify(expected)}`);
};
const combinations = [];
for (const p of data.projects) for (const [m] of p.materials) for (const [f] of data.frequency) for (const [pr] of data.priorities)
  combinations.push({project:p.id, material:m, frequency:f, priority:pr});

// 1. Regla de recomendación: las 144 combinaciones de respuestas
for (const answers of combinations)
  same(`regla ${JSON.stringify(answers)}`, portal.chooseProduct(answers)?.id ?? null, guide.chooseProduct(answers)?.id ?? null);

// 2. Productos, tiendas, preguntas y orden de las opciones
const fields = ['id','category','code','model','brand','name','subtitle','image','price','tier','features','source','area'];
same('cantidad de productos', portal.products.length, data.products.length);
for (const p of data.products) {
  const mine = portal.products.find(x => x.id === p.id);
  if (!mine) { problems.push(`falta el producto ${p.id}`); continue; }
  for (const field of fields) same(`${p.id}.${field}`, mine[field], p[field]);
}
const needs = list => list.map(p => [p.id, p.name, p.letter, p.materialQuestion, p.materials.map(m => m.slice(0, 2))]);
same('necesidades, letras del código, materiales y su pregunta', needs(portal.projects), needs(data.projects));
same('frecuencias', portal.frequency.map(f => f.slice(0, 2)), data.frequency.map(f => f.slice(0, 2)));
same('prioridades', portal.priority.map(f => f.slice(0, 2)), data.priorities.map(f => f.slice(0, 2)));
same('tiendas', portal.stores.map(s => [s.id, s.name]), data.stores.map(s => [s.id, s.name]));
for (const [key, text] of Object.entries(portal.questions))
  if (!appSource.includes(`'${text}'`)) problems.push(`pregunta ${key}: «${text}» no está en dist/app.js`);

// 3. Explicación y alternativas: reason() y candidatesFor() de dist/app.js con las mismas respuestas
const reasonSource = appSource.match(/function reason\(p\)\{[\s\S]*?\n  \}/);
const candidatesSource = appSource.match(/function candidatesFor\(p\)\{.*?return list;\}/);
if (!reasonSource || !candidatesSource) throw new Error('No se encontraron reason() o candidatesFor() en dist/app.js; actualiza este script si cambió su forma');
const original = vm.createContext({D:data, state:{answers:{}}});
vm.runInContext(`const productById=id=>D.products.find(p=>p.id===id);const project=()=>D.projects.find(p=>p.id===state.answers.project);
${reasonSource[0]}
${candidatesSource[0]}
this.reason=reason;this.candidatesFor=candidatesFor;`, original);
let explained = 0;
for (const answers of combinations) {
  const chosen = guide.chooseProduct(answers);
  if (!chosen) continue;
  explained++;
  original.state.answers = answers;
  const mine = portal.products.find(x => x.id === chosen.id);
  same(`explicación ${JSON.stringify(answers)}`, portal.reasonFor(mine, answers), original.reason(chosen));
  same(`alternativas ${JSON.stringify(answers)}`, portal.candidatesFor(mine, answers).map(x => x.id), original.candidatesFor(chosen).map(x => x.id));
}

// 4. Servicio y garantía: datos de dist/data.js y textos de dist/app.js
const S = portal.support;
same('centros de servicio', S.centers, data.centers);
same('política de garantía', S.policy, data.policy);
same('fuente de los centros', S.source, data.centersSource);
same('horario general de los centros', S.hours, data.centerHours);
const texts = [['teléfono', `tel:${S.tel}`], ['teléfono visible', S.phone], ['correo', `mailto:${S.email}`], ['garantía', S.warranty],
  ...S.points.flat().map(t => ['garantía', t]), ...S.faq.flat().map(t => ['pregunta frecuente', t])];
for (const [label, text] of texts) if (!appSource.includes(text)) problems.push(`${label}: «${text}» no está en dist/app.js`);

// 5. Enlaces de entrada del QR: categorías que reconoce la guía
const aliasSource = appSource.match(/const categoryAliases = (\{[^}]*\});/);
if (!aliasSource) throw new Error('No se encontró categoryAliases en dist/app.js; actualiza este script si cambió su forma');
const aliases = vm.runInNewContext(`(${aliasSource[1]})`);
for (const [value, label] of portal.qrCategories) {
  if (!value) continue;
  const project = data.projects.find(p => p.id === aliases[value]);
  if (!project) problems.push(`la guía no reconoce la categoría «${value}» del QR`);
  else same(`categoría ${value} del QR`, label, project.name);
}

// 6. Funciones propias del portal
// Precio mayorista de ejemplo: 72 % del público (Q 179 → Q 129); caja de 12 mezcladoras; 5 a 9 cajas 4 %, 10 o más 8 %.
const order = boxes => { const t = portal.totals([{id:'faucet-basic', boxes}]); return [t.rows[0].disc, t.net]; };
same('pedido de 4 cajas', order(4), [0, 6192]);
same('pedido de 5 cajas', order(5), [0.04, 7430.4]);
same('pedido de 10 cajas', order(10), [0.08, 14241.6]);
// Copia de datos entre computadoras: actualiza por identificador, no duplica, renumera y no deshace lo atendido.
const rank = x => x.status === 'pendiente' ? 0 : 1;
const merged = portal.mergeRecords([{id:'R-0001', uid:'a', status:'pendiente'}, {id:'R-0002', uid:'b', status:'pendiente'}],
  [{id:'R-0001', uid:'a', status:'atendida'}, {id:'R-0001', uid:'c', status:'pendiente'}, {id:'R-0002', uid:'b', status:'pendiente'}], 'R-', rank);
same('cargar una copia de datos', [merged.list.map(x => `${x.id} ${x.uid} ${x.status}`), merged.added, merged.updated, merged.renamed],
  [['R-0001 a atendida', 'R-0002 b pendiente', 'R-0003 c pendiente'], 1, 1, ['R-0001 → R-0003']]);
const kept = portal.mergeRecords([{id:'R-0001', uid:'a', status:'atendida'}], [{id:'R-0001', uid:'a', status:'pendiente'}], 'R-', rank);
same('una copia vieja no deshace lo atendido', [kept.list[0].status, kept.updated], ['atendida', 0]);
// Generador de QR: capacidad en bytes con corrección M de las versiones 1 a 10 (tabla de ISO/IEC 18004).
[14, 26, 42, 62, 84, 106, 122, 152, 180, 213].forEach((bytes, i) => {
  same(`QR de ${bytes} caracteres`, portal.qr.encode('x'.repeat(bytes)).version, i + 1);
  if (i < 9) same(`QR de ${bytes + 1} caracteres`, portal.qr.encode('x'.repeat(bytes + 1)).version, i + 2);
});
try { portal.qr.encode('x'.repeat(214)); problems.push('un enlace de 214 caracteres debe rechazarse'); }
catch (error) { if (!/demasiado largo/.test(error.message)) problems.push(`mensaje inesperado para un enlace largo: ${error.message}`); }
// Matriz leída con un lector de QR independiente (jsQR) el 2026-10-21. Si cambias el generador, vuelve a leer
// el código con un lector y actualiza este valor.
const sample = portal.qr.encode('https://example.com/smart-guide/?tienda=aki&origen=qr');
const digest = crypto.createHash('sha256').update(sample.modules.map(row => row.map(Number).join('')).join('\n')).digest('hex').slice(0, 16);
same('QR de referencia', [sample.version, sample.mask, digest], [4, 2, '8e0f5437a96c768d']);

// Código de atención: el portal lee el mismo código que muestra la guía y rechaza los errores de escritura más comunes.
const attentionCodes = new Set();
let typos = 0;
for (const answers of combinations) {
  const code = guide.attentionCode(answers);
  attentionCodes.add(code);
  same(`código de atención de ${JSON.stringify(answers)}`, portal.encodeAttention(answers), code);
  for (const typed of [code, code.toLowerCase(), ` ${code[0]}-${code.slice(1, 4)} ${code[4]} `])
    same(`leer el código «${typed}»`, portal.decodeAttention(typed), answers);
  // Un carácter cambiado o dos caracteres vecinos intercambiados
  const variants = [];
  for (let i = 0; i < code.length; i++)
    for (const c of /[A-Z]/.test(code[i]) ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '0123456789') variants.push(code.slice(0, i) + c + code.slice(i + 1));
  for (let i = 0; i < code.length - 1; i++) variants.push(code.slice(0, i) + code[i + 1] + code[i] + code.slice(i + 2));
  for (const typo of variants) if (typo !== code) {
    typos++;
    if (portal.decodeAttention(typo)) problems.push(`el código de atención «${typo}» (error de ${code}) se acepta como válido`);
  }
}
same('códigos de atención distintos', attentionCodes.size, combinations.length);
for (const p of data.products) for (const value of [p.code, p.model])
  if (portal.decodeAttention(value)) problems.push(`el código o modelo ${value} se confunde con un código de atención`);

// 7. Versión declarada: se revisa al final para saber si lo copiado sigue igual
if (portal.version !== data.version)
  problems.push(`${PORTAL} declara la versión ${portal.version} de la guía y dist/data.js tiene ${data.version}; si las demás comprobaciones pasan, actualiza GUIDE_VERSION en el portal`);

if (problems.length) {
  console.error(`${problems.length} diferencia(s) en el portal interno:\n- ${problems.slice(0, 30).join('\n- ')}`);
  process.exit(1);
}
console.log(`OK: el portal interno coincide con la guía ${data.version}: ${combinations.length} combinaciones de la regla, ${data.products.length} productos, preguntas y tiendas, ${explained} explicaciones y alternativas, ${S.centers.length} centros y ${texts.length} textos de servicio y garantía, categorías del QR. Código de atención: ${attentionCodes.size} códigos y ${typos} errores de escritura rechazados. Funciones del portal: descuentos por volumen, copia de datos y generador de QR (versiones 1 a 10). El diseño y los recorridos se revisan en un navegador.`);
