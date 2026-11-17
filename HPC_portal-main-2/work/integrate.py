from pathlib import Path
root=Path('.')
p=root/'dist/app.js';s=p.read_text()
s=s.replace("const D = window.HPC_DATA;", "const D = window.HPC_DATA;\n  const storage = window.HPC_STORAGE || localStorage;")
s=s.replace('localStorage.getItem(', 'storage.getItem(').replace('localStorage.setItem(', 'storage.setItem(')
s=s.replace("const image = model => `https:","const image = model => window.HPC_ASSETS?.[model] || `https:")
s=s.replace('<section class="hero" aria-labelledby="hero-title">','<div id="smart-guide-slot"></div><section class="hero" aria-labelledby="hero-title">')
s=s.replace('return `<button class="back-link" data-action="nav" data-route="inicio">${icon(\'back\')} Volver al inicio</button><div class="eyebrow">Smart Guide</div>', 'return `${state.manualGuide?\'\':\'<div id="smart-guide-slot"></div>\'}<button class="back-link" data-action="nav" data-route="inicio">${icon(\'back\')} Volver al inicio</button><div class="eyebrow">Smart Guide</div>')
needle="  function render(){const r=route();"
assert needle in s
s=s.replace(needle,"""  function mountSmartGuide(){
    const el=document.getElementById('smart-guide-slot');
    if(!el||!window.HPC_SMART_UI)return;
    window.HPC_SMART_UI.mount(el,{data:D,image,
      onRecommend(answers){state.answers=answers;state.product=chooseProduct(answers);state.previousProduct=null;track('recommendation_shown',{productCode:state.product?.code||null,via:'texto'});go('recomendacion');},
      onManual(){state.manualGuide=true;startGuide();focusHeading();},
      onRoute(intent){if(intent==='register'){register();return;}if(['help','unknown'].includes(intent)){state.manualGuide=true;startGuide();return;}go({warranty:'garantia',service:'ayuda',tools:'herramientas',unsupported:'ayuda'}[intent]||'ayuda');}
    });
  }
  function rememberGuide(){if(!window.HPC_BOOT)return;write('hpc-guide-draft',{answers:state.answers,step:state.step,product:state.product?.id||null,path:location.hash.slice(1)||'inicio'});}
  function render(){const r=route();""")
s=s.replace("+' | HPC Smart Guide';bindImageFallbacks();}","+' | HPC Smart Guide';bindImageFallbacks();mountSmartGuide();rememberGuide();}")
needle='  window.HPC_GUIDE={chooseProduct,attentionCode,version:D.version};'
s=s.replace(needle,"""  window.HPC_GUIDE={chooseProduct,attentionCode,version:D.version,open(intent){if(intent==='register')register();else go(intent==='tools'?'herramientas':intent);},prepareSwitch(){closeModal();rememberGuide();}};
  if(window.HPC_BOOT){
    const draft=read('hpc-guide-draft',null), a=draft?.answers;
    if(a&&D.projects.some(p=>p.id===a.project)){
      const p=D.projects.find(p=>p.id===a.project);state.answers={project:p.id};
      if(p.materials.some(x=>x[0]===a.material))state.answers.material=a.material;
      if(D.frequency.some(x=>x[0]===a.frequency))state.answers.frequency=a.frequency;
      if(D.priorities.some(x=>x[0]===a.priority))state.answers.priority=a.priority;
      state.step=Math.min(3,Math.max(0,Number(draft.step)||0));state.product=productById(draft.product)||null;
      if(draft.path&&/^(inicio|guia|recomendacion(?:\\/[a-z-]+)?|garantia|herramientas|ayuda)$/.test(draft.path))location.hash=draft.path;
    }
  }""")
