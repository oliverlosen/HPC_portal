# Cómo colaborar en HPC Smart Guide

Cada persona trabaja desde su propia copia local (clon) del repositorio; quien tiene acceso de colaborador no necesita hacer un fork. Las instrucciones compartidas para los agentes están en [AGENTS.md](AGENTS.md); el objetivo y el estado del proyecto están en [PROYECTO.md](PROYECTO.md).

## Una tarea, una rama

Antes de empezar, revisa `main`, los PR abiertos y [ULTIMOS_CAMBIOS.md](ULTIMOS_CAMBIOS.md). Usa una rama distinta por tarea; por ejemplo, `feature/preguntas-aspiradora`, `fix/menu-movil` o `docs/contexto-proyecto`. Continúa una rama existente solo cuando esa sea la tarea acordada.

Coordina quién modifica cada área cuando haya trabajo simultáneo: antes de empezar, avisa qué archivos o recorridos vas a tocar (por ejemplo, con un Issue asignado o un mensaje al equipo). Evita que varias personas editen al mismo tiempo `dist/app.js`, `dist/styles.css` o el mismo bloque de documentación sin compartir sus cambios.

## Flujo de una entrega

1. Actualiza tu copia desde GitHub y lee las guías de la rama de base.
2. Implementa el cambio dentro del alcance acordado.
3. Comprueba lo afectado y regenera la vista portátil si cambian sus fuentes (necesitas Node.js).
4. Agrega una entrada a `ULTIMOS_CAMBIOS.md`; actualiza el contexto o el README cuando corresponda.
5. Crea un commit, súbelo a tu rama y abre un PR hacia `main` con el resumen, validación y pendientes.
6. Cuando se integre un PR, los demás colaboradores deben actualizar su copia antes de continuar.

El responsable del repositorio (`oliverlosen`) revisa cada PR y decide si se integra en `main`; nadie integra sin esa aprobación. No uses force push para reemplazar el trabajo de otro colaborador. Si hay un conflicto en el registro de cambios, conserva ambas entradas.

## Versiones y recuperación

Usamos etiquetas y Releases para conservar entregas revisadas. Sigue [docs/versiones.md](docs/versiones.md) para preparar una versión y volver a una anterior mediante un PR. Una Release no publica el sitio automáticamente. Oliver aprueba la publicación y se conserva el historial compartido.

## Iniciar otro agente

El [README.md](README.md) incluye un mensaje breve que puede copiarse a ChatGPT, Claude u otra herramienta. En un chat que no lee instrucciones del repositorio automáticamente, pide de forma explícita que abra `AGENTS.md`, `PROYECTO.md`, `README.md` y el registro de cambios antes de trabajar.

`CLAUDE.md` importa las instrucciones comunes para Claude Code. Si un agente no tiene acceso al repositorio o a la rama correcta, primero dale ese acceso o los documentos vigentes; no trabajes con una copia antigua de memoria.

## Comprobación adecuada a la tarea

Una modificación de texto necesita revisión de enlaces y coherencia. Una modificación de comportamiento necesita probar el recorrido que cambió; no basta con describirlo. Usa el procedimiento y los comandos de [AGENTS.md](AGENTS.md).

Las fotografías requieren conexión y el almacenamiento del prototipo es local a cada navegador. Al compartir la vista portátil, los datos de una persona no aparecen en la computadora de otra.
