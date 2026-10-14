# HPC Smart Guide - Contexto compartido del proyecto

Última actualización de este contexto: 2026-10-13. Los avances posteriores deben registrarse en [ULTIMOS_CAMBIOS.md](ULTIMOS_CAMBIOS.md); si alteran el estado descrito aquí, actualiza también este documento.

## Qué problema queremos resolver

HPC distribuye herramientas y productos para distintos proyectos en Guatemala. Un cliente en CEMACO, AKÍ o una ferretería puede necesitar ayuda para elegir, no encontrar un producto exhibido o desconocer la garantía y el servicio local. La propuesta es acompañarlo desde su necesidad hasta una opción comprensible, sin exigir conocimientos técnicos.

La plataforma se llama **HPC Smart Guide**. Busca transformar la búsqueda de una herramienta en una solución para el proyecto del cliente, y hacer visible el respaldo local de HPC.

## Quién usa la plataforma

- **Cliente:** escanea un QR, acerca su teléfono a una etiqueta NFC o abre un enlace; recibe asesoría y consulta el respaldo.
- **Colaborador de tienda:** puede ver el código y modelo en la pantalla del cliente para ayudar a ubicarlo. Todavía no tiene un portal propio.
- **Equipo de HPC:** necesitará mantener catálogo, reglas, tiendas y resultados del piloto. Ese portal administrativo está pendiente.
- **Equipo del proyecto:** trabaja desde GitHub con distintos agentes y herramientas; comparte contexto mediante los documentos de este repositorio.

## Recorrido principal del cliente

1. Accede a la guía sin descargar una aplicación.
2. Elige qué necesita hacer: perforar/fijar, lavar con presión, aspirar/limpiar o cambiar un grifo.
3. Responde preguntas sobre material o superficie, frecuencia de uso y prioridad.
4. Recibe una recomendación con imagen, modelo, código, características y explicación.
5. Puede comparar una alternativa, guardar su elección, abrir el selector de WhatsApp o mostrar el código a un colaborador.
6. Consulta garantía y servicio local; después de comprar, puede conservar los datos y la factura en la demostración.

La guía empieza con la necesidad. No es una tienda de comercio electrónico ni registra ventas verificadas en su estado actual.

## Estado real de la implementación

