/* Shared text assistant for the client and collaborator. Kept in memory, never logged. */
(() => {
  'use strict';
  const esc = s => String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const state = {text:'',result:null,editing:null};
  const keys=['project','material','frequency','priority'];
  const examples=['Quiero poner una repisa en concreto','Quiero limpiar mi carro','Necesito cambiar el chorro del lavamanos'];
  let adapter, host;
  function options(key,a){const d=adapter.data;return key==='project'?d.projects.map(p=>[p.id,p.name]):key==='material'?(d.projects.find(p=>p.id===a.project)?.materials||[]):key==='frequency'?d.frequency:d.priorities;}
  function title(key,a){return key==='project'?'¿Qué necesitas hacer?':key==='material'?(adapter.data.projects.find(p=>p.id===a.project)?.materialQuestion||'¿Sobre qué material o lugar?'):key==='frequency'?'¿Con qué frecuencia lo usarás?':'¿Qué es más importante para ti?';}
  function finishAnswers(a){state.result={intent:'project',entities:a,missing:keys.filter(k=>!a[k]),choices:[],question:''};state.editing=null;draw(true);}
  function resultHTML(){
    const r=state.result;if(!r)return '';
    if(r.intent==='project'){
      const a=r.entities, missing=keys.filter(k=>!a[k]), next=state.editing||missing[0];
      return `<div class="sg-result" id="sg-result"><div class="sg-result-title"><strong>Esto entendí de tu proyecto</strong><button type="button" class="sg-link" data-sg-reset>Empezar de nuevo</button></div><div class="sg-summary">${keys.filter(k=>a[k]).map(k=>`<button type="button" data-sg-edit="${k}" aria-label="Cambiar ${esc(title(k,a))}">${esc(options(k,a).find(o=>o[0]===a[k])?.[1]||a[k])}<span aria-hidden="true"> ↗</span></button>`).join('')||'<span>Vamos a precisar tu proyecto.</span>'}</div>${r.question?`<p class="sg-note">${esc(r.question)}</p>`:''}${next?`<div class="sg-question"><h3 tabindex="-1">${esc(title(next,a))}</h3><div class="sg-options" role="group" aria-label="${esc(title(next,a))}">${options(next,a).map(([value,label,desc])=>`<button type="button" data-sg-key="${next}" data-sg-value="${value}" aria-pressed="${a[next]===value}"><strong>${esc(label)}</strong>${desc?`<small>${esc(desc)}</small>`:''}</button>`).join('')}</div></div>`:`<p class="sg-note">Puedes cambiar cualquier dato antes de continuar.</p><button type="button" class="sg-submit" data-sg-recommend>Ver mi recomendación <span aria-hidden="true">→</span></button>`}</div>`;
    }
    if(r.intent==='product'){
      const p=adapter.data.products.find(p=>p.id===r.productId);
      return `<div class="sg-result" id="sg-result"><div class="sg-product"><img src="${adapter.image(p.image)}" alt="${esc(p.name)}"><div><span class="sg-eyebrow">Producto encontrado</span><h3 tabindex="-1">${esc(p.name)}</h3><p>${esc(p.model)} · Código ${p.code}</p><p>${p.features.map(esc).join(' · ')}</p><strong>Q ${Number(p.price).toLocaleString('es-GT',{minimumFractionDigits:2})}</strong><small class="sg-note">Precio de ejemplo · Confirma en tienda.</small></div></div><p class="sg-note">Encontramos el modelo que escribiste. Para comprobar si se ajusta a tu proyecto, cuéntanos qué vas a hacer.</p><button type="button" class="sg-link" data-sg-project="${p.category}">Evaluar para mi proyecto →</button></div>`;
    }
    if(r.intent==='clarify')return `<div class="sg-result" id="sg-result"><h3 tabindex="-1">${esc(r.question)}</h3><div class="sg-options">${r.choices.map((c,i)=>`<button type="button" data-sg-choice="${i}">${esc(c.label)}</button>`).join('')}</div>${!r.choices.length?'<p class="sg-note">Escríbelo arriba o empieza con las preguntas.</p>':''}</div>`;
    const copy={warranty:['Garantía y respaldo','Consulta las condiciones publicadas por HPC y las respuestas frecuentes. La cobertura de cada caso la confirma el centro autorizado.','Ver garantía'],service:['Servicio cerca de ti','Encuentra direcciones, horarios y contacto de los centros incluidos en esta demostración. Confirma la atención antes de tu visita.','Ver centros y contacto'],register:['Tus datos de compra, a la mano','Puedes guardar tu herramienta y una factura opcional en este navegador. Este registro no se envía a HPC ni activa una garantía.','Registrar mi compra'],tools:['Mis herramientas','Consulta tus recomendaciones y los registros de compra guardados en este navegador.','Ver mis herramientas'],help:['Te acompañamos desde tu proyecto','Describe lo que quieres hacer o elige una categoría. Solo te preguntaremos los detalles que hagan falta.','Empezar con preguntas'],unsupported:['Necesitamos orientación para ese trabajo',r.question||'La muestra actual cubre perforación, lavado con presión, aspiración y grifería de lavamanos. No tenemos una opción validada para esta necesidad.','Consultar ayuda'],unknown:['Precisemos tu proyecto',r.question||'Todavía no ubico esa necesidad. Prueba con una descripción del trabajo.','Empezar con preguntas']}[r.intent]||['Cuéntanos un poco más','Elige una categoría para continuar.','Empezar con preguntas'];
    const centerMatches=r.intent==='service'?adapter.data.centers.filter(c=>window.HPC_SMART_ENGINE.normalize(state.text).includes(window.HPC_SMART_ENGINE.normalize(c.city.split(' (')[0]))):[];
    return `<div class="sg-result" id="sg-result"><h3 tabindex="-1">${copy[0]}</h3><p>${esc(copy[1])}</p>${centerMatches.map(c=>`<div class="sg-center"><strong>${esc(c.city)}</strong><p>${esc(c.address)}</p><small>${esc(c.hours||adapter.data.centerHours)}</small>${c.note?`<p>${esc(c.note)}</p>`:''}</div>`).join('')}<button type="button" class="sg-submit" data-sg-route="${r.intent}">${copy[2]} <span aria-hidden="true">→</span></button></div>`;
  }
  function draw(focus=false){
    if(!host)return;
    host.innerHTML=`<section class="smart-guide" aria-labelledby="sg-title"><div class="sg-heading"><div><span class="sg-eyebrow">SMART GUIDE / TU PROYECTO</span><h2 id="sg-title">Cuéntanos qué necesitas hacer.</h2><p>Escríbelo con tus palabras. Encontramos juntos el siguiente paso.</p></div><span class="sg-offline">Consulta local</span></div><form id="sg-form"><label class="sg-label" for="sg-query">Tu proyecto o tu consulta</label><div class="sg-input-row"><textarea id="sg-query" name="query" rows="2" maxlength="600" placeholder="Ej. Quiero poner una repisa en una pared de concreto" required>${esc(state.text)}</textarea><button class="sg-submit" type="submit">Encontrar <span aria-hidden="true">→</span></button></div></form><div class="sg-examples"><span>Por ejemplo</span>${examples.map((x,i)=>`<button type="button" data-sg-example="${i}">${esc(x)}</button>`).join('')}</div><p id="sg-status" class="sg-status" role="status" aria-live="polite">${state.result?'Revisa lo que entendimos y completa los datos que faltan.':''}</p>${resultHTML()}<div class="sg-foot"><button type="button" class="sg-link" data-sg-manual>Prefiero responder las preguntas →</button><span>Sin enviar tu consulta a internet.</span></div></section>`;
    host.querySelector('#sg-form').addEventListener('submit',e=>{e.preventDefault();state.text=host.querySelector('#sg-query').value.trim();state.result=window.HPC_SMART_ENGINE.analyze(state.text,state.result?.entities||{},adapter.data);state.editing=null;draw(true);});
    host.querySelector('#sg-query').addEventListener('input',e=>{state.text=e.target.value;});
    host.onclick=e=>{
      const b=e.target.closest('button');if(!b)return;const v=b.dataset;
      if(v.sgExample!==undefined){state.text=examples[Number(v.sgExample)];state.result=window.HPC_SMART_ENGINE.analyze(state.text,{},adapter.data);state.editing=null;draw(true);}
      else if(v.sgKey){const a={...state.result.entities};if(v.sgKey==='project'&&a.project!==v.sgValue)delete a.material;a[v.sgKey]=v.sgValue;finishAnswers(a);}
      else if(v.sgEdit){state.editing=v.sgEdit;draw(true);}
      else if(v.sgReset!==undefined){state.text='';state.result=null;state.editing=null;draw();host.querySelector('#sg-query').focus();}
      else if(v.sgRecommend!==undefined)adapter.onRecommend({...state.result.entities});
      else if(v.sgChoice!==undefined){const choice=state.result.choices[Number(v.sgChoice)];if(choice.kind==='intent'){state.result={intent:choice.value};draw(true);}else finishAnswers(choice.entities||{project:choice.value});}
      else if(v.sgProject)finishAnswers({project:v.sgProject});
      else if(v.sgManual!==undefined)adapter.onManual();
      else if(v.sgRoute)adapter.onRoute(v.sgRoute);
    };
    if(focus){const target=host.querySelector('.sg-question h3, .sg-result h3, .sg-result-title strong, #sg-query');if(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});target.scrollIntoView({block:'nearest',behavior:'instant'});}}
  }
  window.HPC_SMART_UI={mount(el,config){host=el;adapter=config;if(host)draw();},reset(){state.text='';state.result=null;state.editing=null;},getState:()=>({text:state.text,result:state.result})};
})();
