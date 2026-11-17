# Últimos cambios - HPC Smart Guide

Registro compartido de tareas terminadas por el equipo y sus agentes. El agente que modifica archivos debe agregar una entrada en el mismo commit o PR antes de entregar. Una consulta sin cambios no requiere registro.

Usa fechas `YYYY-MM-DD` de `America/Guatemala`. Las entradas nuevas van primero. Conserva las anteriores y, si hay conflicto entre colaboradores, conserva ambas entradas. El estado de integración se comprueba en GitHub; una entrada escrita en una rama no demuestra que ya se haya integrado en `main`.

## Registro

### 2026-11-17 - Inteligencia Comercial como cuarto portal

- **Agente y rama.** Codex trabajó en la copia local del escritorio, sin rama de Git.
- **Cambio y motivo.** La presentación incorpora el HTML autónomo de HPC Inteligencia Comercial como cuarta opción en las tarjetas de inicio y el menú superior. Las secciones y los filtros del tablero se conservan al cambiar de portal.
- **Archivos.** Se añadió `presentation/inteligencia-comercial.html` y se actualizaron las fuentes del selector en `presentation/shell.*`, el generador `scripts/export-preview.cjs`, el HTML unificado y las comprobaciones de exportación y navegador. `README.md` y `PROYECTO.md` reflejan la cuarta opción.
- **Comprobaciones.** Se compararon los documentos y datos integrados con las copias de origen. Pasaron las comprobaciones de Smart Guide, recomendaciones, portal interno y exportación reproducible. En Chrome, con el archivo aislado y sin conexión, se abrieron los cuatro portales y las 14 secciones comerciales, se comprobó la conservación de un filtro de ventas y se accedió a las encuestas desde la vista móvil.
- **Alcance de la prueba.** La prueba de navegación se hizo en Chrome. Los enlaces externos conservan los requisitos de conexión y acceso del portal de origen.

### 2026-11-17 - Presentación unificada sin conexión y Smart Guide por texto

- **Agente/herramienta:** Codex; comprobaciones con Node.js y Chrome sin ventana mediante Playwright ya instalado.
- **Rama:** no aplica: copia local en `/Users/Oliver/Desktop/HPC_portal-main-2`, sin `.git`. Se respetó la entrega local solicitada; no se creó repositorio, PR, Release ni publicación.
- **Qué se hizo:**
  - `HPC_Portal_Unificado.html` reúne Cliente, Colaborador y Mayorista, con selector permanente y perfiles de demostración. Cliente e interno se incorporan como documentos `srcdoc`, sin cargar otros archivos HTML; solo se muestra una vista a la vez y sus estilos y eventos permanecen aislados.
  - Los perfiles iniciales son Ana de CEMACO y Distribuidora Norte. Pueden cambiarse desde la presentación. Los códigos de demostración siguen disponibles en el archivo fuente del portal interno.
  - Se integraron nueve fotografías originales de Truper, fuentes DM Sans/Manrope, iconos, estilos y scripts. El archivo puede copiarse solo a otra carpeta y abrirse sin internet. Se conservaron las fuentes editables, las fotos y las licencias de las fuentes.
  - Smart Guide utiliza 250 frases editoriales, palabras clave, sinónimos y errores comunes, con el mismo intérprete en cliente y colaborador. Reconoce proyectos, modelos/códigos y consultas de garantía, servicio, registro y herramientas guardadas. No envía ni guarda las consultas.
  - La interfaz permite revisar y corregir la interpretación. Pregunta los datos faltantes, aclara tareas ambiguas y deriva necesidades no cubiertas. La búsqueda por modelo muestra una ficha, sin afirmar adecuación para un proyecto. Se conservan las reglas y las cuatro preguntas originales.
  - Mejoras moderadas de tipografía, espacios y controles, manteniendo fotografías y marca. Modo claro, oscuro y automático; el aspecto se coordina entre el selector y los portales.
  - Se conservan recomendaciones, registros y borradores de pedidos al cambiar de portal y recargar. Cuando `localStorage` está bloqueado, los datos siguen disponibles durante esa sesión y se muestra un aviso. Las facturas continúan en IndexedDB.
  - El generador actualiza la presentación, la copia de cliente y el bloque compartido del portal interno. `--check` comprueba que las copias estén al día sin modificarlas.
- **Por qué:** presentar las tres perspectivas desde un archivo autónomo y permitir consultas en lenguaje cotidiano, sin ampliar el catálogo ni introducir servidores.
- **Archivos afectados:** `dist/index.html`, `dist/app.js`, `dist/data.js`, nuevos módulos de Smart Guide, recursos/almacenamiento/estilos de `dist/`, `presentation/`, `prototipos/portal-interno.html`, `scripts/export-preview.cjs`, nuevas comprobaciones de Smart Guide/exportación/navegador, `HPC_Portal_Unificado.html`, `preview/HPC_Cliente_Mockup.html`, `README.md`, `PROYECTO.md`, `AGENTS.md`, documentación de recursos y versiones. Copias iniciales y capturas de comprobación en `work/`.
- **Comprobaciones:**
  - Sintaxis de los 14 archivos JavaScript de fuentes y comprobaciones: correcta.
  - `check-guide.cjs` y `check-portal-interno.cjs`: correctos; se mantienen las 144 combinaciones, nueve productos, 117 explicaciones/alternativas, 12 centros, 144 códigos de atención y rechazo de 11 580 errores de escritura.
  - `check-smart-guide.cjs`: 61 escenarios independientes y 250 frases anotadas; cubre faltantes, negaciones, correcciones, ambigüedad, casos no cubiertos, modelos y palabras clave aisladas.
  - `check-offline-export.cjs`: exportación reproducible, fotografías y fuentes integradas, licencias y sintaxis; sin scripts ni hojas de estilo externas.
  - 312 comprobaciones automatizadas en Chrome con `file://` y red desactivada: cliente, colaborador y mayorista, las 14 secciones internas, pantallas de 1440, 390 y 360 px en claro y oscuro; sin desbordamiento horizontal, solicitudes HTTP ni errores de página/consola. Se comprobaron cambios de perfil, recomendaciones, registros y borradores después de cambiar de portal y recargar, y el modo temporal cuando el almacenamiento está bloqueado.
  - Se comprobó además el archivo separado de la carpeta de fuentes, modo automático del sistema, contexto de tienda desde parámetros, navegación por teclado, cierre de diálogo con Escape y guardado/lectura de una imagen de prueba como factura.
  - Revisión visual de capturas de inicio, cliente, colaborador, mayorista y modo temporal, en escritorio y móvil.
