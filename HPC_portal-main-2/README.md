# HPC Smart Guide — Presentación de los cuatro portales

Primera versión del frontend para el piloto de asesoría de HPC, basada en **Fase 2 - Proyecto Final.pdf**. Se enfoca en ayudar a un cliente que llega desde QR, NFC o un enlace a encontrar una herramienta para su proyecto y conocer el respaldo local.

## Empezar como colaborador o agente

El contexto compartido vive en el repositorio. Antes de modificar archivos, lee estas referencias desde la rama en la que vas a trabajar:

| Documento | Para qué sirve |
|---|---|
| [AGENTS.md](AGENTS.md) | Instrucciones comunes de trabajo, comprobaciones y registro obligatorio de cambios |
| [CLAUDE.md](CLAUDE.md) | Entrada para Claude Code; importa la guía común |
| [PROYECTO.md](PROYECTO.md) | Objetivo, usuarios, alcance, arquitectura, estado y próximos pasos |
| [ULTIMOS_CAMBIOS.md](ULTIMOS_CAMBIOS.md) | Qué se modificó, por qué, archivos afectados, comprobaciones y pendientes |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Cómo coordinar tareas, ramas y PR entre colaboradores |
| [docs/alcance-cliente.md](docs/alcance-cliente.md) | Detalle de la primera versión de cliente |

**Todo agente que haga una modificación debe registrar su tarea en `ULTIMOS_CAMBIOS.md` antes de entregar o publicar el commit/PR.** Si cambia una decisión, arquitectura o integración, actualiza también `PROYECTO.md`. El equipo mantiene estos archivos junto al código; no dependen de que un agente recuerde conversaciones de otro.

Puedes iniciar un chat o tarea con este mensaje, agregando tu solicitud al final:

> Trabaja en el repositorio `oliverlosen/HPC_portal`. Antes de modificar archivos, lee y sigue `AGENTS.md`; revisa `PROYECTO.md`, `README.md` y las entradas recientes de `ULTIMOS_CAMBIOS.md` de la rama vigente. Comprueba el estado de GitHub y trabaja en una rama por tarea. Al terminar, registra qué hiciste, por qué, los archivos afectados, las comprobaciones y los pendientes; entrega el enlace a la rama o PR. Mi tarea es: [describir tarea].

