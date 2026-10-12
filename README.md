# HPC Smart Guide — Portal de cliente

Primera versión del frontend para el piloto de asesoría de HPC, basada en **Fase 2 - Proyecto Final.pdf**. Se enfoca en ayudar a un cliente que llega desde QR, NFC o un enlace a encontrar una herramienta para su proyecto y conocer el respaldo local.

## Abrir el proyecto

No necesita instalar dependencias ni ejecutar una compilación. Sirve la carpeta `dist` con cualquier servidor estático. Por ejemplo, desde la raíz:

```powershell
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Abre `http://127.0.0.1:4173`. El archivo `dist/index.html` también puede abrirse directamente para revisar la interfaz; algunas funciones de almacenamiento pueden requerir un servidor local.

Para revisar la propuesta sin servidor, abre `preview/HPC_Cliente_Mockup.html`: incluye los estilos y la lógica en un solo archivo. Se regenera desde las fuentes con `node scripts/export-preview.cjs`.

## Recorridos incluidos

- Inicio con cuatro necesidades, sin mostrar un catálogo como primer paso.
- Smart Guide: tarea, material o superficie, frecuencia de uso y prioridad.
- Recomendación con modelo, código, foto, características y explicación.
- Comparación de alternativas, aceptación y motivos de rechazo.
- Compartir una recomendación en el selector de WhatsApp; no se envían mensajes automáticamente.
- Pantalla para mostrar el código a un colaborador de tienda.
- Garantía y respaldo local, enlace a la política oficial y centros de servicio.
- Registro de compra y factura, consulta del registro y eliminación local.
- Mis herramientas con búsqueda por modelo, nombre o código.
- Menú móvil, selección de punto de venta, navegación por teclado y ventanas accesibles.

## Alcance de esta versión

Es un prototipo de frontend, sin backend, autenticación comercial, inventario ni precios en tiempo real. Los modelos, fotografías y códigos se basan en el catálogo de HPC. Todos los precios se identifican como **precios de ejemplo**; los puntos de venta son ejemplos y las áreas de ubicación son orientativas. Las recomendaciones usan reglas de demostración y requieren validación de un especialista y de HPC antes de su uso comercial.

Los datos de compra no se envían a HPC. Los registros y recomendaciones permanecen en `localStorage`; los archivos de factura se guardan en `IndexedDB`. El registro no valida ni activa la garantía. El usuario acepta expresamente guardar su registro en este dispositivo.

Las imágenes se sirven desde las URLs oficiales de HPC/Truper y requieren conexión. Si no cargan, aparece un icono de la categoría. Las fuentes tienen alternativas locales de sistema.

## Estructura

```text
dist/
  index.html
  styles.css
  data.js          # catálogo de muestra y puntos de servicio
  app.js           # navegación, reglas, formularios y almacenamiento
  assets/favicon.svg
.openai/hosting.json
docs/alcance-cliente.md
```

## Enlaces de entrada QR/NFC

Ejemplo: `/?tienda=cemaco&categoria=barrenos&origen=qr`. Los identificadores válidos de tienda son `cemaco`, `aki` y `ferreteria`. El parámetro `origen` identifica el punto de entrada; no se activa Google Analytics en este prototipo.

La categoría de entrada se conserva como contexto de medición y no sustituye la selección de tarea del cliente.

## Preparación para medición

Los eventos de demostración se guardan localmente y se publican como `CustomEvent('hpc:event')`. Incluyen apertura, inicio del recorrido, tiempo hasta recomendación, aceptación, apertura de WhatsApp, solicitud de ayuda, alternativa, rechazo y registro de factura. No se incluye contenido de facturas ni datos personales en estos eventos.

La apertura de WhatsApp y “Me lo llevo” indican intención, no una compra confirmada. La validación de compra necesitará un flujo posterior con backend y evidencia revisada.

## Fuentes consultadas

- Documento proporcionado: Fase 2 - Proyecto Final.pdf.
- Empresa y catálogo: https://www.hpcenlinea.com.gt/gt
- Garantía: https://www.hpcenlinea.com.gt/gt/politicasdegarantia
- Servicio local: https://www.hpcenlinea.com.gt/gt/centrosdeservicio

La segunda etapa del documento contempla búsqueda de catálogo, kits/combos y ubicación detallada. Esas funciones se dejan para una próxima iteración.