- **Pendientes/límites:**
  - No se probó en Safari, Edge, teléfonos físicos ni con lector de pantalla. Las medidas móviles son emuladas en Chrome.
  - Se preservan el catálogo y los textos de respaldo existentes; no se validaron nuevas afirmaciones comerciales. El intérprete es una demostración local basada en reglas, no una IA generativa ni un sistema de voz.
  - Los enlaces externos requieren conexión o la aplicación correspondiente. Los datos locales no se transfieren automáticamente entre rutas de archivo, navegadores o computadoras. Si IndexedDB no está disponible, no se puede adjuntar una factura hasta que el navegador permita ese almacenamiento.
  - Los perfiles, inventarios, pedidos y métricas son ejemplos. No hay autenticación, sincronización, ventas ni pedidos enviados a HPC.

### 2026-11-16 - Portal interno: diseño de la guía, modo oscuro, códigos por persona, metas y análisis

- **Agente/herramienta:** Claude Code (Claude Opus 5.5) · colaborador: tnt101ramirez-ctrl.
- **Rama:** `feature/portal-codigos-metas-analisis`, desde `main` después del PR #14, en un solo commit.
- **Qué se hizo:**
  - **Código por persona.** Hay cinco colaboradores de ejemplo, dos de CEMACO, dos de AKÍ y uno de la ferretería, cada uno con su código (por ejemplo, `CEM-ANA-26`).
    - El código dice quién atiende y en qué tienda, así que la entrada ya no pide elegir la tienda.
    - Cada atención guarda quién la registró (`by`), y la copia de datos entre computadoras lo conserva.
    - El código único anterior, `COLAB-2026`, ya no entra. Una sesión anterior sin colaborador pide volver a entrar.
  - **Metas.** La pestaña «Métricas y metas» muestra:
    - las metas del piloto, con los indicadores de la presentación del proyecto: aceptación de 40 % o más («Me lo llevo» o WhatsApp sobre las recomendaciones), menos de 1 minuto hasta la recomendación y 15 % de contactos. Esta última aparece como «por medir», porque la guía no pide datos de contacto;
    - las metas del mes del colaborador: 40 atenciones, 20 con código de atención y 15 compras registradas, todas de ejemplo;
    - una gráfica de atenciones por colaborador de la tienda.

    El mayorista ve las metas del piloto de sus tiendas.
  - **Análisis.** Una pestaña nueva del colaborador con las cifras resumidas del análisis del proyecto (fase 3):
    - +18 % en ventas de enero a julio de 2026;
    - participación de mercado de 43.9 % a 43.8 %;
    - 4 de 7 categorías perdieron participación en Cemaco, con su gráfica.

    Una tabla relaciona esas categorías con las necesidades de la guía. Se aclara que la fuente es el análisis del equipo y que no son datos de un sistema de HPC.
  - **Diseño de la guía.** El portal toma el diseño de la guía de clientes:
    - un menú lateral con el logo «HPC», el modo, las secciones, quién entró con «Salir del portal» y el aspecto;
    - una barra superior con la sección actual;
    - las mismas tarjetas, botones, letras y colores.

    En el teléfono, el menú se abre con ☰ y se cierra con Escape o al elegir una sección. Las pestañas horizontales ya no se usan.
  - **Modo oscuro.** «Aspecto» ofrece Automático, Claro u Oscuro, como en la guía, y la elección se guarda en el navegador (`hpc-portal-interno:theme`).
    - Automático sigue al equipo con `prefers-color-scheme` desde el CSS, porque el portal solo puede tener un script.
    - Todos los colores pasan a variables con su valor claro y oscuro.
    - Las gráficas usan pasos validados para el fondo oscuro, con la guía de visualización: serie `#3987e5` y escala por etapas `#184f95` → `#6da7ec`.
    - El código QR queda siempre en negro sobre blanco, para que se pueda escanear.
  - **Naranja legible.** Los botones y contadores usan `#C2410C` con texto blanco (5.2:1), como la guía (opción A). En oscuro usan `#FC641B` con texto negro. El logo es el de la guía: «HPC» en el color del texto, con la diagonal naranja.
  - Las gráficas aceptan un valor con formato propio (por ejemplo, «−11.08 pp»).
  - `check-portal-interno.cjs` prueba los códigos por persona, las atenciones con colaborador, las metas y el análisis.
  - Versión `0.5.0`, por ser una función nueva del prototipo. La guía de clientes solo cambia su número de versión. Copia portátil regenerada.
- **Por qué:**
  - En la retroalimentación del 10 de noviembre, el equipo le dijo al evaluador que el portal incluiría un código de acceso por persona, las metas (lo que pidió Cristian) y una pestaña de análisis.
  - El colaborador pidió que el portal se viera igual que la guía, con modo oscuro y automático.
  - El naranja del portal estaba pendiente desde la versión 0.3.1.
- **Archivos afectados:** `prototipos/portal-interno.html`, `scripts/check-portal-interno.cjs`, `dist/data.js`, `preview/HPC_Cliente_Mockup.html`, `PROYECTO.md`, `README.md`, `docs/versiones.md`.
- **Comprobaciones:**
  - `node --check`, `node scripts/check-guide.cjs` y `node scripts/check-portal-interno.cjs`: correctos.
  - Chrome sin ventana, a 1280 y 390 px, con el portal del repositorio: 38 de 38.
    - Cubre los códigos de la entrada, el rechazo de `COLAB-2026`, la entrada en minúsculas, la atención registrada a nombre de Ana, las metas del piloto y las del mes, las atenciones por colaborador, el análisis con sus cifras y su tabla, el cambio a otro colaborador, el mayorista sin análisis y el naranja de los botones (`rgb(194, 65, 12)`).
    - Sin desbordamiento ni errores en la consola.
  - Recorrido de las 7 secciones del colaborador y las 7 del mayorista: 14 de 14, con las fotos del catálogo.
  - Diseño y aspecto, en claro y en oscuro, a 1280 y 390 px: 40 de 40.
    - Automático sigue al equipo sin recargar; Claro y Oscuro se recuerdan al recargar.
    - En el teléfono, el menú abre con ☰ y cierra con Escape y al elegir una sección.
    - Las 14 secciones abren sin desbordamiento, y el QR sigue en blanco y negro.
    - Sin errores en la consola.
  - axe-core 4.10.2 (WCAG 2.1 A y AA), en claro y en oscuro, en la entrada, Atender cliente, Métricas y metas, Análisis, QR, el catálogo, el pedido y las métricas del mayorista: sin problemas.
    - Se corrigieron: el texto pequeño de la opción elegida en la entrada, una etiqueta con un color fijo en Métricas y dos tablas que se desplazan en el celular, que ya se pueden recorrer con el teclado.
  - Revisión visual de las capturas en computadora y celular, en claro y en oscuro.
