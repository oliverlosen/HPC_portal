# Últimos cambios - HPC Smart Guide

Registro compartido de tareas terminadas por el equipo y sus agentes. El agente que modifica archivos debe agregar una entrada en el mismo commit o PR antes de entregar. Una consulta sin cambios no requiere registro.

Usa fechas `YYYY-MM-DD` de `America/Guatemala`. Las entradas nuevas van primero. Conserva las anteriores y, si hay conflicto entre colaboradores, conserva ambas entradas. El estado de integración se comprueba en GitHub; una entrada escrita en una rama no demuestra que ya se haya integrado en `main`.

## Registro

### 2026-10-13 - Documentación: requisitos, estructura y colaboración

- **Agente/herramienta:** Claude Code (Claude Opus 5.5) · colaborador: tnt101ramirez-ctrl.
- **Rama:** `docs/readme-contributing`.
- **Qué se hizo:** en `README.md`, requisitos para colaborar (Git; Node.js solo para comprobaciones y la copia portátil; Python opcional), estructura completa del repositorio, valores válidos de `categoria` en los enlaces QR/NFC, lista completa de eventos de medición y origen real de las fotografías. En `CONTRIBUTING.md`, se aclara que se trabaja con un clon (sin fork), cómo avisar qué área se va a modificar, que regenerar la copia portátil requiere Node.js y que el responsable del repositorio aprueba la integración de cada PR.
- **Por qué:** la estructura no incluía los archivos agregados después de la primera versión, faltaban los requisitos y las categorías para generar enlaces, y no estaba escrito quién aprueba la integración.
- **Archivos afectados:** `README.md`, `CONTRIBUTING.md`.
- **Comprobaciones:** enlaces relativos de ambos documentos verificados contra los archivos del repositorio; categorías y eventos comparados con `dist/app.js`; estructura comparada con los archivos versionados. Sin cambios de código.
- **Pendientes/límites:** la regla sobre quién aprueba la integración es una propuesta para que Oliver la confirme en la revisión. "Alternativa elegida" describe el comportamiento corregido en el PR #3; en `main`, "Mantener esta" todavía registra ese evento hasta que se integre.

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
