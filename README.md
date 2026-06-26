# 🛒 CompaMarketer

**CompaMarketer** es una aplicación web para comparar precios de productos en los principales supermercados de Chile (Líder, Unimarc, Santa Isabel, Jumbo, Spid). Encuentra rápidamente dónde comprar más barato y visualiza la evolución de precios en el tiempo.

## 🚀 Funcionalidades

- **CRUD completo** — Crear, leer, actualizar y eliminar productos con persistencia en localStorage
- **Comparativa de precios** — Tabla con precios de productos en 5 supermercados
- **Gráfico histórico** — Evolución de precios mes a mes con toggle por supermercado
- **Indicador de ofertas** — Badges visuales que muestran si un producto está en oferta
- **Enlace directo** — Botón "Comprar" que abre el producto más barato en el sitio del supermercado
- **Filtro por categorías** — 11 categorías: Lácteos, Despensa, Bebidas, Limpieza, Panadería, Carnes, Frutas y Verduras, Cuidado Personal, Mascotas, Congelados
- **Fondo interactivo** — Partículas animadas que reaccionan al movimiento del mouse
- **Estadísticas en vivo** — Contadores animados de productos, precios y ofertas activas
- **Diseño responsive** — Adaptable a móvil, tablet y desktop con Bootstrap 5
- **API simulada** — Consumo de API con axios + localStorage como respaldo
- **Validación y sanitización** — Inputs validados y sanitizados (XSS prevention)

## 🛠 Tecnologías utilizadas

| Tecnología | Propósito |
|---|---|
| **React 19** | Framework front-end |
| **Create React App** | Bootstrap del proyecto |
| **Bootstrap 5** | Layout, componentes UI, sistema de grillas |
| **Framer Motion** | Animaciones y transiciones |
| **Recharts** | Gráfico de líneas histórico |
| **Axios** | Consumo de API simulado |
| **React Icons** | Iconografía |
| **CSS3** | Estilos personalizados, animaciones, glassmorphism |
| **Google Fonts (Poppins)** | Tipografía |
| **localStorage** | Persistencia de datos local |

## 🎨 Paleta de colores

| Rol | Color |
|---|---|
| Primario | `#D81B60` (rosa magenta) |
| Secundario | `#FFC107` (amarillo) |
| Dark | `#880E4F` |
| Fondo claro | `#FCE4EC` |

## 📦 Instalación

```bash
npm install
npm start
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000).

## 🏗 Build

```bash
npm run build
```

Genera la carpeta `build/` con los archivos optimizados para producción.

## 💾 Persistencia de datos

Los datos se almacenan localmente en el navegador mediante **localStorage**. Al cargar por primera vez, se siembran 35 productos de ejemplo desde `src/data/productos.json`. Las operaciones CRUD (crear, editar, eliminar) modifican directamente el localStorage.

## 🌐 Consumo de API (simulado)

El servicio `src/services/dataService.js` intenta realizar llamadas HTTP con **axios** a una API REST configurable. Si la API no está disponible (modo desarrollo), utiliza localStorage como respaldo con una latencia simulada de 400ms para demostrar el patrón asíncrono con `try/catch`.

Para activar el modo API:
```bash
set REACT_APP_USE_API=true && npm start
```

## 📁 Estructura del proyecto

```
src/
├── App.js                      # Componente principal con CRUD
├── App.css                     # Variables de color globales
├── index.js                    # Punto de entrada + Bootstrap CSS
├── styles/global.css           # Estilos globales + animaciones + clases Bootstrap custom
├── data/productos.json         # Datos de semilla inicial (35 productos)
├── services/
│   └── dataService.js          # Servicio de datos (CRUD + localStorage + axios)
└── components/
    ├── Header.js               # Header con navegación por categorías
    ├── HeroStats.js            # Estadísticas animadas
    ├── ProductList.js          # Grid de productos con Bootstrap
    ├── ProductCard.js          # Tarjeta de producto con botones editar/eliminar
    ├── ProductModal.js         # Modal de detalle del producto
    ├── ProductForm.js          # Formulario crear/editar producto (validado)
    ├── ConfirmDialog.js        # Diálogo de confirmación para eliminar
    ├── PriceComparisonTable.js # Tabla comparativa de precios
    ├── PriceHistoryChart.js    # Gráfico histórico de precios
    ├── OfferBadge.js           # Badge de oferta
    ├── SupermarketBadge.js     # Badge de supermercado
    ├── ParticleBackground.js   # Fondo interactivo de partículas
    └── Footer.js               # Footer
```

## 📝 Registro de prompts de IA

Ver archivo `PROMPTS.md` para la documentación detallada de los prompts de inteligencia artificial utilizados durante el desarrollo.