- **Pendientes/límites:**
  - Los colaboradores, sus códigos y las metas son de ejemplo. Los códigos no protegen nada: la versión real necesita usuarios, contraseñas y un servidor.
  - Las cifras del análisis son las que presentó el equipo. No se conectan con datos de HPC ni se actualizan solas.
  - La meta de contactos no se puede medir hasta que la guía pida datos de contacto en la versión del piloto.
  - Si el equipo está en claro y se eligió Oscuro, la página puede verse clara un instante al abrir, hasta que corre el script. Automático no tiene ese destello.
  - No se probó en un iPhone ni en un Android reales.

### 2026-11-03 - Modo oscuro y ajustes para teléfonos en la guía de clientes

- **Agente/herramienta:** Claude Code (Claude Opus 5.5) · colaborador: tnt101ramirez-ctrl.
- **Rama:** `feature/modo-oscuro`, desde `main` después del PR #13, en un solo commit.
- **Qué se hizo:**
  - La guía de clientes tiene modo oscuro. «Automático» sigue el modo del teléfono y cambia si el teléfono cambia. En el menú, «Aspecto» permite elegir Claro u Oscuro, y la elección se guarda en el navegador (`hpc-theme`). Un script corto en `index.html` aplica el aspecto antes de pintar la página, para que no aparezca un destello blanco.
  - Colores en oscuro:
    - fondo `#121516` y tarjetas `#1B1F20`;
    - texto `#EEF1F1` y texto secundario `#A3ABAE`;
    - textos naranjas `#FF8A4C`;
    - botones `#FC641B` con texto negro.

    Las fotos de producto quedan sobre fondo claro. Los colores están en un bloque al final de `styles.css`.
  - Ajustes para iPhone y Android, solo en CSS (sin código de app nativa):
    - Los textos de 7 a 9 px pasan a 10 u 11 px. Quedan más pequeños el logo y algunos textos con el teléfono en horizontal.
    - El buscador de Mis herramientas ocupa todo el ancho.
    - Los enlaces pequeños tienen más área para tocar.
    - El iPhone no agranda el texto solo al girarlo, y en pantallas táctiles los campos usan 16 px, para que iOS no acerque la página.
  - Los dos colores que estaban dentro de `app.js` («No es lo que busco» y «Eliminar registro de este dispositivo») pasan a clases de CSS.
  - Cambios en el modo claro:
    - Cuatro textos que no alcanzaban 4.5:1 ahora sí lo alcanzan: las respuestas de las preguntas frecuentes de garantía, Mis herramientas vacío, la letra pequeña de la opción elegida y «Eliminar registro».
    - La regla `[hidden]` vuelve a ocultar la vista previa vacía de la factura. Antes, en el formulario de registro se veía como una imagen rota.
  - `check-guide.cjs` prueba el aspecto: automático, elegido, guardado y valor desconocido. Los dos scripts de comprobación ahora simulan también `document.documentElement`.
  - Versión `0.4.0`, por ser una función nueva. El portal interno solo cambia su número de versión. Copia portátil regenerada.
- **Por qué:** lo pidió el colaborador, y Oliver aprobó el modo oscuro. La guía se abre desde un QR en el teléfono del cliente; muchos teléfonos usan el modo oscuro, y la letra de 7 a 9 px casi no se lee en un teléfono.
- **Archivos afectados:** `dist/index.html`, `dist/styles.css`, `dist/app.js`, `dist/data.js`, `prototipos/portal-interno.html`, `scripts/check-guide.cjs`, `scripts/check-portal-interno.cjs`, `preview/HPC_Cliente_Mockup.html`, `PROYECTO.md`, `README.md`, `docs/alcance-cliente.md`, `docs/versiones.md`.
- **Comprobaciones:**
  - `node --check`, `node scripts/check-guide.cjs` y `node scripts/check-portal-interno.cjs`: correctos.
  - Chrome sin ventana con axe-core 4.10.2 (WCAG 2.1 A y AA), en oscuro y en claro, a 390 y 1366 px: 54 pantallas y ventanas. Cubre inicio, menú, preguntas, recomendación, comparar, colaborador, «No es lo que busco», punto de venta, sin opción, garantía con las respuestas abiertas, registro, Mis herramientas, ayuda y «Cómo funciona». Solo quedan los cuatro números decorativos de las tarjetas de inicio, como antes. Sin desbordamiento ni errores en la consola.
  - Selector en Chrome con clic real: 15 de 15. Cambia al instante, recuerda la elección al recargar y en otras páginas, sigue al teléfono en Automático, maneja un valor desconocido y funciona en la copia portátil. Sin errores en la consola.
  - Chrome emulando teléfonos en claro y en oscuro: iPhone SE, iPhone 15, iPhone 15 Pro Max, un iPhone en horizontal y Android de 360 y 412 px. Fueron 132 pantallas, sin desbordamiento ni texto fuera de su caja; solo aparece el logo, que junta sus letras a propósito. Después de los ajustes, 88 pantallas en cuatro de esos teléfonos dieron el mismo resultado.
  - Revisión visual de las capturas en celular y escritorio.
- **Pendientes/límites:**
  - No se probó en un iPhone ni en un Android reales, ni en Safari. Chrome emuló el tamaño, la pantalla táctil y el modo oscuro de cada teléfono.
  - Los números decorativos de las tarjetas siguen tenues en los dos modos y están ocultos para los lectores de pantalla.
  - El portal interno no tiene modo oscuro.
  - La barra del navegador del teléfono sigue en naranja (`theme-color`) en los dos modos.

### 2026-11-03 - Centros de servicio, enlaces y garantía según la información oficial de HPC

