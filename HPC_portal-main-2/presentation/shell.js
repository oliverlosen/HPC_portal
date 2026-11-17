/* The embedded documents share this file's assets and storage, but isolate CSS and events. */
(() => {
  'use strict';
  const B=window.HPC_BUNDLE, frames=new Map();
  const home=document.getElementById('portal-home'),stage=document.getElementById('portal-stage'),select=document.getElementById('portal-select'),profiles=document.getElementById('profile-select'),profileLabel=document.getElementById('profile-label');
  let active='inicio', pendingAction=null;
  const storage=window.HPC_STORAGE;
  const read=(k,d)=>{try{return JSON.parse(storage.getItem(k))??d;}catch{return d;}};
  const remembered=read('hpc-presentation-profiles',{});
  const selectedProfiles={colaborador:B.collaborators.some(x=>x.id===remembered.colaborador)?remembered.colaborador:B.collaborators[0].id,mayorista:B.accounts.some(x=>x.id===remembered.mayorista)?remembered.mayorista:B.accounts[0].id};
  const savedTheme=read('hpc-theme','auto');let theme=['light','dark'].includes(savedTheme)?savedTheme:'auto';
  const media=window.matchMedia('(prefers-color-scheme: dark)');
  function applyTheme(){document.documentElement.dataset.theme=theme==='auto'?(media.matches?'dark':'light'):theme;document.getElementById('hub-theme').value=theme;}
  function size(){document.documentElement.style.setProperty('--bar-height',`${document.querySelector('.hub-bar').offsetHeight+(document.getElementById('storage-notice').hidden?0:document.getElementById('storage-notice').offsetHeight)}px`);}
  new ResizeObserver(size).observe(document.querySelector('.hub-bar'));
  new ResizeObserver(size).observe(document.getElementById('storage-notice'));
  window.addEventListener('resize',size);media.addEventListener('change',applyTheme);
  applyTheme();
  document.getElementById('hub-hero-image').src=window.HPC_ASSETS['ROTI-20A3'];
  function showProfiles(){
    profileLabel.hidden=!['colaborador','mayorista'].includes(active);
    if(profileLabel.hidden)return;
    profiles.replaceChildren();
    const rows=active==='colaborador'?B.collaborators:B.accounts;
    for(const row of rows){const o=document.createElement('option');o.value=row.id;o.textContent=active==='colaborador'?`${row.name} · ${B.stores.find(s=>s.id===row.store)?.name||row.store}`:(row.id==='dist-norte'?'Distribuidora Norte':'Ferretería Centro');profiles.append(o);}
    profiles.value=selectedProfiles[active];
  }
  function getFrame(mode){
    const key=['colaborador','mayorista'].includes(mode)?'interno':mode;if(frames.has(key))return frames.get(key);
    const f=document.createElement('iframe');f.title={cliente:'Portal de cliente HPC',interno:'Portal de colaborador y mayorista HPC',inteligencia:'HPC Inteligencia Comercial'}[key];f.id='frame-'+key;f.hidden=true;
    const boot=JSON.stringify({mode,profile:selectedProfiles[mode],search:location.search}).replace(/</g,'\\u003c');
    const bridge=`<script>window.HPC_BOOT=${boot};window.HPC_ASSETS=parent.HPC_ASSETS;window.HPC_STORAGE=parent.HPC_STORAGE;window.HPC_SWITCH_PORTAL=(id,intent)=>parent.HPC_SHELL.open(id,intent);window.HPC_SET_THEME=value=>parent.HPC_SHELL.setTheme(value);var f=document.createElement('style');f.textContent=parent.HPC_FONT_CSS;document.head.appendChild(f);<\/script>`;
    // Los enlaces de sección (#1, #2…) pertenecen al documento de inteligencia.
    const head=key==='inteligencia'?'<base href="about:srcdoc">':bridge;
    f.srcdoc=B[key].replace('<head>','<head>'+head);
    f.addEventListener('load',()=>{
      f.dataset.loaded='true';
      if(f.hidden)return;
      document.getElementById('portal-loading').hidden=true;
      if(key==='interno'&&['colaborador','mayorista'].includes(active))f.contentWindow.HPC_PORTAL.enterDemo(active,selectedProfiles[active]);
      if(key==='cliente'&&pendingAction&&active==='cliente'){f.contentWindow.HPC_GUIDE.open(pendingAction);pendingAction=null;}
      size();
    });
    frames.set(key,f);stage.append(f);return f;
  }
  function open(mode,intent){
    if(!Array.from(select.options).some(option=>option.value===mode))mode='inicio';
    for(const f of frames.values()){if(!f.hidden){f.contentWindow.HPC_GUIDE?.prepareSwitch();f.contentWindow.HPC_PORTAL?.prepareSwitch();}f.hidden=true;}
    active=mode;select.value=mode;home.hidden=mode!=='inicio';stage.hidden=mode==='inicio';document.body.classList.toggle('portal-active',mode!=='inicio');showProfiles();
    document.title=mode==='inicio'?'HPC · Portales Smart Guide':`HPC · Portal de ${mode==='inteligencia'?'Inteligencia Comercial':mode}`;
    if(mode!=='inicio'){
      const f=getFrame(mode);f.hidden=false;
      document.getElementById('portal-loading').hidden=f.dataset.loaded==='true';
      if(mode!=='cliente'&&f.contentWindow.HPC_PORTAL)f.contentWindow.HPC_PORTAL.enterDemo(mode,selectedProfiles[mode]);
      if(intent){if(f.contentWindow.HPC_GUIDE)f.contentWindow.HPC_GUIDE.open(intent);else pendingAction=intent;}
      f.focus();
    }else document.querySelector('.hub-intro h1').setAttribute('tabindex','-1'),document.querySelector('.hub-intro h1').focus({preventScroll:true});
    size();
  }
  document.addEventListener('click',e=>{const b=e.target.closest('[data-portal]');if(b)open(b.dataset.portal);});
  select.addEventListener('change',()=>open(select.value));
  profiles.addEventListener('change',()=>{selectedProfiles[active]=profiles.value;storage.setItem('hpc-presentation-profiles',JSON.stringify(selectedProfiles));getFrame(active).contentWindow.HPC_PORTAL?.enterDemo(active,profiles.value);});
  function setTheme(value){theme=value;storage.setItem('hpc-theme',JSON.stringify(theme));storage.setItem('hpc-portal-interno:theme',JSON.stringify(theme));applyTheme();for(const f of frames.values()){f.contentWindow.HPC_GUIDE?.setTheme?.(theme);f.contentWindow.HPC_PORTAL?.setTheme?.(theme);}}
  document.getElementById('hub-theme').addEventListener('change',e=>setTheme(e.target.value));
  window.HPC_SHELL={open,setTheme,get active(){return active;}};size();
})();
