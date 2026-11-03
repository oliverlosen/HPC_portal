# Versiones y Releases

Oliver aprobó adoptar Releases para identificar entregas y facilitar la recuperación. La versión de cada entrega está en `dist/data.js` (`0.2.0` al agregar el portal interno); todavía no se ha publicado una Release. Una Release conserva un punto del código mediante una etiqueta y puede incluir el HTML portátil. Publicarla no despliega el sitio ni recupera registros locales de los clientes.

## Convención del equipo

- Etiquetas `v0.1.0`, `v0.1.1`, etc.; la versión sin `v` debe coincidir con `HPC_DATA.version`.
- Aumentar el último número para correcciones y documentación de una entrega; el segundo para nuevas funciones del prototipo.
- Crear Releases únicamente desde commits de `main` que hayan sido revisados y comprobados. Oliver aprueba su publicación.
- Conservar etiquetas y Releases anteriores. Una corrección o recuperación obtiene una versión nueva; no se mueve una etiqueta ya publicada.
- Cada entrega describe qué cambió, qué se comprobó y qué sigue pendiente; `ULTIMOS_CAMBIOS.md` conserva el detalle del equipo.

## Preparar las primeras dos versiones

| Etiqueta | Commit de referencia | Propósito |
|---|---|---|
| `v0.1.0` | `1e4523bd577a60fe21548507ac537bab953c767e` | Conservar la versión anterior a los PR #3 y #4 |
| `v0.1.1` | `9670324a828d6ec0befd1ffa081ddaa103d53946` (integración del PR #4, después del PR #3) | Identificar la entrega revisada |

En [Releases del repositorio](https://github.com/oliverlosen/HPC_portal/releases), elegir **Draft a new release**, crear la etiqueta y seleccionar el commit indicado como **Target**. Revisar título, notas y archivos antes de publicar. Para `v0.1.0`, seleccionar el SHA de la tabla, no el `main` actual.

Antes de publicar `v0.1.1`, ejecutar:

```bash
node --check dist/app.js
node --check dist/data.js
node scripts/check-guide.cjs
node scripts/export-preview.cjs
```

Comprobar además el recorrido afectado y la vista móvil en un navegador. El script verifica comportamiento con un adaptador mínimo; no comprueba diseño, red ni facturas. Adjuntar `preview/HPC_Cliente_Mockup.html` generado desde ese mismo commit. Las fotos externas requieren conexión. GitHub también ofrece el código fuente de la etiqueta como ZIP o TAR.

### Notas preparadas para v0.1.1

- Explicación del SDS con cable y selección por material: madera/metal con uso diario o prioridad de capacidad muestran ROTI-20A3, sin prometer trabajo industrial continuo.
- "Mantener esta" cierra la comparación sin contar una alternativa; elegir otra sí registra el evento.
- Explicaciones de aspiradora según la limpieza seleccionada, ajuste de la tarjeta de portada en móvil y fotos solicitadas a 828 px.
- README y colaboración actualizados; historial de ambos PR conservado; comprobación de recomendaciones y eventos incorporada.
- Límite de esta revisión: no se repitieron las pruebas visuales ni la carga de fotos o facturas por falta de navegador; se conservan las comprobaciones visuales reportadas por el colaborador. Las reglas requieren validación comercial de HPC.

### Notas preparadas para v0.1.2

La rama `fix/pendientes-revision` se integró en `main` con el [PR #5](https://github.com/oliverlosen/HPC_portal/pull/5). Publicar `v0.1.2` desde ese commit, `e57f2a3547d96c240981ea5b156a3cc54aed803e`:

- La explicación de hidrolavadora habla de "tu carro o moto" y "tu patio o terraza".
- Al volver con Atrás a una recomendación de otro recorrido, la guía ya no mezcla las respuestas.
- Cada registro de compra tiene su propia tarjeta en Mis herramientas, aunque sea del mismo producto.
- La fecha máxima de compra usa la fecha del dispositivo, no la hora UTC.

### Notas preparadas para v0.2.0

Si se integra la rama `feature/portal-interno`, publicar `v0.2.0` desde el commit de `main` que la contenga. Antes, ejecutar también `node scripts/check-portal-interno.cjs`.

- Prototipo de portal interno en `prototipos/portal-interno.html`, con modo colaborador y modo mayorista:
  - consulta por código o las preguntas de la guía para el cliente sin celular;
  - resultado de la atención, productos por agotarse y solicitudes de reposición;
  - servicio y garantía, y QR para anaquel;
  - pedidos con precios por volumen y pedido sugerido;
  - métricas de ejemplo.
- Copia de los datos del portal en un archivo, para mostrarlo en dos computadoras sin servidor.
- `scripts/check-portal-interno.cjs` comprueba que el portal use los mismos productos, reglas y textos que la guía.
- La guía de clientes no cambia, salvo el número de versión.
- Límites: datos y códigos de acceso de demostración; el portal no se publica con el sitio. Se puede adjuntar `prototipos/portal-interno.html` a la Release, junto con la copia portátil.

### Notas preparadas para v0.2.1

Si se integra la rama `fix/accesibilidad-guia` después del PR #6, publicar `v0.2.1` desde el commit de `main` que la contenga:

- Al tocar «Continuar» o «Anterior», el foco pasa a la nueva pregunta; al cambiar de página, a su título principal.
- Títulos en orden en las preguntas, la recomendación, ayuda y Mis herramientas; la barra de progreso queda como decoración.
- Los textos grises o claros tienen al menos 4.5:1 de contraste, sin cambiar el diseño.
- Pendiente: el naranja de la marca en textos y botones, según la opción que elija Oliver.

### Notas preparadas para v0.3.0

Si se integra la rama `feature/codigo-atencion` después del PR #8, publicar `v0.3.0` desde el commit de `main` que la contenga:

- Código de atención: la guía lo muestra en «Muéstrale esta pantalla» y en la pantalla sin opción en la muestra. Resume las cuatro respuestas del cliente, por ejemplo `P412L`, sin datos personales.
- En «Atender cliente» del portal interno, el colaborador lo escribe y ve las respuestas, la recomendación de la guía, su explicación y las otras opciones adecuadas. Una letra de control rechaza un carácter mal escrito o dos caracteres vecinos intercambiados.
- Las atenciones registradas con el código se cuentan aparte en las métricas del colaborador.
- Límites: el código no se envía ni se guarda en un servidor; el colaborador lo escribe a mano. Las reglas siguen siendo de demostración.

### Notas preparadas para v0.3.1

Si se integra la rama `fix/naranja-contraste-guia`, publicar `v0.3.1` desde el commit de `main` que la contenga:

- La guía usa `#C2410C`, un naranja más oscuro, en textos, botones con texto y el contorno de foco. El naranja de la marca `#FC641B` se conserva en el logo, los íconos, los bordes y la barra de progreso.
- Los textos de la guía cumplen el contraste mínimo de 4.5:1. Solo quedan los números decorativos de las tarjetas, ocultos para los lectores de pantalla.
- El portal interno solo cambia su número de versión.

### Notas preparadas para v0.3.2

Si se integra la rama `fix/informacion-oficial-hpc`, publicar `v0.3.2` desde el commit de `main` que la contenga:

- Centros de servicio según la página oficial de HPC del 2026-11-03: la central en la 6a Avenida 8-25, zona 4, con su propio horario, y once centros en los departamentos. Retalhuleu ya no aparece.
- Los enlaces a la política de garantía y a los centros apuntan a `hpc.com.gt`; los anteriores daban error 404.
- La página de garantía aclara que HPC no pide factura, qué no cubre la garantía y qué ofrece cuando no aplica.
- El portal interno muestra los mismos centros, enlaces y textos.

### Notas preparadas para v0.4.0

Si se integra la rama `feature/modo-oscuro` después de `v0.3.2`, publicar `v0.4.0` desde el commit de `main` que la contenga:

- Modo oscuro en la guía de clientes. «Automático» sigue el modo del teléfono; en el menú, «Aspecto» permite elegir Claro u Oscuro, y la elección se guarda en el navegador.
- En oscuro, los botones usan el naranja de la marca con texto negro, y las fotos de producto quedan sobre fondo claro. Los textos cumplen el contraste mínimo de 4.5:1.
- En el modo claro, cuatro textos que no lo cumplían ahora sí lo cumplen, y el formulario de registro ya no muestra una imagen vacía.
- En iPhone y Android, la letra más pequeña sube a 10 u 11 px, el buscador de Mis herramientas ocupa todo el ancho y los enlaces pequeños se tocan con más facilidad. Es solo CSS, sin código de app nativa.
- El portal interno solo cambia su número de versión.

## Recuperarse si aparece un error

Para consultar una versión anterior sin tocar `main`, descargar sus archivos desde Releases o usar `git switch --detach v0.1.0` en una copia limpia.

Para corregir `main`, crear una rama desde su estado vigente, identificar el PR causante y revertir sus cambios mediante un nuevo commit y PR. Si fue integrado con un merge, revisar sus padres y usar `git revert -m 1 <SHA-del-merge>` únicamente cuando el primer padre corresponda a `main`. Conservar las entradas históricas de `ULTIMOS_CAMBIOS.md`, resolver los conflictos y añadir la explicación de recuperación. Comprobar el resultado, regenerar la vista portátil y publicar una nueva versión, por ejemplo `v0.1.2`. No hacer reset ni force push sobre `main`.

Si hubiera un sitio desplegado, volver a publicar el código de la versión elegida en ese entorno es un paso separado. La publicación compartida de este proyecto sigue pendiente de verificación.

Referencias oficiales consultadas el 2026-10-13: [Releases de GitHub](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases), [crear una Release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository) y [git revert](https://git-scm.com/docs/git-revert).