- **Agente/herramienta:** Claude Code (Claude Opus 5.5) · colaborador: tnt101ramirez-ctrl.
- **Rama:** `fix/informacion-oficial-hpc`, desde `main` después del PR #12, en un solo commit.
- **Qué se hizo:**
  - Centros de servicio de [hpc.com.gt/centros-de-servicio](https://hpc.com.gt/centros-de-servicio), consultada el 2026-11-03: la central en la 6a Avenida 8-25, zona 4, con su horario propio, y 11 centros más. Dos no tienen mostrador. Retalhuleu ya no aparece. «Cómo llegar» usa las coordenadas de los enlaces oficiales.
  - Los enlaces a la política de garantía y a los centros pasan a `hpc.com.gt`. Los anteriores de `hpcenlinea.com.gt` daban error 404 en el pie de página, Garantía, Ayuda, el texto de WhatsApp y el portal.
  - Garantía: dice que HPC no pide factura, qué no cubre (accesorios, consumibles, insumos y promocionales) y qué ofrece cuando no aplica. «Guarda tu factura» pasa a «Ten los datos de tu herramienta a la mano»; el registro de compra no cambia.
  - El portal interno copia los mismos centros, enlaces y textos. `check-portal-interno.cjs` compara también el horario general.
  - Versión `0.3.2`; copia portátil regenerada.
- **Por qué:** la guía mostraba direcciones que ya no son las oficiales, dos enlaces rotos y un mensaje sobre la factura contrario a la política publicada.
- **Archivos afectados:** `dist/data.js`, `dist/app.js`, `prototipos/portal-interno.html`, `scripts/check-portal-interno.cjs`, `preview/HPC_Cliente_Mockup.html`, `PROYECTO.md`, `README.md`, `docs/versiones.md`.
- **Comprobaciones:**
  - `node --check`, `node scripts/check-guide.cjs` y `node scripts/check-portal-interno.cjs`: correctos.
  - Chrome sin ventana, a 390 y 1366 px, en la guía, la copia portátil y el portal (colaborador y mayorista): 81 de 81. Cubre los centros, los horarios, los enlaces, los textos de garantía, el texto de WhatsApp, «Copiar para enviar al cliente» y el desbordamiento horizontal; sin errores en la consola.
  - Los enlaces nuevos responden. Los anteriores dan 404 en el navegador. La búsqueda de Zacapa abre Río Hondo en Google Maps.
- **Pendientes/límites:**
  - La página de garantía de HPC muestra 10 centros; la de centros muestra 12, con El Rancho y Morales sin mostrador. Se usó la de centros.
  - Las direcciones, los horarios y los enlaces pueden volver a cambiar; conviene revisarlos antes de un piloto.
  - No se probó en un teléfono.

### 2026-10-29 - Naranja de la marca con contraste suficiente en la guía (opción A)

- **Agente/herramienta:** Claude Code (Claude Opus 5.5) · colaborador: tnt101ramirez-ctrl.
- **Rama:** `fix/naranja-contraste-guia`, desde `main` después del PR #9, en un solo commit. Reemplaza al PR #10, que tenía dos commits y chocaba con `main`.
- **Qué se hizo:**
  - En la guía de clientes, `#C2410C` (variable `--orange-text`) reemplaza a `#FC641B` en textos, botones con texto, el enlace para saltar al contenido y el contorno de foco.
  - `#FC641B` se conserva en el logo, los íconos, los bordes y la barra de progreso.
  - El portal interno solo cambia su número de versión.
  - Versión `0.3.1`; copia portátil regenerada; contexto y documentación actualizados.
- **Por qué:** el naranja de la marca tenía entre 2.6 y 3:1 de contraste en texto pequeño; WCAG 2.1 AA pide 4.5:1.
- **Archivos afectados:** `dist/styles.css`, `dist/data.js`, `preview/HPC_Cliente_Mockup.html`, `prototipos/portal-interno.html` (versión), `PROYECTO.md`, `README.md`, `docs/alcance-cliente.md`, `docs/versiones.md`.
- **Comprobaciones:**
  - `node --check`, `node scripts/check-guide.cjs` y `node scripts/check-portal-interno.cjs`: correctos.
  - axe-core en 32 pantallas de la guía: 0 problemas de contraste con el naranja. Quedan los 8 números decorativos, ocultos para los lectores de pantalla.
  - Chrome y Edge, a 1280 y 360 px: 19 de 19 en cada uno (colores, sin desbordamiento y sin errores en la consola).
  - Teclado real en Chrome: 6 de 6, con el contorno de foco visible y separado del botón.
- **Pendientes/límites:**
  - Oliver decide entre la opción A (aplicada) y la B (texto oscuro sobre el naranja actual).
  - El portal interno conserva sus botones con `#FC641B`.
  - No se probó con un lector de pantalla ni en un teléfono.

### 2026-10-29 - Código de atención entre la guía y el portal interno

- **Agente/herramienta:** Claude Code (Claude Opus 5.5) · colaborador: tnt101ramirez-ctrl.
- **Rama:** `feature/codigo-atencion`, creada sobre la rama del PR #8 y actualizada con `main` después de integrarse los PR #7 y #8.
- **Referencia:** [PR #9](https://github.com/oliverlosen/HPC_portal/pull/9).
- **Qué se hizo:**
  - La guía muestra un código de atención de cinco caracteres en «Muéstrale esta pantalla» y en la pantalla sin opción en la muestra (por ejemplo, `P412L`). Resume las cuatro respuestas: la letra de la necesidad (P, L, A o G), el número del material, de la frecuencia y de la prioridad, y una letra de control. No lleva datos personales ni se envía a ningún lado.
  - Con un enlace directo a un producto, sin respuestas, el código no aparece. Si el cliente pasó a una alternativa, se conserva el código de su guía.
  - En «Atender cliente» del portal interno, el colaborador escribe el código (acepta minúsculas, espacios y guiones). Ve las respuestas del cliente, la recomendación de la guía, su explicación y las otras opciones adecuadas. Si la muestra no cubre la necesidad, el portal lo indica y ofrece derivar a un asesor.
  - Un código con un carácter mal escrito o con dos caracteres vecinos intercambiados se rechaza con un aviso. El código de producto y el modelo siguen funcionando.
  - Las atenciones registradas con el código guardan sus respuestas (`via: 'codigo'`) y se cuentan aparte en las métricas del colaborador.
  - La guía y el portal interno siguen separados:
    - la guía solo muestra el código; no enlaza, no carga ni menciona el portal;
    - el portal sigue fuera de `dist/`, que es lo único que se publica.
  - Después de buscar, el foco pasa al título del resultado, y el resultado completo queda visible debajo de la barra fija del portal. Antes, en celular, esa barra tapaba el título o las respuestas al tocar un código de prueba o una alternativa.
  - Si el código no es válido, el foco vuelve al campo, y el error queda asociado a él para los lectores de pantalla.
  - `scripts/check-guide.cjs` y `scripts/check-portal-interno.cjs` comprueban:
    - los 144 códigos;
    - que el portal lea los mismos que muestra la guía;
    - que se rechacen 11 580 errores de escritura.
  - La versión pasa a `0.3.0` en `dist/data.js` y en el portal; la copia portátil se regeneró.
- **Por qué:** el colaborador solo veía el producto recomendado, no lo que contestó el cliente ni por qué se le recomendó. Con el código puede retomar la conversación sin repetir las preguntas. La publicación del sitio no se tocó.
- **Archivos afectados:** `dist/data.js`, `dist/app.js`, `dist/styles.css`, `preview/HPC_Cliente_Mockup.html` (regenerado), `prototipos/portal-interno.html`, `scripts/check-guide.cjs`, `scripts/check-portal-interno.cjs`, `README.md`, `PROYECTO.md`, `docs/alcance-cliente.md`, `docs/versiones.md`.
- **Comprobaciones:**
  - `node --check` de los archivos JavaScript.
  - `node scripts/check-guide.cjs` y `node scripts/check-portal-interno.cjs`: correctos. En una copia aparte se confirmó que fallan si se cambia la letra de control, los pesos de la cuenta o la letra de una necesidad.
  - Prueba en navegador sin ventana: 38 de 38 en Chrome y 38 de 38 en Edge. Recorre la guía, la copia portátil y el portal:
    - el código en las dos pantallas de la guía, la alternativa y el enlace directo;
    - en el portal, la búsqueda con Enter y con el botón, el código inválido, el código de producto y el modelo;
    - el registro de atenciones, las métricas y la recarga;
    - la vista a 360 px, con el resultado visible debajo de la barra fija y sin desbordamiento;
    - la consola sin errores.
  - axe-core 4.10.2 no encuentra problemas en los elementos nuevos. Solo marca el naranja de la marca, que ya estaba pendiente.
  - Siguen correctas la prueba anterior con teclado real (25 de 25) y la de recorridos del portal: colaborador y mayorista, sin desbordamiento a 360, 390 y 1280 px.
  - Después de actualizar la rama con `main`, el código probado no cambió. Los pasos de GitHub Actions pasan en esta rama: sintaxis, `scripts/check-*.cjs` y copia portátil al día.
- **Pendientes/límites:**
  - Conviene integrarlo solo si los colaboradores o los asesores de HPC van a usar el portal interno en el piloto. Si no, el cliente vería en la guía un código que nadie puede leer; en ese caso, es mejor dejar esta rama sin integrar hasta decidirlo.
  - El colaborador escribe el código a mano; no hay conexión entre el celular del cliente y el portal, que sigue siendo un prototipo con datos de ejemplo.
  - Si cambian el orden o la cantidad de las necesidades, materiales, frecuencias o prioridades, cambian los códigos. Las comprobaciones lo detectan, pero un código ya mostrado a un cliente dejaría de corresponder.
  - El naranja espera la decisión de Oliver.
  - No se probó con un lector de pantalla real ni en un teléfono.

### 2026-10-26 - Accesibilidad de la guía de clientes (sin el naranja)

- **Agente/herramienta:** Claude Code (Claude Opus 5.5) · colaborador: tnt101ramirez-ctrl.
- **Rama:** `fix/accesibilidad-guia`, preparada el 2026-10-21 sobre el PR #6 y actualizada sobre `main` cuando ese PR se integró.
- **Referencia:** [PR #8](https://github.com/oliverlosen/HPC_portal/pull/8).
- **Qué se hizo:**
  - Al tocar «Continuar» o «Anterior», el foco pasa al título de la nueva pregunta; al cambiar de página, al título principal. Antes se perdía y había que recorrer la página desde arriba.
  - Cada pregunta y la pantalla «sin opción en la muestra» tienen h1, y ya no se salta de h1 a h3 (columna de contexto, «¿Por qué esta herramienta?», ayuda y Mis herramientas). Los estilos no cambian.
  - La barra de progreso queda como decoración (el texto «Paso X de 4» ya la describe) y la columna de contexto deja de ser contenido complementario anidado.
  - 37 colores de texto gris o claro se oscurecen, con el mismo matiz, hasta 4.6:1, incluida la variable `--muted`. Los números decorativos de las tarjetas se ocultan a los lectores de pantalla y conservan su color.
  - La versión pasa a `0.2.1` en `dist/data.js` y en el portal interno; la copia portátil se regeneró.
  - `PROYECTO.md` agrega el criterio de contraste y uso con teclado, y la decisión pendiente sobre el naranja; `docs/alcance-cliente.md`, el criterio de contraste.
- **Por qué:** lo encontró la revisión con axe-core y con teclado del 2026-10-21. El naranja de la marca no se toca: espera la decisión de Oliver entre dos opciones.
- **Archivos afectados:** `dist/app.js`, `dist/styles.css`, `dist/data.js`, `preview/HPC_Cliente_Mockup.html` (regenerado), `prototipos/portal-interno.html` (versión), `docs/versiones.md`, `docs/alcance-cliente.md`, `README.md`, `PROYECTO.md`.
- **Comprobaciones:** `node --check` de los archivos JavaScript; `node scripts/check-guide.cjs` y `node scripts/check-portal-interno.cjs` correctos. axe-core en 32 pantallas de la guía, en escritorio y celular y con sus ventanas: el contraste insuficiente baja de 475 a 94 (86 del naranja y 8 números decorativos); barra de progreso, sección anidada, título principal y orden de títulos bajan de 28 a 0. Teclado real en Chrome: 25/25, con el foco en cada pregunta y en la recomendación. La guía y la copia portátil abren con la versión `0.2.1` en Edge y en Chrome, sin desbordamiento a 360 y 390 px. El portal interno pasa sus pruebas de recorridos en Edge y Chrome. Comparación visual antes y ahora: mismo diseño, con grises algo más oscuros. Todo se repitió el 2026-10-26, después de actualizar la rama sobre `main`, con los mismos resultados.
- **Pendientes/límites:** el naranja en textos y botones espera la decisión de Oliver. axe marca como «skip-link» el enlace `#inicio` del logo en el celular, pero es una ruta de la guía, no un enlace para saltar contenido. No se probó con un lector de pantalla real ni en un teléfono. Si el PR #7 se integra antes, `ULTIMOS_CAMBIOS.md` tendrá entradas de los dos PR en el mismo lugar; se conservan ambas.
### 2026-10-21 - Comprobaciones automáticas en cada PR

- **Agente/herramienta:** Claude Code (Claude Opus 5.5) · colaborador: tnt101ramirez-ctrl.
- **Rama:** `feature/comprobaciones-automaticas` · [PR #7](https://github.com/oliverlosen/HPC_portal/pull/7).
- **Qué se hizo:** `.github/workflows/comprobaciones.yml` ejecuta con GitHub Actions, en cada PR y en `main`, las comprobaciones que no necesitan navegador: `node --check` de `dist/app.js`, `dist/data.js` y los scripts; todos los `scripts/check-*.cjs`; y que `preview/HPC_Cliente_Mockup.html` coincida con `dist/` al regenerarla. `AGENTS.md`, `CONTRIBUTING.md` y `README.md` lo mencionan. No cambia la guía ni su versión.
- **Por qué:** que un error de sintaxis, una regla rota o una copia portátil desactualizada se vea en el PR antes de que Oliver decida integrarlo.
- **Archivos afectados:** `.github/workflows/comprobaciones.yml` (nuevo), `AGENTS.md`, `CONTRIBUTING.md`, `README.md`.
- **Comprobaciones:** los mismos pasos del flujo, ejecutados con Bash en una copia limpia de esta rama: todos correctos. Con la copia portátil alterada a propósito, el último paso falla y muestra el archivo. En GitHub, la primera ejecución en el PR #7 pasó en 12 s, con un aviso: las acciones `@v4` usan Node 20, que GitHub está retirando. Por eso se cambiaron a `actions/checkout@v5` y `actions/setup-node@v5`. Enlaces y estructura del README revisados.
- **Pendientes/límites:** las comprobaciones corren con Node 22. No sustituyen las pruebas en un navegador. GitHub avisa que `ubuntu-latest` pasará a Ubuntu 26 desde el 2026-10-19; no afecta, porque solo se usan Node y Git. Si se integra después del PR #6, también correrá `scripts/check-portal-interno.cjs`.

### 2026-10-21 - Accesibilidad del portal interno: estructura

- **Agente/herramienta:** Claude Code (Claude Opus 5.5) · colaborador: tnt101ramirez-ctrl.
- **Rama:** `feature/portal-interno` · [PR #6](https://github.com/oliverlosen/HPC_portal/pull/6).
- **Qué se hizo:** en `prototipos/portal-interno.html`, el aviso del prototipo es una región con nombre y cada pantalla tiene un título principal (h1) para lectores de pantalla. La tarjeta del QR y el resumen del pedido dejan de marcarse como contenido complementario dentro del contenido principal. No cambia nada visible.
- **Por qué:** una revisión automática de accesibilidad (axe-core 4.10.2) encontró esos problemas de estructura en las pantallas del portal.
- **Archivos afectados:** `prototipos/portal-interno.html`.
- **Comprobaciones:** axe-core en 26 pantallas (18 del portal y 8 de la guía): en el portal solo queda el contraste del texto blanco sobre el naranja de la marca (3:1). Prueba con teclado real en Chrome (Tab, Enter, Espacio, flechas y Escape): acceso, preguntas sin celular, registro de la atención, panel de datos, pestañas y reposición sin mouse, con foco siempre visible. Las pruebas de recorridos de la entrada anterior pasan en Edge y en Chrome. `node scripts/check-guide.cjs` y `node scripts/check-portal-interno.cjs` correctos.
- **Pendientes/límites:** el contraste del naranja, que comparten el portal y la guía, espera la decisión de Oliver entre dos opciones. En la guía de clientes, fuera de este PR, quedan el contraste de grises y naranja, la etiqueta de la barra de progreso, el orden de los títulos, una sección complementaria anidada y el foco que se pierde al tocar «Continuar».

### 2026-10-21 - Portal interno de colaborador y mayorista (prototipo)

- **Agente/herramienta:** Claude Code (Claude Opus 5.5) · colaborador: tnt101ramirez-ctrl.
- **Rama:** `feature/portal-interno`.
- **Qué se hizo:** se agrega `prototipos/portal-interno.html`, el prototipo que Oliver revisó como `dashboard-colaboradores.html`. Es un solo archivo, fuera de `dist/` y sin publicar, con dos modos. El colaborador consulta por código o le hace al cliente sin celular las cuatro preguntas de la guía, registra el resultado de la atención, ve los productos por agotarse y pide reposición, y consulta servicio y garantía, QR para anaquel y métricas de su tienda. El mayorista tiene catálogo con precios por volumen de ejemplo, pedido y pedido sugerido, solicitudes de reposición de sus tiendas, QR, servicio y garantía, y métricas. Los datos se guardan en el navegador y se pueden pasar a otra computadora con un archivo. `scripts/check-portal-interno.cjs` compara lo que el portal copia de la guía y prueba sus funciones propias. La versión pasa a `0.2.0` por ser una función nueva del prototipo; la guía de clientes no cambia salvo ese número. Se documentaron el portal, la comprobación y las notas de `v0.1.2` y `v0.2.0`.
- **Por qué:** el colaborador y el mayorista necesitan herramientas distintas a las del cliente. Oliver revisó el prototipo y autorizó agregarlo al repositorio (aviso de tnt101ramirez-ctrl, 2026-10-21).
- **Archivos afectados:** `prototipos/portal-interno.html` y `scripts/check-portal-interno.cjs` (nuevos), `dist/data.js`, `preview/HPC_Cliente_Mockup.html` (regenerado; solo cambia la versión), `AGENTS.md`, `PROYECTO.md`, `README.md`, `docs/versiones.md`.
- **Comprobaciones:** `node --check` de `dist/app.js`, `dist/data.js`, ambos scripts y el script del portal. `node scripts/check-guide.cjs` correcto. `node scripts/check-portal-interno.cjs` correcto (144 combinaciones, 9 productos, 117 explicaciones y alternativas, centros, textos de garantía, categorías del QR, descuentos, copia de datos y capacidad del QR); también falla, como debe, con cambios introducidos a propósito en una copia. En Edge sin interfaz, con marcos de ancho fijo: 171 comprobaciones de recorridos de ambos modos, incluidas las 144 combinaciones respondidas en pantalla, la ida y vuelta de la copia de datos, archivos dañados y texto con HTML; QR de las versiones 1 a 10 leídos con un lector independiente (jsQR); sin desbordamiento horizontal a 360, 390 y 1280 px y sin errores de JavaScript. La guía y la copia portátil abren con la versión `0.2.0`, inician la Smart Guide y no desbordan a 360 y 390 px.
- **Pendientes/límites:** precios mayoristas, existencias, pedidos, métricas y códigos de acceso son de ejemplo; los códigos no son seguros. Sin servidor, pasar datos entre computadoras es manual. El QR usa una dirección de ejemplo hasta que la guía esté publicada. Centros y horarios son los de la guía; conviene confirmarlos con HPC. No se probó en un teléfono real, con una impresora ni escaneando con una cámara. El portal copia datos y reglas de la guía en lugar de leer `dist/`; la comprobación detecta si dejan de coincidir. Las Releases `v0.1.0` a `v0.2.0` siguen pendientes de la aprobación de Oliver.

### 2026-10-18 - Pendientes de la revisión: textos, navegación, registros y fecha

- **Agente/herramienta:** Claude Code (Claude Opus 5.5) · colaborador: tnt101ramirez-ctrl.
- **Rama:** `fix/pendientes-revision`.
- **Qué se hizo:** la explicación de hidrolavadora habla de "tu carro o moto" y "tu patio o terraza". Al volver con Atrás a una recomendación que no corresponde a las respuestas vigentes, la guía conserva solo la categoría del producto y ya no mezcla respuestas de otro recorrido; una alternativa elegida en el mismo recorrido conserva sus respuestas. Mis herramientas muestra una tarjeta por registro de compra, con su fecha, aunque sea del mismo producto, y el contador del menú cuenta esas tarjetas. La fecha máxima de compra y su validación usan la fecha local del dispositivo. `AGENTS.md` indica ejecutar `node scripts/check-guide.cjs`, y el script incorpora pruebas de estos casos. La versión pasa a `0.1.2` en `dist/data.js`, README, PROYECTO y las notas de `docs/versiones.md`.
- **Por qué:** pendientes anotados en las revisiones del 2026-10-13 y comprobados en `main` (`9670324`): un segundo registro del mismo producto no se podía abrir ni borrar y, después de las 18:00 en Guatemala, el formulario aceptaba la fecha de mañana.
- **Archivos afectados:** `dist/app.js`, `dist/data.js`, `scripts/check-guide.cjs`, `preview/HPC_Cliente_Mockup.html` (regenerado), `AGENTS.md`, `README.md`, `PROYECTO.md`, `docs/versiones.md`.
- **Comprobaciones:** `node --check` de `dist/app.js`, `dist/data.js` y `scripts/check-guide.cjs`; `node scripts/check-guide.cjs` correcto, y cada prueba nueva falla con el código de `9670324`. En Edge sin interfaz, con marcos de ancho fijo: cuatro explicaciones de hidrolavadora; Atrás del navegador hacia una recomendación de otro recorrido; fecha máxima igual a la fecha local; dos registros del mismo producto con tarjetas, apertura y eliminación independientes; búsqueda; comparar, Me lo llevo, colaborador y tienda; sin desbordamiento horizontal a 360 y 390 px; tarjeta de portada sin superposición; sin errores de consola; copia portátil con versión `0.1.2`.
- **Pendientes/límites:** no se probó en un teléfono real, con factura adjunta ni compartiendo por WhatsApp. Las Releases `v0.1.0`, `v0.1.1` y `v0.1.2` siguen pendientes de la aprobación de Oliver. Las reglas requieren validación comercial de HPC.

### 2026-10-13 - Revisión del PR #4, conflicto conservado y política de Releases

- **Agente/herramienta:** Codex / ChatGPT, por solicitud de Oliver.
- **Rama:** `docs/readme-contributing` · [PR #4](https://github.com/oliverlosen/HPC_portal/pull/4).
- **Qué se hizo:** se conservaron las mejoras del README y CONTRIBUTING y la aprobación de cada PR por `oliverlosen`. Se preparó la combinación con el PR #3, resolviendo el conflicto del registro con todas las entradas de ambos PR. Se añadió la política de versiones, los commits de referencia para las primeras etiquetas, notas de entrega y recuperación mediante un PR; README y contexto enlazan esa guía y describen la nueva comprobación de comportamiento.
- **Por qué:** integrar el trabajo del equipo sin sobrescribir sus entradas, mantener documentación coherente con las correcciones y dejar una forma reproducible de conservar y recuperar entregas.
- **Archivos afectados:** `README.md`, `CONTRIBUTING.md`, `docs/versiones.md`, `PROYECTO.md`, `ULTIMOS_CAMBIOS.md`. La combinación conserva los cambios de fuentes y vista portátil del PR #3.
- **Comprobaciones:** enlaces relativos y rutas de documentación existentes; categorías QR, eventos y versión comparados con `dist/app.js` y `dist/data.js`; ausencia de marcadores de conflicto; preservación de todas las entradas anteriores; sintaxis, comportamiento y equivalencia de la copia portátil en la combinación preparada.
- **Pendientes/límites:** no hay Releases publicadas. La conexión disponible permite revisar e integrar PR, pero no crear etiquetas o Releases; la guía deja preparada su creación en GitHub. No se cambió ni se desplegó el Site. Las limitaciones de comprobación visual del PR #3 siguen documentadas.

### 2026-10-13 - Documentación: requisitos, estructura y colaboración

- **Agente/herramienta:** Claude Code (Claude Opus 5.5) · colaborador: tnt101ramirez-ctrl.
- **Rama:** `docs/readme-contributing`.
- **Qué se hizo:** en `README.md`, requisitos para colaborar (Git; Node.js solo para comprobaciones y la copia portátil; Python opcional), estructura completa del repositorio, valores válidos de `categoria` en los enlaces QR/NFC, lista completa de eventos de medición y origen real de las fotografías. En `CONTRIBUTING.md`, se aclara que se trabaja con un clon (sin fork), cómo avisar qué área se va a modificar, que regenerar la copia portátil requiere Node.js y que el responsable del repositorio aprueba la integración de cada PR.
- **Por qué:** la estructura no incluía los archivos agregados después de la primera versión, faltaban los requisitos y las categorías para generar enlaces, y no estaba escrito quién aprueba la integración.
- **Archivos afectados:** `README.md`, `CONTRIBUTING.md`.
- **Comprobaciones:** enlaces relativos de ambos documentos verificados contra los archivos del repositorio; categorías y eventos comparados con `dist/app.js`; estructura comparada con los archivos versionados. Sin cambios de código.
- **Pendientes/límites:** la regla sobre quién aprueba la integración es una propuesta para que Oliver la confirme en la revisión. "Alternativa elegida" describe el comportamiento corregido en el PR #3; en `main`, "Mantener esta" todavía registra ese evento hasta que se integre.

### 2026-10-13 - Revisión del PR #3 y selección para madera y metal

- **Agente/herramienta:** Codex / ChatGPT, por solicitud de Oliver.
- **Rama:** `fix/errores-revision-inicial` · [PR #3](https://github.com/oliverlosen/HPC_portal/pull/3).
- **Qué se hizo:** se conservaron las correcciones del colaborador y se completó la decisión de recomendación: para madera o metal con uso diario o prioridad de capacidad se muestra ROTI-20A3; el SDS deja de seleccionarse o compararse automáticamente en esos materiales. Se explica el modo sin percusión, la diferencia de baterías y la consulta a HPC para trabajo intenso o continuo. Se corrigió la explicación restante del SDS para mampostería, se actualizó el contexto, se agregó una comprobación de comportamiento sin dependencias y se regeneró el HTML portátil. La versión del frontend queda en `0.1.1`, preparada para etiquetarla posteriormente.
- **Por qué:** corregir el texto no resolvía una regla que trataba potencia como adecuación al material. Las fichas y el manual de Truper se consultaron el 2026-10-13; el SDS admite madera y metal, pero no será la opción automática por watts. Dos baterías no significan mayor diámetro de perforación.
- **Archivos afectados:** `dist/app.js`, `dist/data.js`, `PROYECTO.md`, `scripts/check-guide.cjs`, `preview/HPC_Cliente_Mockup.html`, `ULTIMOS_CAMBIOS.md`.
- **Comprobaciones:** sintaxis de ambos archivos JavaScript; `node scripts/check-guide.cjs` con 36 resultados esperados para perforación y 144 combinaciones válidas del recorrido, controles generados, cierre sin evento y selección con un evento de alternativa, 8 explicaciones de aspiradora; copia portátil regenerada y comparada con sus fuentes. Las instantáneas descargadas coinciden con sus blobs de GitHub. La combinación local de los PR #3 y #4 confirmó un único conflicto: `ULTIMOS_CAMBIOS.md`.
- **Pendientes/límites:** no se repitió la comprobación visual móvil, consola del navegador, fotos externas ni archivos de factura: no hay navegador instalado y su descarga falló. El adaptador de las pruebas comprueba comportamiento, no diseño ni red; las comprobaciones visuales del colaborador permanecen documentadas en su entrada. La regla necesita validación comercial de HPC. Cambiar el número de versión no crea una etiqueta, una Release ni una publicación. Los problemas fuera del alcance anotados por el colaborador siguen pendientes.

### 2026-10-13 - Corrección de errores de la revisión inicial

- **Agente/herramienta:** Claude Code (Claude Opus 5.5) · colaborador: tnt101ramirez-ctrl.
- **Rama:** `fix/errores-revision-inicial`.
- **Qué se hizo:** la explicación del rotomartillo SDS Plus 1500 W, cuando se recomienda para madera, metal o block por capacidad o uso diario, ya no dice que es inalámbrico ni que atornilla: indica que es el equipo de más potencia de la muestra, pensado para concreto, y pide confirmar con un asesor. Las explicaciones de aspiradoras mencionan la limpieza que eligió el cliente. En la comparación, "Mantener esta" solo cierra la ventana y ya no registra `alternative_selected`. En pantallas de 520 px o menos, la tarjeta "Tu proyecto está respaldado" se ajusta a su columna y ya no tapa "Empezar mi proyecto". Las fotos se piden a 828 px en lugar de 3840 px.
- **Por qué:** errores encontrados en la revisión del 2026-10-12: información de producto incorrecta, métrica de alternativas inflada, botón principal tapado en móvil (45, 30 y 15 px a 360, 375 y 390 px) y fotos unas tres veces más pesadas de lo necesario (9 fotos: 677 KB antes, 213 KB ahora).
- **Archivos afectados:** `dist/app.js`, `dist/styles.css` y `preview/HPC_Cliente_Mockup.html` (regenerado con `node scripts/export-preview.cjs`).
- **Comprobaciones:** `node --check dist/app.js` y `node --check dist/data.js` sin errores. Pruebas con clics en Edge sin interfaz, dentro de marcos de ancho fijo: recorridos de taladro (madera, metal, block y concreto), aspiradora (cuatro superficies), hidrolavadora y grifo (baño y cocina); "Mantener esta" sin evento y "Elegir alternativa" con `alternative_selected`; Me lo llevo, colaborador, cambio de tienda, registro sin factura, búsqueda y eliminación. La tarjeta no se superpone al botón, al título ni al texto entre 360 y 1440 px; sin desbordamiento horizontal a 360 y 390 px; fotos de 828 px cargadas; sin errores de consola. La copia portátil abre y contiene los cambios.
- **Pendientes/límites:** sigue pendiente que HPC u Oliver decidan qué recomendar para madera o metal con mayor capacidad o uso diario (la regla no cambió, solo el texto). A 360 px el texto de la tarjeta ocupa seis líneas. No se probó en un teléfono real, ni guardar una factura como archivo ni compartir por WhatsApp. Las fotos siguen dependiendo del servicio de imágenes de hpcenlinea.com.gt. Detectado y fuera de esta tarea: la explicación de hidrolavadora dice "Quieres limpiar mi carro o moto"; volver con Atrás puede mezclar respuestas de dos recorridos; un segundo registro del mismo producto no se puede abrir; la fecha máxima de compra usa UTC.

### 2026-10-12 - Contexto compartido y guías de agentes

- **Agente/herramienta:** Codex / ChatGPT.
- **Rama:** `docs/agent-guidelines`.
- **Qué se hizo:** se agregó una guía común para los agentes, un punto de entrada para Claude que importa esa guía, contexto funcional y técnico del proyecto, este registro con plantilla, una guía de colaboración y una plantilla de PR. El README ahora enlaza estos documentos y contiene un mensaje de inicio para otros agentes.
- **Por qué:** el equipo trabajará con varias personas, computadoras y herramientas; las decisiones y los avances deben poder recuperarse desde el repositorio.
- **Archivos afectados:** `AGENTS.md`, `CLAUDE.md`, `PROYECTO.md`, `ULTIMOS_CAMBIOS.md`, `CONTRIBUTING.md`, `README.md` y `.github/pull_request_template.md`.
- **Comprobaciones:** coherencia con el frontend existente y revisión de enlaces locales de Markdown; el código y el HTML portátil permanecen sin cambios.
- **Pendientes/límites:** cada agente debe leer y cumplir la guía. No se añadió un bot ni un proceso que redacte entradas automáticamente. Los cambios de esta entrada se entregan en una rama/PR para revisión.

### 2026-10-12 - Primera versión del frontend de cliente

- **Agente/herramienta:** Codex / ChatGPT.
- **Rama de implementación:** `codex/hpc-client-mockup`.
- **Referencia:** [PR #1](https://github.com/oliverlosen/HPC_portal/pull/1), integrado en `main`.
- **Qué se hizo:** inicio, Smart Guide con cuatro categorías, recomendaciones, alternativas, aceptación, apertura de WhatsApp, ayuda de colaborador, garantía, centros de servicio, registros de compra/factura locales y vista portátil.
- **Por qué:** convertir la propuesta del proyecto en una experiencia de cliente que pueda probarse en escritorio y móvil.
- **Archivos afectados:** fuentes de `dist/`, `preview/HPC_Cliente_Mockup.html`, `scripts/export-preview.cjs`, `README.md`, `docs/alcance-cliente.md` y configuración inicial del repositorio/Sites.
- **Comprobaciones:** recorridos de las cuatro categorías; concreto sin alternativa inadecuada; necesidad fuera de la muestra; comparación; aceptación; ayuda de colaborador; factura; escape de contenido; persistencia; búsqueda; garantía; centros; selector de tienda y menú móvil. Revisión de escritorio y móvil de 390 px, sin errores de JavaScript ni desbordamiento. Inicio y navegación de la copia portátil comprobados.
- **Pendientes/límites:** las pruebas usaron archivos locales. La carga de fotografías externas no se verificó en ese entorno. La publicación en Sites no se completó por las restricciones de red. Precios y puntos de venta son ejemplos, sin backend ni inventario conectado.

## Plantilla para la siguiente tarea

Copia este bloque debajo de “Registro”, antes de las entradas anteriores. Reemplaza todos los campos. Describe lo efectivamente terminado; no registres planes como hechos.

```markdown
### YYYY-MM-DD - Título concreto del cambio

- **Agente/herramienta:** nombre real de la herramienta o agente; no inventar una persona responsable.
- **Rama:** nombre de la rama utilizada.
- **Referencia:** enlace a issue, PR o commit, solo si ya existe; omitir si no aplica.
- **Qué se hizo:** comportamiento, diseño, datos o documentación que cambió.
- **Por qué:** necesidad que resuelve.
- **Archivos afectados:** rutas relevantes.
- **Comprobaciones:** revisión o pruebas realmente realizadas y su resultado.
- **Pendientes/límites:** partes no terminadas, condiciones de demostración o bloqueos; indicar “Ninguno identificado” si corresponde.
```

Mantén las entradas breves y útiles. No pegues conversaciones enteras, facturas, datos de clientes, credenciales ni salidas extensas de herramientas. El historial de Git complementa este resumen; no lo sustituye.
