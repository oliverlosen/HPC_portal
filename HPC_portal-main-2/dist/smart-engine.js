/* Deterministic, offline intent parser. No network, storage, or UI side effects. */
(() => {
  'use strict';
  const K = window.HPC_SMART_KNOWLEDGE;
  const normalize = value => String(value||'').slice(0,1200).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/hidro\s+lavadora/g,'hidrolavadora').replace(/[^a-z0-9\s-]/g,' ').replace(/\b[a-z]+\b/g,w=>K.typos[w]||w).replace(/\s+/g,' ').trim();
  const exact = new Map(K.corpus.map(row=>[normalize(row.text),row]));
  const names = {drill:'Perforar y fijar',wash:'Lavar con presión',vacuum:'Aspirar y limpiar',faucet:'Cambiar un grifo'};
  const patterns = {
    drill:/\b(barrenos?|taladr\w*|rotomartillo|perfora\w*|barrenar|atornilla\w*|agujer\w*|agujerear|colgar|fijar|(instalar|poner|colocar|montar) (un |una )?(repisa|estante|soporte)|armar (un )?mueble)\b/,
    wash:/\b(hidrolavadora\w*|lavar|lavado|presion|carroceria|llantas|cochera)\b/,
    vacuum:/\b(aspira\w*|succion|recoger (el )?polvo|recoger (un )?derrame|recoger liquidos|recoger migas)\b/,
    faucet:/\b(grifo\w*|chorro\w*|griferia|mezcladora\w*|llave (de |para )?(agua|la ducha|el lavamanos)|regadera|lavamanos|lavatrastos|lavaplatos|fregadero)\b/
  };
  const surfaceRules = {
    drill:[['wood',/\b(madera|tablas?|plywood|mdf|melamina)\b/],['metal',/\b(metal\w*|lamina|aluminio|hierro|acero|perfil\w*)\b/],['block',/\b(block|ladrillo\w*)\b/],['concrete',/\b(concreto|hormigon|cemento)\b/]],
    wash:[['car',/\b(carro|moto|carroceria|vehiculos|camioneta|llantas)\b/],['patio',/\b(patio|terraza|garaje|cochera|entrada|piso exterior|pisos exteriores|paredes exteriores)\b/],['heavy',/\b(incrustada|muy suci\w*|muy pegada|mucho lodo|lodo pegado|mugre|limpieza pesada)\b/],['both',/\b(todo un poco|un poco de todo)\b/]],
    vacuum:[['home',/\b(casa|hogar|apartamento|cuartos?|habitacion|sala|espacios pequenos)\b/],['car',/\b(carro|asientos?|cabina|tapiceria|baul|camioneta)\b/],['workshop',/\b(taller|negocio|bodega|local|comercio|tienda|superficies amplias)\b/],['liquids',/\b(liquidos?|derrame\w*|agua)\b/]],
    faucet:[['bathroom',/\b(lavamanos|lavabo)\b/],['kitchen',/\b(cocina|lavatrastos|lavaplatos|fregadero)\b/],['shower',/\b(ducha|regadera)\b/]]
  };
  const frequencyRules = [['occasional',/\b(ocasional\w*|de vez en cuando|una vez al (mes|ano)|pocas veces|solo (esta|una) vez|esporadico|raras veces)\b/],['regular',/\b(varias veces al mes|semanal\w*|cada semana|fines de semana|regular\w*|frecuente\w*)\b/],['daily',/\b(diario|diariamente|todos los dias|cada dia|a diario|mi herramienta de trabajo)\b/]];
  const priorityRules = [['economy',/\b(economico|economica|barato|barata|baratito|baratita|presupuesto|ahorrar|bajo costo|menos caro|precio bajo)\b/],['power',/\b(mayor capacidad|mas capacidad|potente|potencia|mas fuerte|trabajo exigente|maxima capacidad)\b/],['balance',/\b(equilibrio|equilibrad\w*|balance|combinacion|calidad precio|precio calidad|intermedio)\b/]];
  const keys = ['project','material','frequency','priority'];
  const hits = (rules,text) => rules.filter(([,re])=>re.test(text)).map(([value])=>value);
  function analyze(input, context={}, data=window.HPC_DATA) {
    const raw = String(input||'').trim();
    const base = normalize(raw);
    const result = {intent:'unknown',entities:{},missing:[],choices:[],question:'',productId:null,unsupported:false};
    if(!base){result.question='Cuéntanos qué necesitas hacer, por ejemplo: perforar una pared de block.';return result;}
    // Budget negation is meaningful. Other explicitly rejected clauses cannot select a product.
    let t = normalize(raw.replace(/no (?:quiero )?gastar mucho|no muy car[oa]|que no sea car[oa]/gi,'economico'));
    const negated = /\b(no|nunca|sin)\b/.test(t);
    context={...context};
    const rejected=[...raw.matchAll(/\b(?:no|nunca)\b((?:(?!\b(?:pero|sino|mas bien)\b)[^,;.!?])*)/gi)].map(m=>normalize(m[1])).join(' ');
    if(rejected){
      for(const [id,re] of Object.entries(patterns))if(re.test(rejected)&&context.project===id){delete context.project;delete context.material;}
      if(context.project)for(const [value,re] of surfaceRules[context.project]||[])if(re.test(rejected)&&context.material===value)delete context.material;
      for(const [key,rules] of [['frequency',frequencyRules],['priority',priorityRules]])for(const [value,re] of rules)if(re.test(rejected)&&context[key]===value)delete context[key];
    }
    t = t.replace(/\bno\s+(?:es\s+para\s+|quiero\s+|necesito\s+|busco\s+)?[^,;.!?]*?(?=\bpero\b|\bsino\b|\bmas bien\b|$)/g,' ');
    // Use punctuation boundaries too (normalize deliberately removes punctuation).
    if(negated) t = raw.replace(/no (?:quiero )?gastar mucho|no muy car[oa]|que no sea car[oa]/gi,'economico').split(/[,;.!?]|\bpero\b|\bsino\b|\bmas bien\b/i).filter(x=>!/^\s*(?:no|nunca)\b/i.test(x)).map(normalize).join(' ').trim();
    if(/\b(sin percusion)\b/.test(t))t=t.replace(/sin percusion/g,'');
    const row = exact.get(base);
    if(row?.intent==='help'){result.intent='help';return result;}
    const products = data?.products || [];
    const compact = base.replace(/[^a-z0-9]/g,'');
    const product = products.find(p=>new RegExp(`(?:^| )${p.code}(?: |$)`).test(base) || compact.includes(normalize(p.model).replace(/[^a-z0-9]/g,'')));
    const services = [];
    const quickTopics={garantia:'warranty',garantias:'warranty',servicio:'service',servicios:'service',centros:'service',contacto:'service',ayuda:'help',factura:'register',facturas:'register',registro:'register',herramientas:'help'};
    if(quickTopics[base]){result.intent=quickTopics[base];return result;}
    if(/\b(no funciona|no enciende|se arruino|se descompuso|esta roto|dejo de funcionar|se quemo|averia|fallando)\b/.test(base)){
      result.intent='service';return result;
    }
    if(/no tengo (?:la )?factura/.test(base)&&/garantia/.test(base)){result.intent='warranty';return result;}
    if(/\b(hidrolavadora|presion)\b/.test(t)&&/\b(interior|asientos?|tapiceria)\b/.test(t)){
      result.intent='clarify';result.question='La guía distingue lavar el exterior de aspirar el interior. ¿Qué tarea necesitas?';
      result.choices=[{kind:'answers',value:'wash-car',label:'Lavar el exterior',entities:{project:'wash',material:'car'}},{kind:'answers',value:'vacuum-car',label:'Aspirar el interior',entities:{project:'vacuum',material:'car'}}];return result;
    }
    if(/\b(garantia|cobertura|consumibles|accesorios|reparacion.*gratis)\b/.test(t))services.push('warranty');
    if(/\b(centros? de servicio|servicio autorizado|mantenimiento|reparar\w*|reparacion|horario|direccion|telefono|contacto|contactar|contacto? a|asesor)\b/.test(t)&&!services.length)services.push('service');
    if(/\b(mis herramientas|guardad\w*|mis compras|ver mi|abrir mi|consultar mi|mi registro)\b/.test(t)&&/\b(herramienta\w*|recomendacion\w*|factura|comprobante|compra\w*|registro)\b/.test(t))services.push('tools');
    if(/\b(registra\w*|registro|guardar|guardo|subir|adjunto|adjuntar|agregar|ya compre)\b/.test(t)&&/\b(herramientas?|productos?|barreno|compras?|factura|comprobante|datos)\b/.test(t)&&(!services.includes('tools')||/como registro|quiero registrar|registrar y/.test(t)))services.push('register');
    if(services.length>1){result.intent='clarify';result.question='¿Qué quieres consultar primero?';result.choices=services.map(value=>({kind:'intent',value,label:{warranty:'Garantía',service:'Servicio y ayuda',tools:'Mis herramientas',register:'Registrar compra'}[value]}));return result;}
    if(services.length){result.intent=services[0];return result;}
    if(product&&!negated){result.intent='product';result.productId=product.id;return result;}
    if(row&&!negated&&row.intent!=='project'){result.intent=row.intent;result.unsupported=row.intent==='unsupported';return result;}
    if(/\b(cortar|sierra|solda\w*|pintar|pintura|compresor|pulidora|amoladora|lijar|lijadora|bomba|jardineria|podar|motosierra|demoler|demoledor|industrial continuo|gasolina|cenizas|asbesto|combustible|polvo de silice)\b/.test(t)){
      result.intent='unsupported';result.unsupported=true;result.question='Esta necesidad requiere asesoría: la muestra no incluye una opción validada para ese trabajo.';return result;
    }
    if(!t){result.intent='clarify';result.question='Entendí lo que no necesitas. ¿Qué trabajo sí quieres hacer?';result.entities={...context};return result;}
    let projects = Object.entries(patterns).filter(([,re])=>re.test(t)).map(([id])=>id);
    if(/\b(limpiar|limpieza|sacar polvo|quitar polvo)\b/.test(t)){
      if(/\b(interior|asientos?|tapiceria|cabina|baul|migas)\b/.test(t))projects.push('vacuum');
      else if(/\b(patio|terraza|exterior|cochera|garaje)\b/.test(t))projects.push('wash');
      else if(/\b(carro|camioneta)\b/.test(t)&&!projects.length){
        result.intent='clarify';result.question='¿Quieres lavar el exterior o aspirar el interior del carro?';result.choices=[{kind:'answers',value:'wash-car',label:'Lavar el exterior',entities:{project:'wash',material:'car'}},{kind:'answers',value:'vacuum-car',label:'Aspirar el interior',entities:{project:'vacuum',material:'car'}}];return result;
      }
    }
    projects=[...new Set(projects)];
    if(projects.includes('wash')&&projects.includes('vacuum')&&/\b(interior|asientos?|tapiceria)\b/.test(t)&&!/hidrolavadora/.test(t))projects=projects.filter(p=>p!=='wash');
    if(projects.length>1){result.intent='clarify';result.question='Veo más de una tarea. ¿Con cuál empezamos?';result.choices=projects.map(value=>({kind:'project',value,label:names[value]}));return result;}
    const selected = projects[0] || (row?.intent==='project'&&!negated?row.entities.project:null) || context.project;
    const entities = {...context};
    if(selected&&selected!==context.project){delete entities.material;delete entities.frequency;delete entities.priority;entities.project=selected;}
    if(selected)entities.project=selected;
    const conflicts=[];
    if(selected){
      let materials=hits(surfaceRules[selected],t);
      if(selected==='wash'&&materials.includes('car')&&materials.includes('patio'))materials=['both'];
      if(selected==='wash'&&materials.includes('heavy'))materials=['heavy'];
      if(selected==='vacuum'&&materials.includes('liquids'))materials=['liquids'];
      if(row?.intent==='project'&&!negated&&row.entities.material)materials=[row.entities.material];
      if(materials.length===1)entities.material=materials[0];
      else if(materials.length>1){delete entities.material;conflicts.push('material');}
      else if(row?.entities.material&&!negated)entities.material=row.entities.material;
    }
    for(const [key,rules] of [['frequency',frequencyRules],['priority',priorityRules]]){
      const values=hits(rules,t);
      if(values.length===1)entities[key]=values[0];
      else if(values.length>1){delete entities[key];conflicts.push(key);}
    }
    // Never carry a material into a different category, or accept context values outside the catalog.
    const project=data?.projects.find(p=>p.id===entities.project);
    if(entities.material&&project&&!project.materials.some(m=>m[0]===entities.material))delete entities.material;
    result.entities=entities;result.missing=keys.filter(k=>!entities[k]);
    const changed=keys.some(k=>entities[k]!==context[k]);
    if(!selected&&!changed){result.intent='unknown';result.question='Todavía no ubico la tarea. Puedes elegir una categoría o describir qué quieres hacer.';return result;}
    result.intent='project';
    if(conflicts.length){result.question='Hay más de una opción en tu descripción. Confirma los datos que faltan.';}
    return result;
  }
  window.HPC_SMART_ENGINE = {analyze,normalize,version:K.version};
})();