Codex utiliza `AGENTS.md` como instrucciones de proyecto. `CLAUDE.md` usa la importación `@AGENTS.md` para compartir la misma guía con Claude Code. En interfaces de chat que no carguen archivos automáticamente, solicita su lectura de forma explícita. Referencias: [instrucciones de Codex](https://developers.openai.com/codex/guides/agents-md) e [importaciones de Claude Code](https://code.claude.com/docs/en/memory).

## Abrir la presentación — sin servidor ni internet

Abre **`HPC_Portal_Unificado.html`** con doble clic en Chrome, Edge o Safari. Es el archivo que se comparte para presentar: contiene los portales de **Cliente, Colaborador, Mayorista e Inteligencia Comercial**, sus nueve fotografías, fuentes, estilos, catálogo y lógica. No hay que instalar nada. La compatibilidad comprobada se registra en `ULTIMOS_CAMBIOS.md`; nombrar un navegador aquí no implica que haya sido probado.

El selector superior cambia de portal. Inteligencia Comercial incluye las 14 secciones de la copia local, con ventas, análisis de mercado y encuestas. Colaborador entra con Ana de CEMACO y Mayorista con Distribuidora Norte; el selector «Perfil de ejemplo» permite cambiar de persona o cuenta. Son accesos de demostración, sin autenticación. Los portales conservan su contexto mientras la presentación permanece abierta; recomendaciones, registros y borradores se guardan localmente. Si el navegador bloquea el almacenamiento, un aviso informa que solo se conservarán durante esa sesión. Mover el HTML a otro lugar o usar otro navegador no transfiere los datos anteriores.

**Smart Guide por texto:** escribe el trabajo, un modelo/código, o una consulta de garantía, centros, registro o herramientas guardadas. El intérprete usa 250 frases editoriales, sinónimos y reglas locales; no es un modelo de IA ni envía consultas. Muestra lo entendido, permite corregirlo y pregunta lo que falta sin inventar frecuencia ni presupuesto. El flujo tradicional de cuatro preguntas sigue disponible. Cliente y colaborador utilizan exactamente el mismo intérprete.

La presentación funciona sin conexión. WhatsApp, llamadas, correo, mapas y fichas oficiales son enlaces externos y necesitan la aplicación o conexión correspondiente. Los precios, inventarios, pedidos y métricas siguen siendo ejemplos.

### Regenerar los HTML después de editar

Desde esta carpeta, con Node.js:

```sh
node scripts/export-preview.cjs
```

Este comando no inicia servidores ni descarga recursos. Actualiza el HTML unificado, la copia de cliente `preview/HPC_Cliente_Mockup.html` y el bloque compartido del prototipo interno. **No edites manualmente los HTML generados ni el bloque `HPC_SHARED_BEGIN` / `HPC_SHARED_END`.**

Fuentes: `dist/` para el cliente y el asistente, `presentation/` para el selector común y la copia autónoma de Inteligencia Comercial, `prototipos/portal-interno.html` para el portal interno fuera de su bloque generado. Las fotos y fuentes ya descargadas están en `dist/assets/`. El HTML unificado es el único archivo necesario para la presentación; las fuentes permanecen en esta carpeta para mantenimiento.

Comprobaciones sin instalar dependencias:

```sh
node --check dist/app.js
node --check dist/data.js
node scripts/check-guide.cjs
node scripts/check-portal-interno.cjs
node scripts/check-smart-guide.cjs
node scripts/check-offline-export.cjs
```

La comprobación de navegador es opcional para otros colaboradores: `scripts/check-presentation-browser.cjs` utiliza una instalación existente de Playwright indicada por `HPC_PLAYWRIGHT_PATH` y un navegador indicado por `HPC_BROWSER_PATH`. Si no están disponibles, informa que se omitió; no instala paquetes ni sustituye una prueba visual.

Versión local preparada: **0.6.0**. Esta entrega no publica un sitio ni crea una Release.

## Portal interno (prototipo)

`prototipos/portal-interno.html` es un prototipo, para revisión, de lo que verían el colaborador de tienda y el mayorista. La presentación unificada lo incorpora sin códigos de acceso. El archivo fuente también abre con doble clic, junto a su carpeta `dist/` de recursos, y conserva el acceso con códigos de ejemplo. No se ha publicado. Los códigos de acceso de demostración aparecen en la misma pantalla de entrada y no protegen nada: cada colaborador de ejemplo tiene el suyo y el mayorista usa el de su cuenta. Tiene el mismo diseño de la guía y su propio selector «Aspecto» (Automático, Claro u Oscuro).

- **Colaborador:** consulta con el código de atención lo que recomendó la guía y por qué o le hace al cliente las mismas cuatro preguntas si no tiene celular; argumentos de venta, existencias de ejemplo, resultado de la atención, productos por agotarse y solicitud de reposición, servicio y garantía, QR para anaquel, métricas y metas de su tienda (las del piloto y las suyas del mes) y el análisis del proyecto (HPC en Cemaco). Entra con su código personal y sus atenciones quedan a su nombre.
- **Mayorista:** catálogo con precios por volumen de ejemplo, pedido y pedido sugerido, solicitudes de reposición de sus tiendas, QR, servicio y garantía, y métricas de sus tiendas.

Precios mayoristas, existencias, pedidos y métricas son datos de ejemplo y se guardan en el navegador. Para mostrar los dos modos en computadoras distintas, el enlace «Pasar datos a otra computadora» descarga una copia en un archivo y la carga en la otra; no hay sincronización. El portal copia productos, reglas y textos de la guía; `node scripts/check-portal-interno.cjs` comprueba que sigan iguales.

## Recorridos incluidos

- Inicio con cuatro necesidades, sin mostrar un catálogo como primer paso.
- Smart Guide: tarea, material o superficie, frecuencia de uso y prioridad.
- Recomendación con modelo, código, foto, características y explicación.
- Comparación de alternativas, aceptación y motivos de rechazo.
- Compartir una recomendación en el selector de WhatsApp; no se envían mensajes automáticamente.
- Pantalla para mostrar a un colaborador de tienda el código del producto y el código de atención (por ejemplo, `P412L`), que resume las cuatro respuestas para consultarlas en el portal interno.
- Garantía y respaldo local, enlace a la política oficial y centros de servicio.
- Registro de compra y factura, consulta del registro y eliminación local.
- Mis herramientas con búsqueda por modelo, nombre o código.
- Menú móvil, selección de punto de venta, navegación por teclado y ventanas accesibles.

## Alcance de esta versión

Es un prototipo de frontend, sin backend, autenticación comercial, inventario ni precios en tiempo real. Los modelos, fotografías y códigos se basan en el catálogo de HPC. Todos los precios se identifican como **precios de ejemplo**; los puntos de venta son ejemplos y las áreas de ubicación son orientativas. Las recomendaciones usan reglas de demostración y requieren validación de un especialista y de HPC antes de su uso comercial.

Los datos de compra no se envían a HPC. Los registros y recomendaciones permanecen en `localStorage`; los archivos de factura se guardan en `IndexedDB`. El registro no valida ni activa la garantía. El usuario acepta expresamente guardar su registro en este dispositivo.

Las nueve fotografías de Truper y las fuentes están integradas en los HTML portátiles. Las fuentes editables usan copias en `dist/assets/`; se conserva un icono de respaldo ante una imagen dañada. Las fuentes tipográficas incluyen sus licencias en `dist/assets/fonts/`.

## Estructura

```text
HPC_Portal_Unificado.html  # entrega principal generada, totalmente portátil
presentation/             # selector común: shell.html, shell.css y shell.js
dist/
  smart-knowledge.js       # 250 frases editoriales y sinónimos
  smart-engine.js          # interpretación local de intención y contexto
  smart-ui.js              # interfaz compartida del asistente
  smart-guide.css         # estilo del asistente
  polish.css              # ajustes visuales compartidos
  storage.js              # guardado local con respaldo temporal
  fonts.css
  assets.js
  index.html
  styles.css
  data.js          # catálogo de muestra y puntos de servicio
  app.js           # navegación, reglas, formularios y almacenamiento
  assets/favicon.svg
preview/
  HPC_Cliente_Mockup.html   # copia portátil generada; no se edita a mano
prototipos/
  portal-interno.html       # portal de colaborador y mayorista (prototipo de un solo archivo)
scripts/
  check-smart-guide.cjs
  check-offline-export.cjs
  check-presentation-browser.cjs
  export-preview.cjs        # genera la copia portátil desde dist/
  check-guide.cjs           # comprueba recomendaciones y eventos sin dependencias
  check-portal-interno.cjs  # comprueba que el portal interno use lo mismo que la guía
docs/
  alcance-cliente.md
  versiones.md              # entregas, Releases y recuperación
.openai/hosting.json
.github/pull_request_template.md
.github/workflows/comprobaciones.yml  # comprobaciones automáticas en cada PR y en main
AGENTS.md                   # guía común para agentes
CLAUDE.md                   # entrada para Claude Code; importa AGENTS.md
PROYECTO.md                 # contexto, estado y próximos pasos
ULTIMOS_CAMBIOS.md          # registro de cambios
CONTRIBUTING.md             # cómo colaborar
```

## Enlaces de entrada QR/NFC

Ejemplo: `/?tienda=cemaco&categoria=barrenos&origen=qr`. Los identificadores válidos de tienda son `cemaco`, `aki` y `ferreteria`. Los valores válidos de `categoria` son `barrenos`, `hidrolavadoras`, `aspiradoras` y `griferia` (también se aceptan `drill`, `wash`, `vacuum` y `faucet`). El parámetro `origen` identifica el punto de entrada; no se activa Google Analytics en este prototipo.

La categoría de entrada se conserva como contexto de medición y no sustituye la selección de tarea del cliente.

## Preparación para medición

Los eventos de demostración se guardan localmente y se publican como `CustomEvent('hpc:event')`. Incluyen apertura, inicio del recorrido, tiempo hasta recomendación, recomendación guardada, aceptación, apertura de WhatsApp, solicitud de ayuda, alternativa elegida, rechazo y registro de compra, con o sin factura. No se incluye contenido de facturas ni datos personales en estos eventos.

La apertura de WhatsApp y “Me lo llevo” indican intención, no una compra confirmada. La validación de compra necesitará un flujo posterior con backend y evidencia revisada.

## Fuentes consultadas

- Documento proporcionado: Fase 2 - Proyecto Final.pdf.
- Empresa y catálogo: https://www.hpcenlinea.com.gt/gt
- Garantía: https://hpc.com.gt/politicasdegarantia (consultada el 2026-11-03)
- Servicio local: https://hpc.com.gt/centros-de-servicio (consultada el 2026-11-03)

La segunda etapa del documento contempla búsqueda de catálogo, kits/combos y ubicación detallada. Esas funciones se dejan para una próxima iteración.
