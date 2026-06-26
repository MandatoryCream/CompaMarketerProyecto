# 🛒 CompaMarketer

**CompaMarketer** es una aplicación web para comparar precios de productos en los principales supermercados de Chile (Líder, Unimarc, Santa Isabel, Jumbo, Spid). Encuentra rápidamente dónde comprar más barato y visualiza la evolución de precios en el tiempo.

## 🚀 Funcionalidades

- **Comparativa de precios** — Tabla con precios de 35 productos en 5 supermercados
- **Gráfico histórico** — Evolución de precios mes a mes con toggle por supermercado
- **Indicador de ofertas** — Badges visuales que muestran si un producto está en oferta
- **Enlace directo** — Botón "Comprar" que abre el producto más barato en el sitio del supermercado
- **Filtro por categorías** — 11 categorías: Lácteos, Despensa, Bebidas, Limpieza, Panadería, Carnes, Frutas y Verduras, Cuidado Personal, Mascotas, Congelados
- **Fondo interactivo** — Partículas animadas que reaccionan al movimiento del mouse
- **Estadísticas en vivo** — Contadores animados de productos, precios y ofertas activas
- **Diseño responsive** — Adaptable a móvil, tablet y desktop

## 🛠 Tecnologías utilizadas

| Tecnología | Propósito |
|---|---|
| **React 19** | Framework front-end |
| **Create React App** | Bootstrap del proyecto |
| **Framer Motion** | Animaciones y transiciones |
| **Recharts** | Gráfico de líneas histórico |
| **React Icons** | Iconografía |
| **CSS3** | Estilos, animaciones, glassmorphism |
| **Google Fonts (Poppins)** | Tipografía |

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

## 📊 Base de datos

Los datos se almacenan localmente en `src/data/productos.json` con 35 productos, cada uno con:
- Precios actuales en los 5 supermercados
- Historial de precios de los últimos 6 meses
- Indicador de oferta con precio anterior
- Enlace directo al producto en cada supermercado
