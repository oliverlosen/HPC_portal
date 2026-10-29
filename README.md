# HPC Smart Guide — Portal de cliente

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

## Abrir el proyecto

No necesita instalar dependencias ni ejecutar una compilación. Sirve la carpeta `dist` con cualquier servidor estático. Por ejemplo, desde la raíz:

```powershell
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Abre `http://127.0.0.1:4173`. El archivo `dist/index.html` también puede abrirse directamente para revisar la interfaz; algunas funciones de almacenamiento pueden requerir un servidor local.

Para revisar la propuesta sin servidor, abre `preview/HPC_Cliente_Mockup.html`: incluye los estilos y la lógica en un solo archivo. Se regenera desde las fuentes con `node scripts/export-preview.cjs`.

**Requisitos para colaborar:** Git para clonar el repositorio y trabajar en ramas. Node.js solo se usa para las comprobaciones de [AGENTS.md](AGENTS.md) (`node --check`) y para regenerar la copia portátil; no hay paquetes que instalar. Python es opcional y solo sirve para el servidor del ejemplo; sin Python, abre `preview/HPC_Cliente_Mockup.html` o `dist/index.html` directamente.

`node scripts/check-guide.cjs` comprueba recomendaciones y eventos con un adaptador mínimo del navegador, sin dependencias. No sustituye la revisión visual ni comprueba fotos externas o facturas. Para identificar entregas y recuperarse de un error, sigue [Versiones y Releases](docs/versiones.md). La versión preparada es `0.3.0`; la publicación de las primeras Releases está pendiente.

## Portal interno (prototipo)

`prototipos/portal-interno.html` es un prototipo, para revisión, de lo que verían el colaborador de tienda y el mayorista. Se abre con doble clic, sin servidor ni instalación, y no forma parte de `dist/` ni de la publicación. Los códigos de acceso de demostración aparecen en la misma pantalla de entrada y no protegen nada.

- **Colaborador:** consulta con el código de atención lo que recomendó la guía y por qué o le hace al cliente las mismas cuatro preguntas si no tiene celular; argumentos de venta, existencias de ejemplo, resultado de la atención, productos por agotarse y solicitud de reposición, servicio y garantía, QR para anaquel y métricas de su tienda.
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

Las fotografías del catálogo de Truper se cargan a través del servicio de imágenes de hpcenlinea.com.gt y requieren conexión; ese servicio puede rechazar solicitudes que no provienen de un navegador. Si no cargan, aparece un icono de la categoría. Las fuentes tienen alternativas locales de sistema.

## Estructura

```text
dist/
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
- Garantía: https://www.hpcenlinea.com.gt/gt/politicasdegarantia
- Servicio local: https://www.hpcenlinea.com.gt/gt/centrosdeservicio

La segunda etapa del documento contempla búsqueda de catálogo, kits/combos y ubicación detallada. Esas funciones se dejan para una próxima iteración.
