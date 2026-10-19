# Versiones y Releases

Oliver aprobó adoptar Releases para identificar entregas y facilitar la recuperación. El frontend preparado en los PR #3 y #4 usa `0.1.1` en `dist/data.js`; todavía no se ha publicado una Release. Una Release conserva un punto del código mediante una etiqueta y puede incluir el HTML portátil. Publicarla no despliega el sitio ni recupera registros locales de los clientes.

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
| `v0.1.1` | El commit de `main` después de integrar ambos PR | Identificar la entrega revisada; copiar su SHA exacto desde GitHub |

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

Si se integra la rama `fix/pendientes-revision`, publicar `v0.1.2` desde el commit de `main` que la contenga:

- La explicación de hidrolavadora habla de "tu carro o moto" y "tu patio o terraza".
- Al volver con Atrás a una recomendación de otro recorrido, la guía ya no mezcla las respuestas.
- Cada registro de compra tiene su propia tarjeta en Mis herramientas, aunque sea del mismo producto.
- La fecha máxima de compra usa la fecha del dispositivo, no la hora UTC.

## Recuperarse si aparece un error

Para consultar una versión anterior sin tocar `main`, descargar sus archivos desde Releases o usar `git switch --detach v0.1.0` en una copia limpia.

Para corregir `main`, crear una rama desde su estado vigente, identificar el PR causante y revertir sus cambios mediante un nuevo commit y PR. Si fue integrado con un merge, revisar sus padres y usar `git revert -m 1 <SHA-del-merge>` únicamente cuando el primer padre corresponda a `main`. Conservar las entradas históricas de `ULTIMOS_CAMBIOS.md`, resolver los conflictos y añadir la explicación de recuperación. Comprobar el resultado, regenerar la vista portátil y publicar una nueva versión, por ejemplo `v0.1.2`. No hacer reset ni force push sobre `main`.

Si hubiera un sitio desplegado, volver a publicar el código de la versión elegida en ese entorno es un paso separado. La publicación compartida de este proyecto sigue pendiente de verificación.

Referencias oficiales consultadas el 2026-10-13: [Releases de GitHub](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases), [crear una Release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository) y [git revert](https://git-scm.com/docs/git-revert).
