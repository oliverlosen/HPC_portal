/* Optional browser integration check. Uses an installed Playwright, adds no app dependencies.
   HPC_PLAYWRIGHT_PATH and HPC_BROWSER_PATH may point to existing installations. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
let chromium;
try{({chromium}=require(process.env.HPC_PLAYWRIGHT_PATH||'playwright'));}
catch{console.log('SKIP browser: set HPC_PLAYWRIGHT_PATH to an installed Playwright. No packages were installed.');process.exit(0);}
const {pathToFileURL}=require('node:url');
const file=pathToFileURL(path.join(root,'HPC_Portal_Unificado.html')).href;
let checks=0;const artifacts=path.join(root,'work/browser-checks');fs.mkdirSync(artifacts,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.HPC_BROWSER_PATH?{executablePath:process.env.HPC_BROWSER_PATH}:{})});
 try{
 const context=await browser.newContext({viewport:{width:1440,height:1050},offline:true});
 const page=await context.newPage(),errors=[],requests=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('request',r=>{if(/^https?:/.test(r.url()))requests.push(r.url());});
 await page.goto(file);await page.locator('.portal-card').last().waitFor();
 async function capture(name){await page.screenshot({path:path.join(artifacts,name+'.png'),fullPage:true,animations:'disabled'});}
 async function layout(){for(const frame of page.frames()){if(frame!==page.mainFrame()&&!(await (await frame.frameElement()).isVisible()))continue;assert.equal(await frame.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'horizontal overflow: '+frame.url());checks++;}}
 async function imageCheck(frame){const bad=await frame.evaluate(async()=>{const imgs=[...document.images].filter(i=>!i.hidden&&i.getClientRects().length);imgs.forEach(i=>{i.loading='eager';});await Promise.race([Promise.all(imgs.map(i=>i.decode().catch(()=>{}))),new Promise((_,reject)=>setTimeout(()=>reject(Error('Image decode timed out')),8000))]);return imgs.filter(i=>!i.naturalWidth||!i.src.startsWith('data:image/')).map(i=>({alt:i.alt,src:i.src.slice(0,100)}));});assert.deepEqual(bad,[]);checks++;}
 async function open(mode){await page.locator('#portal-select').selectOption(mode);const name=mode==='cliente'?'cliente':'interno';const frame=await (await page.locator('#frame-'+name).elementHandle()).contentFrame();await frame.waitForFunction(()=>!!window.HPC_GUIDE||!!window.HPC_PORTAL);return frame;}
 async function query(frame,text){await frame.locator('#sg-query').fill(text);await frame.locator('#sg-form button').click();await frame.locator('#sg-result').waitFor();}
 async function tab(frame,id){const b=frame.locator(`[data-action="tab"][data-tab="${id}"].nav-button`);if(await frame.locator('.mobile-menu').isVisible()&&!await frame.locator('.sidebar').evaluate(el=>el.classList.contains('open')))await frame.locator('.mobile-menu').click();await b.click();}
 await layout();await imageCheck(page.mainFrame());await capture('home-desktop');
 let client=await open('cliente');await client.locator('#sg-query').waitFor();
 await client.locator('#sg-query').focus();await page.keyboard.press('Tab');assert.equal(await client.evaluate(()=>document.activeElement.type),'submit');checks++;

 await query(client,'Quiero perforar concreto de vez en cuando y barato');
 assert.equal(await client.locator('.sg-question').count(),0);await client.locator('[data-sg-recommend]').click();
 await client.locator('.product-code').waitFor();assert.match(await client.locator('.product-code').innerText(),/ROEL-50N2/);checks++;
 await client.locator('[data-action="save"]').click();
 await imageCheck(client);await capture('recommendation-desktop');
 await open('mayorista');await open('cliente');assert.match(await client.locator('.product-code').innerText(),/ROEL-50N2/);checks++;
 await client.locator('[data-action="nav"][data-route="inicio"]').click();
 await query(client,'Me gustaría limpiar mi carro');assert.equal(await client.locator('[data-sg-choice]').count(),2);checks++;
 await client.locator('[data-sg-choice="1"]').click();
 await client.locator('[data-sg-key="frequency"][data-sg-value="daily"]').click();
 await client.locator('[data-sg-key="priority"][data-sg-value="power"]').click();
 await client.locator('[data-sg-edit="material"]').click();await client.locator('[data-sg-key="material"][data-sg-value="workshop"]').click();
 await client.locator('[data-sg-recommend]').click();await client.locator('.product-code').waitFor();assert.match(await client.locator('.product-code').innerText(),/ASPI-12/);checks++;
 await client.locator('[data-action="nav"][data-route="inicio"]').click();await query(client,'103246');
 assert.match(await client.locator('.sg-product').innerText(),/ROTI-20A3/);assert.equal(await client.locator('[data-sg-recommend]').count(),0);checks++;
 await query(client,'<img src=x onerror="window.HPC_ATTACK=1">');assert.equal(await client.evaluate(()=>window.HPC_ATTACK),undefined);assert.equal(await client.locator('#sg-result img').count(),0);checks++;
 await query(client,'Busco centros de servicio en Cobán');assert.match(await client.locator('.sg-center').innerText(),/Cobán/);checks++;
 await client.locator('[data-sg-manual]').click();
 for(const [key,value]of [['project','drill'],['material','concrete'],['frequency','occasional'],['priority','economy']]){await client.locator(`[data-action="choose"][data-key="${key}"][data-value="${value}"]`).click();await client.locator('[data-action="next"]').click();}
 await client.locator('.product-code').waitFor();assert.match(await client.locator('.product-code').innerText(),/ROEL-50N2/);checks++;
 await client.locator('[data-action="nav"][data-route="inicio"]').click();
 await query(client,'quiero registrar mi herramienta');await client.locator('[data-sg-route="register"]').click();
 await client.locator('#registration-form').waitFor();await page.keyboard.press('Escape');assert.equal(await client.locator('[role="dialog"]').count(),0);assert.equal(await client.locator('#app').evaluate(el=>el.inert),false);checks++;
 await client.locator('[data-sg-route="register"]').click();await client.locator('#registration-form').waitFor();
 await client.locator('#receipt').setInputFiles(path.join(artifacts,'home-desktop.png'));
 await client.locator('#product-id').selectOption('drill-pro');
 await client.locator('#purchase-date').fill('2026-11-01');await client.locator('#purchase-store').fill('Tienda de prueba');await client.locator('[name="consent"]').check();
 await client.locator('#registration-form [type="submit"]').click();await client.getByRole('heading',{name:'Tu registro está guardado.'}).waitFor();checks++;
 await client.locator('[data-action="nav"][data-route="herramientas"]').last().click();assert.match(await client.locator('#saved-results').innerText(),/Factura guardada/);checks++;
 await client.locator('[data-action="record"]').first().click();await client.locator('#receipt-view img').waitFor();assert.ok(await client.locator('#receipt-view img').evaluate(i=>i.naturalWidth>0));await page.keyboard.press('Escape');checks++;
 let portal=await open('colaborador');assert.match(await portal.locator('.sidebar-name').innerText(),/Ana/);
 await query(portal,'Taladro para concreto ocasional y económico');await portal.locator('[data-sg-recommend]').click();
 assert.match(await portal.locator('#product-title').innerText(),/SDS|Rotomartillo/);checks++;
 await page.locator('#profile-select').selectOption('aki-maria');assert.match(await portal.locator('.sidebar-name').innerText(),/María/);checks++;
 await open('mayorista');await portal.locator('[data-action="add-line"][data-id="drill-pro"]').click();
 await tab(portal,'pedido');assert.match(await portal.locator('#main').innerText(),/ROTI-20A3/);checks++;
 await open('cliente');await open('mayorista');await tab(portal,'pedido');assert.match(await portal.locator('#main').innerText(),/ROTI-20A3/);checks++;
 await page.reload();portal=await open('mayorista');await tab(portal,'pedido');assert.match(await portal.locator('#main').innerText(),/ROTI-20A3/);checks++;
 client=await open('cliente');await client.locator('.nav-button[data-action="nav"][data-route="herramientas"]').click();assert.match(await client.locator('#saved-results').innerText(),/Factura guardada/);checks++;
 for(const width of [1440,390,360]){
  console.log('Checking layout',width);
  await page.setViewportSize({width,height:width===1440?1050:844});
  for(const theme of ['light','dark']){
   await page.evaluate(t=>{document.getElementById('hub-theme').value=t;document.getElementById('hub-theme').dispatchEvent(new Event('change'));},theme);
   await page.locator('#portal-select').selectOption('inicio');await layout();await imageCheck(page.mainFrame());await capture(`home-${width}-${theme}`);
   client=await open('cliente');
   if(width<700)await client.locator('.mobile-menu').click();
   await client.locator('[data-action="nav"][data-route="inicio"]').click();
   await layout();await imageCheck(client);await capture(`client-${width}-${theme}`);
   portal=await open('colaborador');
   for(const id of ['atender','productos','servicio','reposicion','qr','metricas','analisis']){await tab(portal,id);await layout();await imageCheck(portal);}
   await capture(`collaborator-${width}-${theme}`);
   await open('mayorista');
   for(const id of ['catalogo','pedido','pedidos','reposicion','qr','servicio','metricas']){await tab(portal,id);await layout();await imageCheck(portal);}
   await capture(`wholesale-${width}-${theme}`);
  }
 }
 assert.deepEqual(errors,[],'Browser errors');assert.deepEqual(requests,[],'Unexpected network requests while offline');checks+=2;
 // Separate fresh browser context with storage denied: normal UI remains usable, in memory.
 const restricted=await browser.newContext({viewport:{width:1280,height:900},offline:true});
 await restricted.addInitScript(()=>{for(const name of ['getItem','setItem','removeItem'])Storage.prototype[name]=()=>{throw new DOMException('Denied','SecurityError');};});
 const p=await restricted.newPage();await p.goto(file);await p.locator('#portal-select').selectOption('mayorista');
 const rf=await (await p.locator('#frame-interno').elementHandle()).contentFrame();await rf.locator('[data-action="add-line"]').first().click();
 assert.equal(await p.locator('#storage-notice').isVisible(),true);await p.locator('#portal-select').selectOption('cliente');await p.locator('#portal-select').selectOption('mayorista');assert.match(await rf.locator('[data-action="add-line"]').first().innerText(),/otra caja/);checks++;
 await p.screenshot({path:path.join(artifacts,'temporary-storage.png')});
 await restricted.close();await context.close();
 const isolated=path.join(root,'work/isolated');fs.mkdirSync(isolated,{recursive:true});fs.copyFileSync(path.join(root,'HPC_Portal_Unificado.html'),path.join(isolated,'Presentacion.html'));
 const single=await browser.newContext({offline:true,viewport:{width:1280,height:900},colorScheme:'dark'}),sp=await single.newPage();
 sp.on('pageerror',e=>errors.push(e.message));sp.on('request',r=>{if(/^https?:/.test(r.url()))requests.push(r.url());});
 await sp.goto(pathToFileURL(path.join(isolated,'Presentacion.html')).href+'?tienda=aki');
 assert.equal(await sp.locator('html').getAttribute('data-theme'),'dark');await sp.locator('.portal-card[data-portal="cliente"]').click();
 const sf=await (await sp.locator('#frame-cliente').elementHandle()).contentFrame();await sf.locator('#sg-query').waitFor();
 assert.match(await sf.locator('.store-selector').innerText(),/AKÍ/);assert.equal(await sf.locator('html').getAttribute('data-theme'),'dark');checks+=3;
 await imageCheck(sf);await sp.emulateMedia({colorScheme:'light'});await sf.waitForFunction(()=>document.documentElement.dataset.theme==='light');checks++;
 await sp.locator('.hub-brand').click();
 assert.equal(await sp.locator('.portal-card').count(),4);
 await sp.locator('.portal-card[data-portal="inteligencia"]').click();
 const commercial=sp.frameLocator('#frame-inteligencia');
 await commercial.locator('.metrics').first().waitFor();
 assert.equal(await commercial.locator('.nav-button').count(),14);
 await commercial.getByRole('button',{name:/Consumidores/}).click();
 await commercial.locator('.page-footer').getByText('10 / 14').waitFor();
 await sp.locator('#portal-select').selectOption('cliente');
 await sp.locator('#portal-select').selectOption('inteligencia');
 assert.equal(await commercial.locator('.page-footer').getByText('10 / 14').isVisible(),true);
 assert.equal(await sp.locator('#portal-loading').isVisible(),false);checks+=4;
 assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);await single.close();

 console.log(`OK: ${checks} browser checks; file://, offline assets, text assistant, profiles, saved recommendations/records/drafts, all internal sections at 1440/390/360 px in light/dark, storage denied. No network requests or page errors.`);
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
