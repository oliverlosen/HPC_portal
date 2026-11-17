/* Shared fail-soft local storage. Memory fallback also works under restricted file://. */
(() => {
  if(window.HPC_STORAGE)return;
  const memory=new Map();let temporary=false;
  function notice(){temporary=true;const el=document.getElementById('storage-notice');if(el){el.hidden=false;return;}if(!document.body)return;const b=document.createElement('div');b.id='storage-notice';b.setAttribute('role','status');b.textContent='Modo temporal: este navegador no permite guardar. Los cambios se conservarán mientras esta presentación siga abierta.';b.style.cssText='position:relative;padding:10px 20px;background:#fff1d5;color:#553800;font:13px/1.5 system-ui;z-index:100';document.body.prepend(b);}
  window.HPC_STORAGE={getItem(key){if(memory.has(key))return memory.get(key);try{return localStorage.getItem(key);}catch{notice();return null;}},setItem(key,value){memory.set(key,String(value));try{localStorage.setItem(key,String(value));}catch{notice();}},removeItem(key){memory.set(key,null);try{localStorage.removeItem(key);}catch{notice();}},get temporary(){return temporary;}};
})();
