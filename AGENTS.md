# Guía compartida para agentes - HPC Smart Guide

Estas instrucciones son la referencia de trabajo para Codex, ChatGPT, Claude y cualquier otro agente que modifique este repositorio. Aplican a todo el proyecto. La solicitud actual del usuario y las instrucciones de su entorno tienen prioridad; conserva el alcance y las autorizaciones ya acordadas.

## Antes de modificar archivos

1. Lee [PROYECTO.md](PROYECTO.md) para entender el objetivo, el estado real y lo que sigue pendiente.
2. Lee [README.md](README.md) para abrir y ejecutar la versión actual.
3. Revisa las entradas más recientes de [ULTIMOS_CAMBIOS.md](ULTIMOS_CAMBIOS.md) y el historial de la rama en GitHub.
4. Comprueba la rama, su commit de base, el estado de `main` y los cambios locales. No asumas que otro chat, agente o computadora tiene el mismo estado.
5. Identifica los archivos y recorridos afectados por la tarea. Si trabajas en una carpeta con instrucciones más específicas, léelas también.

El código y la documentación versionados son la referencia compartida. No dependas de conversaciones privadas, memoria personal de un modelo ni archivos disponibles únicamente en la computadora de un colaborador. Si falta una decisión necesaria, deja registrada la incertidumbre en lugar de inventarla.

## Trabajo en equipo y GitHub

- Usa una rama por tarea y, cuando corresponda, un checkout o worktree independiente. Nombres sugeridos: `feature/<tema>`, `fix/<tema>` o `docs/<tema>`.
- Inicia desde el estado vigente de la rama de base. Si continúas una tarea existente, respeta su rama y su PR.
- No sobrescribas cambios de otras personas. Si otra persona avanzó la rama mientras trabajabas, trae esos cambios y resuelve las diferencias antes de publicar los tuyos.
- No uses force push ni elimines ramas o historial de otros colaboradores para resolver un conflicto.
- Entrega cambios mediante un PR hacia `main`; no integres ni modifiques directamente la rama principal por defecto. Sigue una autorización explícita vigente si el usuario pide esa integración.
- Subir una rama no significa que ya esté integrada en `main`. Explica el estado real al entregar el trabajo.
- Si una herramienta rechaza una operación, registra qué quedó bloqueado y su motivo. No intentes obtener el mismo efecto por otra vía para evadir la restricción.

## Qué se está construyendo

HPC Smart Guide ayuda al cliente a elegir una herramienta según su proyecto y a conocer el respaldo local de HPC. La prioridad actual es el portal del cliente, con acceso desde QR, NFC o enlace.

Preserva estos contratos salvo que la tarea solicite cambiarlos:

- La entrada principal empieza con la necesidad del cliente, antes de mostrar productos.
- Usa español claro de Guatemala, preguntas breves y una interfaz que funcione en móvil y escritorio.
- Conserva la identidad naranja, negro y blanco descrita en [docs/alcance-cliente.md](docs/alcance-cliente.md).
- Los precios y puntos de venta de la muestra deben identificarse como ejemplos. No inventes inventario, pasillos exactos, precios vigentes, garantías aprobadas ni integraciones que no existen.
- Las reglas de recomendación son de demostración. Si el catálogo no cubre una necesidad, muestra orientación o deriva a asesoría; no recomiendes una herramienta menos adecuada solo por precio.
- “Me lo llevo” y abrir WhatsApp son señales de intención. No las presentes como compras confirmadas ni como mensajes enviados.
- Los registros y facturas actuales son locales al navegador. No afirmes que se envían a HPC, se sincronizan o activan una garantía.
- No subas facturas reales, datos personales de clientes, tokens ni contraseñas al repositorio o al registro de cambios.

## Archivos que debes modificar

