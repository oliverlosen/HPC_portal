# Últimos cambios - HPC Smart Guide

Registro compartido de tareas terminadas por el equipo y sus agentes. El agente que modifica archivos debe agregar una entrada en el mismo commit o PR antes de entregar. Una consulta sin cambios no requiere registro.

Usa fechas `YYYY-MM-DD` de `America/Guatemala`. Las entradas nuevas van primero. Conserva las anteriores y, si hay conflicto entre colaboradores, conserva ambas entradas. El estado de integración se comprueba en GitHub; una entrada escrita en una rama no demuestra que ya se haya integrado en `main`.

## Registro

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