| Componente | Estado al actualizar este documento |
|---|---|
| Frontend del cliente | Prototipo interactivo en `dist/`; primera versión [PR #1](https://github.com/oliverlosen/HPC_portal/pull/1) y correcciones con recomendación por material [PR #3](https://github.com/oliverlosen/HPC_portal/pull/3), integrados en `main` |
| Vista portátil | `preview/HPC_Cliente_Mockup.html`, generada desde las mismas fuentes |
| Versiones y Releases | Frontend preparado como `0.1.1`; política en [docs/versiones.md](docs/versiones.md); primeras etiquetas y Releases pendientes de publicación |
| Preguntas y recomendación | Reglas de demostración en JavaScript, pendientes de validar con especialistas de HPC |
| Productos y fotografías | Muestra basada en el catálogo HPC/Truper; las fotografías requieren conexión externa |
| Precios | Valores de ejemplo identificados en pantalla |
| Tiendas e inventario | Puntos de venta de ejemplo; sin inventario ni pasillos exactos conectados |
| Garantía y servicio | Resumen y enlaces oficiales; la cobertura la confirma HPC |
| Recomendaciones y registros | `localStorage` en el navegador; no se comparten entre computadoras |
| Facturas | Archivos locales en `IndexedDB`, con consentimiento; no se envían a HPC |
| WhatsApp | Abre el selector para que la persona decida a quién compartir; no envía automáticamente |
| Medición | Eventos locales y `CustomEvent('hpc:event')`; sin Google Analytics configurado |
| Autenticación y backend | Pendientes |
| Portal administrativo | Pendiente |
| Publicación web compartida | No verificada ni terminada; la carga de fuente a Sites quedó bloqueada por restricciones de red del entorno inicial |

Estos estados describen lo existente; no son una lista de tareas autorizadas para implementar en cada sesión. Trabaja en el alcance de la solicitud actual.

## Piloto y evolución

La propuesta académica plantea comenzar con un piloto limitado en tiendas CEMACO, AKÍ y ferreterías, con énfasis en recomendación, garantía y compartir la elección. El prototipo permite explorar los cuatro grupos de necesidades incluidos.

El documento propone evaluar el uso, el tiempo hasta la recomendación, su aceptación, solicitudes de ayuda, motivos de rechazo y compras respaldadas con evidencia. La interfaz actual recoge señales locales de demostración; todavía no produce una evaluación comercial real. Aceptar una recomendación o abrir WhatsApp no prueba que hubo una compra.

Para una etapa posterior se contemplan búsqueda directa, kits/combinaciones para proyectos y ubicación más detallada cuando las tiendas proporcionen información.

## Criterios de producto

- Texto claro en español de Guatemala y uso cómodo en teléfono, que será el punto de entrada del QR/NFC.
- Naranja `#FC641B`, negro `#191C1D`, blanco y grises claros; títulos Manrope e interfaz DM Sans, con fuentes de sistema como alternativa.
- Orientación útil antes de solicitar datos de contacto; no introducir barreras innecesarias para obtener la recomendación.
- Diferenciar información oficial, ejemplos y datos pendientes de integración.
- Mantener garantía y servicio local visibles sin prometer cobertura aprobada.
- Derivar a asesoría si una necesidad queda fuera de la muestra. En concreto se prioriza el equipo SDS Plus incluido; la grifería de la muestra cubre lavamanos de baño y no se extiende automáticamente a cocina o ducha.
- Para madera y metal, comparar los taladros/destornilladores de la muestra, sin elegir el SDS solo por potencia. Para uso diario o prioridad de mayor capacidad, mostrar ROTI-20A3 con dos baterías; para presupuesto y uso ocasional o regular, ROTI-20A2 con una batería. Son variantes de la misma familia: las baterías adicionales permiten alternarlas, no aumentan el diámetro de perforación. Indicar modo taladro sin percusión y derivar a HPC para confirmar diámetro, profundidad y trabajo intenso o continuo. Esta orientación de demostración no acredita capacidad para trabajo industrial continuo.

Esta decisión se apoya en la [ficha de ROTI-20A3](https://www.truper.com/ficha_tecnica_pdf/views/ficha-print.php?id=261856) y el [manual de ROTI-20A3/20A2/20AS](https://www.truper.com/admin/descargables/manual/103246-103247-103248-02%20ROTOMARTILLO%20ESP-ING.pdf), consultados el 2026-10-13. El [SDS ROEL-50N2](https://www.truper.com/ficha_tecnica_pdf/views/ficha-print.php?id=79843) también admite madera y metal según Truper; se excluye de la selección automática para esos materiales como criterio de la guía, no por incompatibilidad absoluta.

## Arquitectura actual y fuentes de edición

Sitio estático con HTML, CSS y JavaScript del navegador. No necesita instalar dependencias de aplicación ni ejecutar una compilación. La única generación adicional es la copia portátil.

| Archivo o carpeta | Responsabilidad |
|---|---|
| `dist/index.html` | Documento base y carga de recursos |
| `dist/styles.css` | Diseño, estilos y vistas adaptables |
| `dist/data.js` | Categorías, preguntas, catálogo de muestra y centros |
| `dist/app.js` | Rutas, reglas, interacción, eventos y registros locales |
| `scripts/export-preview.cjs` | Ensamblar el mockup portátil |
| `preview/` | Copia portátil generada; editar las fuentes, no esta copia |
| `.openai/hosting.json` | Identidad y configuración existentes de Sites |
| `docs/alcance-cliente.md` | Alcance detallado del frontend |

## Próximas decisiones e integraciones

1. Validar preguntas, catálogo, criterios y compatibilidades con HPC.
2. Definir una fuente autorizada de precios, disponibilidad y datos por tienda.
3. Elegir el entorno de publicación y la forma de acceso de los usuarios.
4. Diseñar backend, almacenamiento de facturas, consentimiento y acceso a los registros.
5. Configurar medición del piloto, diferenciando intención, evidencia recibida y compra confirmada.
6. Diseñar el portal administrativo y sus permisos.
7. Priorizar búsqueda, kits y ubicación detallada después del piloto.

No se han elegido todavía proveedores para el backend o una autenticación comercial. No los presentes como decisiones tomadas.

## Cómo conservar una sola versión del contexto

Trabaja con [AGENTS.md](AGENTS.md), actualiza [ULTIMOS_CAMBIOS.md](ULTIMOS_CAMBIOS.md) al modificar archivos y usa ramas/PR para compartir los cambios. Una conversación con un agente no actualiza por sí misma el contexto de los demás.

## Fuentes del proyecto

- Documento proporcionado por el equipo: **Fase 2 - Proyecto Final.pdf**. Su contenido relevante está resumido aquí; el PDF original no está incluido en el repositorio.
- [Empresa y catálogo HPC](https://www.hpcenlinea.com.gt/gt).
- [Política de garantía](https://www.hpcenlinea.com.gt/gt/politicasdegarantia).
- [Centros de servicio](https://www.hpcenlinea.com.gt/gt/centrosdeservicio).

Consulta las fuentes oficiales antes de cambiar afirmaciones sobre productos, garantía, precios o servicio. Añade la referencia y la fecha cuando incorpores información nueva.
