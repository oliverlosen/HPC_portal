# Alcance del frontend de cliente — versión 0.1

## Objetivo

Convertir una duda en el anaquel en una recomendación comprensible, con respaldo local visible. La primera pantalla pregunta por la necesidad del cliente, siguiendo el piloto descrito en el documento del proyecto.

## Dirección visual

Naranja `#FC641B` para acciones principales y Smart Guide; negro `#191C1D` para títulos y bloques de énfasis; blanco y gris muy claro para lectura y superficies. Tipografía Manrope para títulos y DM Sans para interfaz, con fallback a sans-serif. Diseño adaptable desde 360 px y navegación lateral en escritorio. El texto debe tener un contraste de al menos 4.5:1 con su fondo (3:1 si es grande), como pide WCAG 2.1 AA; el naranja de la marca sobre fondos claros no lo alcanza en texto pequeño.

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