p.write_text(s)
p=root/'dist/index.html';s=p.read_text()
import re
s=re.sub(r'  <link[^\n]+fonts\.(googleapis|gstatic)[^\n]+\n','',s)
s=s.replace('  <link rel="stylesheet" href="styles.css">','  <link rel="stylesheet" href="fonts.css">\n  <link rel="stylesheet" href="styles.css">\n  <link rel="stylesheet" href="smart-guide.css">\n  <link rel="stylesheet" href="polish.css">')
s=s.replace('  <script src="data.js" defer></script>','  <script src="storage.js" defer></script>\n  <script src="assets.js" defer></script>\n  <script src="data.js" defer></script>\n  <script src="smart-knowledge.js" defer></script>\n  <script src="smart-engine.js" defer></script>\n  <script src="smart-ui.js" defer></script>')
p.write_text(s)
p=root/'dist/data.js';s=p.read_text().replace("version: '0.5.0'", "version: '0.6.0'");p.write_text(s)
# Internal prototype: shared generated code stays in its one inline script.
p=root/'prototipos/portal-interno.html';s=p.read_text()
s=s.replace("const image = model => `https:","const image = model => window.HPC_ASSETS?.[model] || `https:")
s=s.replace("const KEY = 'hpc-portal-interno:';", "const storage = window.HPC_STORAGE || localStorage;\n  const KEY = 'hpc-portal-interno:';")
s=s.replace('localStorage.getItem(', 'storage.getItem(').replace('localStorage.setItem(', 'storage.setItem(').replace('localStorage.removeItem(', 'storage.removeItem(')
s=s.replace("'0.5.0'", "'0.6.0'")
s=s.replace("${switcher}<h2 style=\"font-size:21px;margin-top:12px\">¿Qué le recomendó", "${switcher}<h2 style=\"font-size:21px;margin-top:12px\">¿Qué le recomendó")
# Put the shared assistant above the existing attention UI for both modes.
s=s.replace("root.innerHTML = state.session ? shell(view()) : loginView();", "root.innerHTML = state.session ? shell((state.tab==='atender'?'<div id=\"smart-guide-slot\"></div>':'')+view()) : loginView();\n    mountSmartGuide();")
s=s.replace("  function render(){\n    tip.hidden", """  function mountSmartGuide(){
    const el=document.getElementById('smart-guide-slot');if(!el||!window.HPC_SMART_UI)return;
    window.HPC_SMART_UI.mount(el,{data:{products:PRODUCTS,projects:PROJECTS,frequency:FREQUENCY,priorities:PRIORITY,centers:SUPPORT.centers,centerHours:SUPPORT.hours},image,
      onRecommend(answers){state.answers=answers;state.attendMode='preguntas';render();focusLookupResult();},
      onManual(){state.attendMode='preguntas';render();document.getElementById('questions-form')?.scrollIntoView({block:'start'});},
      onRoute(intent){if(['register','tools'].includes(intent)){if(window.HPC_SWITCH_PORTAL)window.HPC_SWITCH_PORTAL('cliente',intent);else toast('El registro de compra se encuentra en el portal del cliente.');return;}if(['help','unknown'].includes(intent)){state.attendMode='preguntas';render();document.getElementById('questions-form')?.scrollIntoView({block:'start'});return;}setTab('servicio');}
    });
  }
  function enterDemo(mode,profile){
    if(!window.HPC_BOOT)return;
    const oldMode=state.session?.mode;
    const person=COLLABORATORS.find(p=>p.id===profile)||COLLABORATORS[0], company=ACCOUNTS.find(p=>p.id===profile)||ACCOUNTS[0];
    state.session=mode==='colaborador'?{mode,collaborator:person.id,store:person.store}:{mode:'mayorista',account:company.id};
    save('session',state.session);
    if(oldMode!==state.session.mode||!state.tab)state.tab=mode==='colaborador'?'atender':'catalogo';
    state.menuOpen=false;render();
  }
  function render(){
    tip.hidden""")
s=s.replace("else if(a==='logout'){state.session=null;", "else if(a==='logout'){if(window.HPC_SWITCH_PORTAL){window.HPC_SWITCH_PORTAL('inicio');return;}state.session=null;")
s=s.replace("suggestions:()=>state.session", "enterDemo,accounts:ACCOUNTS,prepareSwitch(){persistDraft();state.menuOpen=false;render();},suggestions:()=>state.session")
s=s.replace("  render();\n})();\n</script>", "  if(window.HPC_BOOT)enterDemo(window.HPC_BOOT.mode||'colaborador',window.HPC_BOOT.profile);else render();\n})();\n</script>")
# Share assets/fonts/styles offline for the original prototype too; scripts inlined by export.
s=re.sub(r'<link[^\n]+fonts\.(googleapis|gstatic)[^\n]+\n','',s)
s=s.replace('<style>','<link rel="stylesheet" href="../dist/fonts.css">\n<link rel="stylesheet" href="../dist/smart-guide.css">\n<link rel="stylesheet" href="../dist/polish.css">\n<style>',1)
s=s.replace('<script>','<script>\n/* HPC_SHARED_BEGIN */\n/* HPC_SHARED_END */\n',1)
p.write_text(s)
models=[p.stem for p in (root/'dist/assets/products').glob('*.jpg')]
(root/'dist/assets.js').write_text('/* Local image paths; the exporter embeds the bytes. */\nwindow.HPC_ASSETS = '+__import__('json').dumps({m:'assets/products/'+m+'.jpg' for m in models},indent=2)+';\n')