| Cambio | Fuente principal |
|---|---|
| Contenido inicial y recursos | `dist/index.html` |
| Diseño y adaptación a móvil | `dist/styles.css` |
| Productos, preguntas y centros de servicio | `dist/data.js` |
| Navegación, recomendaciones, formularios y almacenamiento | `dist/app.js` |
| Generación del HTML portátil | `scripts/export-preview.cjs` |
| Configuración de publicación existente | `.openai/hosting.json` |
| Objetivos, estado e integraciones | `PROYECTO.md` |
| Cómo trabajar como agente | `AGENTS.md` |
| Historial de las modificaciones | `ULTIMOS_CAMBIOS.md` |

`preview/HPC_Cliente_Mockup.html` es un archivo generado. Modifica las fuentes de `dist/` y luego ejecuta `node scripts/export-preview.cjs`; no hagas cambios únicamente en la copia portátil. Conserva el identificador de Site existente y su audiencia al trabajar en publicación.

No añadas un framework, backend, dependencia o servicio solo para resolver una tarea pequeña. Si una solicitud requiere ampliar la arquitectura, documenta la decisión y actualiza el contexto del proyecto.

## Comprobaciones antes de entregar

- Para cambios de JavaScript, ejecuta `node --check dist/app.js` y/o `node --check dist/data.js`, según lo afectado. Si cambian recomendaciones, eventos o controles, ejecuta también `node scripts/check-guide.cjs`.
- Para cambios de frontend, comprueba el recorrido afectado, los controles y una vista móvil. Comprueba la consola y que no haya desbordamiento horizontal. Distingue recursos locales de imágenes externas que no hayas podido cargar.
- Si cambia cualquier fuente incluida en el HTML portátil, regenera `preview/HPC_Cliente_Mockup.html` y comprueba que abre.
- Para cambios solo de documentación, revisa claridad, enlaces y coherencia con el código. No ejecutes toda la batería de interfaz por una corrección de texto.
- No registres como aprobada una prueba que no ejecutaste. Describe las limitaciones y bloqueos concretos.
- GitHub ejecuta automáticamente en cada PR y en `main` la sintaxis, los scripts `scripts/check-*.cjs` y la revisión de que la copia portátil esté al día (`.github/workflows/comprobaciones.yml`). Revisa su resultado en el PR antes de pedir la integración; que pasen no sustituye la revisión en un navegador.

## Registro obligatorio de cambios

**Toda tarea que modifique archivos debe agregar su entrada a `ULTIMOS_CAMBIOS.md` antes de entregar o publicar el commit/PR.** Esto incluye código, diseño, datos de muestra, documentación y configuración. Una consulta sin modificaciones no necesita una entrada.

La entrada debe incluir fecha en `America/Guatemala`, agente o herramienta utilizados, rama, qué se hizo, por qué, archivos afectados, comprobaciones realmente ejecutadas y pendientes o límites. Usa la plantilla del documento. No inventes quién realizó un cambio ni un commit o PR que todavía no exista.

Agrega las entradas nuevas arriba de las anteriores, debajo de “Registro”. Conserva el historial existente. Al resolver conflictos del registro, conserva las entradas de ambos colaboradores. No generes todo el archivo desde cero ni borres el trabajo de otro agente.

Actualiza `PROYECTO.md` si cambia el objetivo, el alcance, la arquitectura, el estado de una integración o una decisión que los demás necesiten conocer. Actualiza `README.md` si cambia cómo abrir o ejecutar el proyecto. Mantén las reglas compartidas en este archivo; `CLAUDE.md` las importa para evitar dos versiones distintas.

## Entrega al usuario

Indica el resultado, qué se modificó, cómo se verificó, los pendientes reales y el enlace a la rama o PR. Confirma que los archivos están subidos antes de afirmarlo. Distingue entre código local, código en una rama, cambios integrados y un sitio efectivamente publicado.

No transfieras una tarea a otro agente por defecto. Si el usuario solicita trabajo paralelo, coordina archivos y ramas para evitar que dos agentes sobrescriban el mismo trabajo.
