# HPC Smart Guide - Portal de cliente

Primera versi�n del frontend para el piloto de asesor�a de HPC, basada en **Fase 2 - Proyecto Final.pdf**. Se enfoca en ayudar a un cliente que llega desde QR, NFC o un enlace a encontrar una herramienta para su proyecto y conocer el respaldo local.

## Abrir el proyecto

No necesita instalar dependencias ni ejecutar una compilaci�n. Sirve la carpeta `dist` con cualquier servidor est�tico. Por ejemplo, desde la ra�z:

```powershell
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Abre `http://127.0.0.1:4173`. El archivo `dist/index.html` tambi�n puede abrirse directamente para revisar la interfaz; algunas funciones de almacenamiento pueden requerir un servidor local.

Para revisar la propuesta sin servidor, abre `preview/HPC_Cliente_Mockup.html`: incluye los estilos y la l�gica en un solo archivo. Se regenera desde las fuentes con `node scripts/export-preview.cjs`.

## Recorridos incluidos

- Inicio con cuatro necesidades, sin mostrar un cat�logo como primer paso.
- Smart Guide: tarea, material o superficie, frecuencia de uso y prioridad.
- Recomendaci�n con modelo, c�digo, foto, caracter�sticas y explicaci�n.
- Comparaci�n de alternativas, aceptaci�n y motivos de rechazo.
- Compartir una recomendaci�n en el selector de WhatsApp; no se env�an mensajes autom�ticamente.
- Pantalla para mostrar el c�digo a un colaborador de tienda.
- Garant�a y respaldo local, enlace a la pol�tica oficial y centros de servicio.
- Registro de compra y factura, consulta del registro y eliminaci�n local.
- Mis herramientas con b�squeda por modelo, nombre o c�digo.
- Men� m�vil, selecci�n de punto de venta, navegaci�n por teclado y ventanas accesibles.

## Alcance de esta versi�n

Es un prototipo de frontend, sin backend, autenticaci�n comercial, inventario ni precios en tiempo real. Los modelos, fotograf�as y c�digos se basan en el cat�logo de HPC. Todos los precios se identifican como **precios de ejemplo**; los puntos de venta son ejemplos y las �reas de ubicaci�n son orientativas. Las recomendaciones usan reglas de demostraci�n y requieren validaci�n de un especialista y de HPC antes de su uso comercial.

Los datos de compra no se env�an a HPC. Los registros y recomendaciones permanecen en `localStorage`; los archivos de factura se guardan en `IndexedDB`. El registro no valida ni activa la garant�a. El usuario acepta expresamente guardar su registro en este dispositivo.

Las im�genes se sirven desde las URLs oficiales de HPC/Truper y requieren conexi�n. Si no cargan, aparece un icono de la categor�a. Las fuentes tienen alternativas locales de sistema.

## Estructura

```text
dist/
  index.html
  styles.css
  data.js          # cat�logo de muestra y puntos de servicio
  app.js           # navegaci�n, reglas, formularios y almacenamiento
  assets/favicon.svg
.openai/hosting.json
docs/alcance-cliente.md
```

## Enlaces de entrada QR/NFC

Ejemplo: `/?tienda=cemaco&categoria=barrenos&origen=qr`. Los identificadores v�lidos de tienda son `cemaco`, `aki` y `ferreteria`. El par�metro `origen` identifica el punto de entrada; no se activa Google Analytics en este prototipo.

La categor�a de entrada se conserva como contexto de medici�n y no sustituye la selecci�n de tarea del cliente.

## Preparaci�n para medici�n

Los eventos de demostraci�n se guardan localmente y se publican como `CustomEvent('hpc:event')`. Incluyen apertura, inicio del recorrido, tiempo hasta recomendaci�n, aceptaci�n, apertura de WhatsApp, solicitud de ayuda, alternativa, rechazo y registro de factura. No se incluye contenido de facturas ni datos personales en estos eventos.

La apertura de WhatsApp y "Me lo llevo" indican intenci�n, no una compra confirmada. La validaci�n de compra necesitar� un flujo posterior con backend y evidencia revisada.

## Fuentes consultadas

- Documento proporcionado: Fase 2 - Proyecto Final.pdf.
- Empresa y cat�logo: https://www.hpcenlinea.com.gt/gt
- Garant�a: https://www.hpcenlinea.com.gt/gt/politicasdegarantia
- Servicio local: https://www.hpcenlinea.com.gt/gt/centrosdeservicio

La segunda etapa del documento contempla b�squeda de cat�logo, kits/combos y ubicaci�n detallada. Esas funciones se dejan para una pr�xima iteraci�n.

