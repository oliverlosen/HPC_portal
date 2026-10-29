# Medición del piloto: opciones para decidir

Comparación preparada el 2026-10-29 para que Oliver elija cómo reunir los datos del piloto. Es solo un documento: no se creó ninguna cuenta, no se agregó código de medición y la guía no se publicó.

## Qué falta hoy

La guía de clientes ya registra los eventos que necesita el piloto, pero los guarda solo en el navegador de cada cliente: `localStorage`, clave `hpc-demo-events`, hasta 200 eventos. Para evaluar el piloto hay que reunirlos en un solo lugar.

La guía también anuncia cada evento dentro de la página con `CustomEvent('hpc:event')`. Por eso, para enviarlos a un servicio no hace falta cambiar los recorridos.

## Lo que la guía ya registra

Cada evento lleva su nombre, la hora, la tienda y la categoría (la necesidad del cliente). Ninguno lleva nombre, teléfono, correo ni el archivo de una factura.

| Evento | Datos extra | Para qué sirve en el piloto |
|---|---|---|
| `guide_opened` | `origin`: el valor de `origen` del enlace (por ejemplo, `qr`), o `direct` | Uso por tienda y por punto de entrada |
| `guide_started` | — | Cuántos empiezan la guía |
| `recommendation_shown` | `productCode`, `elapsedSeconds` | Tiempo hasta la recomendación |
| `recommendation_accepted` | `productCode`, `action` («Me lo llevo») | Aceptación: es intención, no una compra |
| `recommendation_rejected` | `productCode`, `reasonCode` (motivo elegido) | Motivos de rechazo |
| `alternative_selected` | `productCode` | Cuándo eligen otra opción |
| `colleague_help_requested` | `productCode` | Solicitudes de ayuda a un colaborador |
| `whatsapp_share_opened` | `productCode` | Compartir por WhatsApp: es intención, no un mensaje enviado |
| `recommendation_saved` | `productCode` | Recomendaciones guardadas |
| `purchase_receipt_saved` | `productCode`, `hasReceipt` (sí o no) | Registro de compra, con o sin factura; el archivo nunca se envía |

## Opciones

| Opción | Costo | Capacidad para el piloto | Cookies | Dónde quedan los datos | Esfuerzo |
|---|---|---|---|---|---|
| **Umami Cloud** (plan Hobby) | US$0 al mes | 100 000 eventos al mes, 1 sitio y 6 meses de historial. Cada dato extra de un evento cuenta como otro evento: un recorrido usaría unos 12 a 15, así que alcanza para unos 6 000 a 8 000 recorridos al mes | No usa; no guarda datos personales | Panel de Umami | Bajo |
| **Plausible** (Starter) | US$9 al mes, con prueba gratis de 30 días | 10 000 vistas al mes, y los eventos cuentan en ese límite: unos 1 600 recorridos al mes | No usa; no necesita aviso de cookies | Panel de Plausible | Bajo |
| **GoatCounter** | Gratis para «uso razonable» | No publica un límite exacto. Los eventos son solo conteos por nombre: el tiempo hasta la recomendación habría que agruparlo en tramos | No usa | Panel de GoatCounter | Bajo |
| **Google Analytics 4** | Gratis (versión estándar) | Sobra para el piloto | Usa `_ga` y `_ga_<id>`, con 2 años de duración por defecto: conviene pedir consentimiento | Google | Medio: configurar eventos y reportes |
| **PostHog** | Gratis hasta 1 000 000 de eventos al mes | Sobra para el piloto | Por defecto guarda datos en el navegador (cookie y almacenamiento local); se puede configurar para no hacerlo | PostHog | Medio a alto: trae más de lo necesario |
| **Hoja de cálculo propia** (Google Sheets con Apps Script) | Gratis con una cuenta de Google | Suficiente para un piloto pequeño, dentro de los límites de Apps Script (por ejemplo, 30 ejecuciones simultáneas por usuario) | No usa | Una hoja de HPC o de Oliver, con todos los datos | Medio: hay que escribir y mantener el script, y cualquiera con la dirección podría enviar datos falsos |

Un recorrido es un cliente que abre la guía, la contesta y recibe su recomendación: unos 5 o 6 eventos. Las cifras de capacidad son estimaciones con esa suposición.

## Recomendación

**Umami Cloud, plan gratis.**
- No usa cookies ni guarda datos personales.
- Acepta los detalles de cada evento: motivo, segundos y tienda.
- Alcanza para un piloto de tres tiendas si se envían solo los datos de la tabla.
- Sus 6 meses de historial bastan para el piloto. Antes de que venzan, se exportan los datos para el informe.

**Alternativas:**
- La hoja de cálculo propia, si HPC quiere tener los datos completos en una cuenta suya.
- Google Analytics 4, si HPC ya lo usa y prefiere tener todo junto, con aviso de cookies.

## Qué se necesita para avanzar

- Que Oliver elija la opción.
- Crear la cuenta con un correo de HPC o de Oliver, para que no quede a nombre de un colaborador.
- Aprobar el texto que verá el cliente sobre qué se mide y para qué.
- Tener en cuenta que la medición solo funciona cuando la guía esté publicada. La publicación sigue pendiente.

## Cómo se conectaría, cuando se decida

Un adaptador pequeño escucharía `hpc:event` y reenviaría cada evento al servicio elegido, solo con los datos de la tabla. No cambiaría los recorridos ni enviaría datos personales. Se haría en su propia rama y PR, con pruebas, como pide [AGENTS.md](../AGENTS.md).

## Fuentes

Consultadas el 2026-10-29. Los precios y límites pueden cambiar: conviene confirmarlos al decidir.

- Umami: [precios](https://umami.is/pricing), [preguntas frecuentes de Umami Cloud](https://docs.umami.is/docs/cloud/faq) y [página principal](https://umami.is/) (sin cookies ni datos personales).
- Plausible: [precios](https://plausible.io/#pricing).
- GoatCounter: [página principal](https://www.goatcounter.com/) y [eventos](https://www.goatcounter.com/help/events).
- Google Analytics: [producto](https://marketingplatform.google.com/about/analytics/) y [cookies](https://support.google.com/analytics/answer/11397207).
- PostHog: [precios](https://posthog.com/docs/product-analytics/pricing) y [persistencia](https://posthog.com/docs/libraries/js/persistence).
- Apps Script: [cuotas](https://developers.google.com/apps-script/guides/services/quotas).
