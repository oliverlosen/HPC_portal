# Últimos cambios - HPC Smart Guide

Registro compartido de tareas terminadas por el equipo y sus agentes. El agente que modifica archivos debe agregar una entrada en el mismo commit o PR antes de entregar. Una consulta sin cambios no requiere registro.

Usa fechas `YYYY-MM-DD` de `America/Guatemala`. Las entradas nuevas van primero. Conserva las anteriores y, si hay conflicto entre colaboradores, conserva ambas entradas. El estado de integración se comprueba en GitHub; una entrada escrita en una rama no demuestra que ya se haya integrado en `main`.

## Registro

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
