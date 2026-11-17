# Alcance del frontend de cliente — versión 0.1

## Objetivo

Convertir una duda en el anaquel en una recomendación comprensible, con respaldo local visible. La primera pantalla pregunta por la necesidad del cliente, siguiendo el piloto descrito en el documento del proyecto.

## Dirección visual

Naranja `#FC641B` de la marca para el logo, los íconos, los bordes y los detalles de Smart Guide; `#C2410C`, un naranja más oscuro, para textos, botones con texto y el contorno de foco; negro `#191C1D` para títulos y bloques de énfasis; blanco y gris muy claro para lectura y superficies. Tipografía Manrope para títulos y DM Sans para interfaz, con fallback a sans-serif. Diseño adaptable desde 360 px y navegación lateral en escritorio. El texto debe tener un contraste de al menos 4.5:1 con su fondo (3:1 si es grande), como pide WCAG 2.1 AA; el naranja de la marca sobre fondos claros no lo alcanza en texto pequeño, por eso los textos usan `#C2410C`. En modo oscuro (automático según el teléfono, o elegido en el menú), el fondo es casi negro `#121516`, los botones usan `#FC641B` con texto negro, los textos naranjas `#FF8A4C` y las fotos de producto se mantienen sobre fondo claro.

## Pantallas

| Pantalla | Propósito | Estado |
|---|---|---|
| Inicio | Tarea y acceso al respaldo | Frontend interactivo |
| Smart Guide | Cuatro preguntas breves | Reglas de ejemplo |
| Recomendación | Producto, explicación y siguiente paso | Catálogo real con precio de ejemplo |
| Alternativa | Comparar dos opciones | Según productos incluidos en la muestra |
| Colaborador | Mostrar el código de producto y el código de atención (las cuatro respuestas, sin datos personales) | Sin integración con inventario; el colaborador escribe el código en el portal interno (prototipo) |
| Garantía | Condiciones y respaldo local | Enlaces a información oficial |
| Registro de compra | Guardar datos y factura | Solo en el navegador, con consentimiento |
| Mis herramientas | Consultar recomendaciones y compras | Almacenamiento local |
| Ayuda | Contacto y centros de servicio | Información publicada por HPC |

## Presentación unificada y consulta por texto — 0.6.0

El cliente forma parte de `HPC_Portal_Unificado.html`, junto con los modos de colaborador y mayorista. La presentación incorpora fotografías y fuentes y abre directamente sin servidor. El campo de Smart Guide permite describir el proyecto o consultar un modelo, garantía, centros de servicio, registros o herramientas guardadas. Muestra una interpretación editable y pregunta lo que falta; las cuatro preguntas tradicionales siguen disponibles. La base local contiene 250 frases representativas y reglas compartidas con el colaborador. No se envían ni se guardan las consultas.

No se añaden productos ni se modifica la selección por material. Una búsqueda directa de modelo es una ficha y no una recomendación personalizada. Las necesidades ambiguas o no cubiertas requieren una aclaración u orientación. El aspecto conserva marca e imágenes, con ajustes de legibilidad y espacio.

## Límites de las reglas

La selección de concreto prioriza el único equipo SDS Plus incluido en esa categoría. No ofrece una alternativa menos adecuada por precio. Cuando el cliente solicita cocina, ducha u otra instalación que no cubre la muestra, la guía deriva a asesoría y no inventa una recomendación. Antes de producción se requiere validar necesidades, capacidades y compatibilidades con un especialista.

## Próximas integraciones

1. Catálogo y recomendaciones aprobados por HPC.
2. Precios de tienda o precio sugerido autorizado; fuente y fecha visibles.
3. Inventario y áreas de tienda cuando el distribuidor proporcione datos.
4. Backend de registros, almacenamiento de facturas, consentimiento y acceso de cliente.
5. Medición con tienda/categoría/punto de acceso e instrumentación de las métricas del piloto.
6. Portal administrativo para mantener productos, preguntas, tiendas y políticas.
7. Segunda etapa: búsqueda, kits y ubicación detallada.

## Interpretación de resultados

La aceptación y la apertura del selector de WhatsApp son señales de intención. No se reportan como ventas. Las facturas de la demostración no se validan ni se envían a HPC. El indicador comercial final debe distinguir intención, evidencia recibida y compra confirmada.
