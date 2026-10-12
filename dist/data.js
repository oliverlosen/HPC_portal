window.HPC_DATA = {
  version: '0.1.0',
  stores: [
    {id:'cemaco',name:'CEMACO',description:'Punto de venta de ejemplo',icon:'store'},
    {id:'aki',name:'AKÍ',description:'Punto de venta de ejemplo',icon:'store'},
    {id:'ferreteria',name:'Mi ferretería',description:'Distribuidor HPC · Ejemplo',icon:'store'}
  ],
  projects: [
    {id:'drill',name:'Perforar y fijar',short:'Perforar',description:'Una repisa, un mueble o ese proyecto pendiente.',icon:'drill',number:'01',image:'ROTI-20A3',materialQuestion:'¿Sobre qué material vas a trabajar?',materials:[['wood','Madera','Muebles, repisas o estructuras de madera','layers'],['metal','Metal','Lámina, perfiles o piezas metálicas','hexagon'],['block','Pared de block o ladrillo','Instalaciones y arreglos en casa','brick'],['concrete','Concreto','Un material más duro y exigente','mountain']]},
    {id:'wash',name:'Lavar con presión',short:'Lavar',description:'Deja tu carro, el patio o la terraza como nuevos.',icon:'droplets',number:'02',image:'HILA-2000X',materialQuestion:'¿Qué quieres limpiar?',materials:[['car','Mi carro o moto','Limpieza de superficies y carrocería','car'],['patio','Patio o terraza','Pisos, paredes y espacios exteriores','home'],['both','Un poco de todo','Carro, patio y otros espacios de casa','grid'],['heavy','Superficies muy sucias','Suciedad incrustada y trabajo frecuente','sparkles']]},
    {id:'vacuum',name:'Aspirar y limpiar',short:'Aspirar',description:'Polvo, derrames y limpieza de casa o taller.',icon:'vacuum',number:'03',image:'ASP-03',materialQuestion:'¿Qué tipo de limpieza necesitas?',materials:[['home','Casa y espacios pequeños','Limpieza cotidiana y derrames','home'],['car','El interior de mi carro','Asientos, alfombras y espacios reducidos','car'],['workshop','Mi taller o negocio','Limpieza de trabajo y superficies amplias','wrench'],['liquids','Sólidos y líquidos','Polvo y derrames en distintas superficies','droplets']]},
    {id:'faucet',name:'Cambiar un grifo',short:'Grifería',description:'Una mejora pequeña que cambia tu espacio.',icon:'faucet',number:'04',image:'M-048PB',materialQuestion:'¿Dónde vas a instalarlo?',materials:[['bathroom','Lavamanos del baño','Instalación en lavamanos de 4 pulgadas','faucet'],['kitchen','Lavatrastos de cocina','Necesito un grifo para la cocina','home'],['shower','Ducha o regadera','Necesito una solución para la ducha','droplets'],['unknown','No estoy seguro','Quiero orientación para elegir','help']]}
  ],
  frequency: [
    ['occasional','De vez en cuando','Arreglos ocasionales en casa','home'],
    ['regular','Varias veces al mes','Proyectos y trabajos frecuentes','calendar'],
    ['daily','Todos los días','Mi herramienta de trabajo','briefcase']
  ],
  priorities: [
    ['balance','Una buena combinación','Equilibrio entre capacidad y presupuesto','sliders'],
    ['economy','Cuidar mi presupuesto','Lo esencial para resolver mi proyecto','wallet'],
    ['power','Mayor capacidad','Para trabajos más exigentes','bolt']
  ],
  products: [
    {id:'drill-pro',category:'drill',code:'103246',model:'ROTI-20A3',brand:'TRUPER PRO',name:'Rotomartillo inalámbrico 20 V',subtitle:'Libertad para crear. Capacidad para resolver.',image:'ROTI-20A3',price:1249,tier:1,features:['20 V','Broquero de 1/2 pulgada','2 baterías de 2 Ah'],source:'https://www.hpcenlinea.com.gt/gt/products/103246-rotomartillo-12-20v-2-baterias-2ah-pro',area:'Herramientas eléctricas'},
    {id:'drill-single',category:'drill',code:'103247',model:'ROTI-20A2',brand:'TRUPER PRO',name:'Rotomartillo 20 V · 1 batería',subtitle:'Una opción para proyectos ocasionales.',image:'ROTI-20A2',price:899,tier:0,features:['20 V','Broquero de 1/2 pulgada','1 batería de 2 Ah'],source:'https://www.hpcenlinea.com.gt/gt/products/103247-rotomartillo-12-20v-1-bateria-2ah-pro',area:'Herramientas eléctricas'},
    {id:'drill-sds',category:'drill',code:'19320',model:'ROEL-50N2',brand:'TRUPER INDUSTRIAL',name:'Rotomartillo SDS Plus 1500 W',subtitle:'Una opción para trabajos en concreto.',image:'ROEL-50N2',price:1949,tier:2,features:['1500 W','SDS Plus','5 joules'],source:'https://www.hpcenlinea.com.gt/gt/products/19320-rotomartillo-sds-plus-5-joules-1500w-truper-industrial',area:'Herramientas eléctricas'},
    {id:'wash-pretul',category:'wash',code:'29004',model:'HILA-1350P',brand:'PRETUL',name:'Hidrolavadora eléctrica 1350 PSI',subtitle:'Para las tareas de limpieza ocasionales.',image:'HILA-1350P',price:649,tier:0,features:['1350 PSI','Eléctrica','Diseño portátil'],source:'https://www.hpcenlinea.com.gt/gt/products/29004-hidrolavadora-electrica-1350-psi-pretul',area:'Limpieza y hogar'},
    {id:'wash-pro',category:'wash',code:'101595',model:'HILA-2000',brand:'TRUPER',name:'Hidrolavadora eléctrica 2000 PSI',subtitle:'Más capacidad para tus proyectos de limpieza.',image:'HILA-2000',price:1399,tier:1,features:['2000 PSI','Eléctrica','Para distintas superficies'],source:'https://www.hpcenlinea.com.gt/gt/products/101595-hidrolavadora-electrica-2000-psi-truper',area:'Limpieza y hogar'},
    {id:'wash-expert',category:'wash',code:'102111',model:'HILA-2000X',brand:'TRUPER EXPERT',name:'Hidrolavadora 2000 PSI Expert',subtitle:'Motor de inducción para un uso más exigente.',image:'HILA-2000X',price:2249,tier:2,features:['2000 PSI','Motor de inducción','Línea Expert'],source:'https://www.hpcenlinea.com.gt/gt/products/102111-hidrolavadora-electrica2000-psi-motor-de-induccion-expert',area:'Limpieza y hogar'},
    {id:'vacuum-small',category:'vacuum',code:'12091',model:'ASPI-03',brand:'TRUPER',name:'Aspiradora de sólidos y líquidos',subtitle:'Compacta para casa, carro y espacios pequeños.',image:'ASP-03',price:549,tier:0,features:['3 galones','Sólidos y líquidos','Cuerpo plástico'],source:'https://www.hpcenlinea.com.gt/gt/products/12091-aspiradora-de-solidos-y-liquidos-de-3-gal-plastica-truper',area:'Limpieza y hogar'},
    {id:'vacuum-large',category:'vacuum',code:'12093',model:'ASPI-12',brand:'TRUPER',name:'Aspiradora de 12 galones',subtitle:'Mayor capacidad para tu taller o negocio.',image:'ASP-12',price:1499,tier:2,features:['12 galones','Sólidos y líquidos','Soplador desmontable'],source:'https://www.hpcenlinea.com.gt/gt/products/12093-aspiradora-solidos-y-liquidos-12-gal-soplador-desmontable',area:'Limpieza y hogar'},
    {id:'faucet-basic',category:'faucet',code:'49590',model:'M-048PB',brand:'FOSET BASIC',name:'Mezcladora de palanca para lavabo',subtitle:'Renueva tu lavamanos con una solución sencilla.',image:'M-048PB',price:179,tier:0,features:['Lavabo de 4 pulgadas','Manerales de palanca','Cuerpo ABS'],source:'https://www.hpcenlinea.com.gt/gt/products/49590-mezcladora-manerales-palanca-para-lavabo-foset-basic',area:'Plomería y grifería'}
  ],
  centers: [
    {city:'Guatemala',address:'27 Calle 41-55, zona 5, Bodega C, Guatemala',map:'https://www.google.com/maps/search/?api=1&query=HPC+27+Calle+41-55+Zona+5+Guatemala'},
    {city:'Retalhuleu',address:'Centro Comercial La Trinidad, local L-91, 5ta avenida y 1a calle, zona 5',map:'https://www.google.com/maps/search/?api=1&query=Centro+Comercial+La+Trinidad+Retalhuleu'},
    {city:'Quetzaltenango',address:'18 avenida 0-69, zona 3, Quetzaltenango',map:'https://www.google.com/maps/search/?api=1&query=18+avenida+0-69+zona+3+Quetzaltenango'},
    {city:'Petén',address:'Metro Plaza Mundo Maya, locales 103 al 108, frente al aeropuerto, Flores',map:'https://www.google.com/maps/search/?api=1&query=Metro+Plaza+Mundo+Maya+Flores'}
  ],
  policy:'https://www.hpcenlinea.com.gt/gt/politicasdegarantia',
  centersSource:'https://www.hpcenlinea.com.gt/gt/centrosdeservicio'
};
