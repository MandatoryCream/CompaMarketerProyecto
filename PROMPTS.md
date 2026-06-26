# Registro de Prompts de IA

> Este archivo documenta los prompts de Inteligencia Artificial utilizados durante el desarrollo de CompaMarketer para la evaluación de Front-End React.

---

## Prompt 1 — Análisis inicial del proyecto

**Solicitud:**
"Hemos clonado un proyecto React desde GitHub. Necesito que analices el proyecto completo contra los siguientes requisitos de evaluación: (lista de requisitos). Identifica qué falta y qué está presente."

**Contexto:**
Se proporcionó el proyecto CompaMarketer (comparador de precios de supermercados) con 11 componentes, datos estáticos en JSON, animaciones con Framer Motion y gráficos con Recharts.

**Uso:**
Se utilizó para generar un diagnóstico detallado que reveló que el proyecto carecía de CRUD, localStorage, fetch/axios, Bootstrap 5, colores magenta/amarillo, validación de inputs, manejo de errores y PROMPTS.md.

---

## Prompt 2 — Diseño del plan de corrección

**Solicitud:**
"Con base en el diagnóstico, crea un plan de trabajo detallado que agregue: (1) operaciones CRUD completas con localStorage, (2) consumo de API simulado con axios + try/catch, (3) Bootstrap 5 para layout y componentes, (4) esquema de colores magenta (#D81B60) y amarillo (#FFC107), (5) validación y sanitización de inputs, (6) manejo de errores con feedback al usuario, (7) documentación PROMPTS.md."

**Contexto:**
Se solicitó mantener la idea original de la aplicación (comparador de precios) y solo agregar las funcionalidades faltantes.

**Uso:**
Se generó el plan estructurado en 8 fases que sirvió como guía para la implementación.

---

## Prompt 3 — Implementación del servicio de datos (dataService.js)

**Solicitud:**
"Crea un servicio de datos en JavaScript que: (a) use localStorage como persistencia principal, (b) intente hacer llamadas axios a una API REST simulada, (c) en caso de fallo use localStorage con latencia simulada, (d) implemente CRUD completo (getAll, getById, create, update, delete), (e) valide integridad de datos al guardar, (f) sanitice strings (trim, escape < >), (g) siembra datos iniciales desde un JSON si localStorage está vacío."

**Contexto:**
Se necesitaba reemplazar la importación estática de JSON con una capa de servicio que demostrara consumo de API y uso de localStorage.

**Uso:**
Se generó `src/services/dataService.js` con funciones async, try/catch, validación, sanitización y seed de datos.

---

## Prompt 4 — Creación del formulario CRUD (ProductForm.js)

**Solicitud:**
"Crea un componente de formulario modal en React para crear/editar productos de supermercado con: (a) campos: nombre, categoría (select), imagen (emoji), precios por 5 supermercados, links, indicador de oferta y precio anterior, (b) validación de campos requeridos y tipos, (c) sanitización de strings, (d) feedback visual de errores, (e) integración con Bootstrap 5 para el modal y form controls, (f) estado de carga al guardar."

**Contexto:**
El proyecto no tenía formularios de ningún tipo; se necesitaba crear la interfaz para las operaciones Create y Update del CRUD.

**Uso:**
Se generó `src/components/ProductForm.js` con Bootstrap Modal, validaciones, sanitización y manejo de errores.

---

## Prompt 5 — Diálogo de confirmación para eliminar (ConfirmDialog.js)

**Solicitud:**
"Crea un modal de confirmación simple en React con Bootstrap que: (a) muestre un mensaje de advertencia, (b) tenga botones de cancelar y confirmar, (c) muestre un spinner mientras se procesa la eliminación, (d) use animaciones con Framer Motion, (e) use colores magenta (#D81B60)."

**Contexto:**
Se necesitaba un componente reutilizable para confirmar la eliminación de productos.

**Uso:**
Se generó `src/components/ConfirmDialog.js`.

---

## Prompt 6 — Integración de CRUD en App.js con useEffect

**Solicitud:**
"Refactoriza el componente App.js para: (a) usar useEffect para cargar datos asíncronamente desde dataService, (b) manejar estados de loading y error, (c) implementar callbacks para crear, actualizar y eliminar productos, (d) mostrar feedback al usuario con alerts de Bootstrap, (e) integrar ProductForm y ConfirmDialog, (f) botón flotante o en header para 'Nuevo Producto', (g) usar colores magenta/amarillo."

**Contexto:**
App.js originalmente importaba datos estáticos y no tenía lógica CRUD.

**Uso:**
Se reescribió App.js completamente con manejo de estado, efectos secundarios y operaciones CRUD.

---

## Prompt 7 — Migración de colores a magenta/amarillo

**Solicitud:**
"Actualiza todos los componentes del proyecto para usar la paleta de colores: primario #D81B60 (rosa magenta), secundario #FFC107 (amarillo), dark #880E4F, light #FCE4EC. Reemplaza todos los azules (#004E89), naranjas (#FF6B35) y verdes (#1A936F) del diseño anterior."

**Contexto:**
El requisito de evaluación exigía específicamente colores magenta y amarillo.

**Uso:**
Se actualizaron: Header, ProductCard, HeroStats, PriceComparisonTable, PriceHistoryChart, Footer, ParticleBackground, OfferBadge, SupermarketBadge, App.css, global.css.
