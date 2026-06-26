# CompaMarketer - Plan SSD (Spec-Driven Development)

# Este es el primer plan que se utilizó para crear la página web, que resultó incompleta y se mejoró después con los prompts y el segundo plan en los archivos prompts.md y planFix1.md

## Visión General
Aplicación web React para comparar precios de productos en supermercados chilenos (Líder, Unimarc, Santa Isabel, Jumbo, Spid). Muestra tabla comparativa, gráfico histórico de precios, indicadores de oferta, y enlaces al producto más barato.

---

## Fase 0: Instalación de Dependencias
```
npm install recharts framer-motion react-icons
```

## Fase 1: Base de Datos Local (Mock JSON)
Archivo: `src/data/productos.json`

Estructura:
- `productos[]`: Lista de productos
  - `id`, `nombre`, `categoria`, `imagen_url`
  - `precios[]`: Precios actuales por supermercado
    - `supermercado`, `valor`, `link`, `esOferta`, `precioAnterior`
  - `historialPrecios[]`: Datos históricos para el gráfico
    - `fecha`, `valores[]`: { supermercado, precio }

Supermercados incluidos: Líder, Unimarc, Santa Isabel, Jumbo, Spid
Categorías: Lácteos, Bebidas, Despensa, Limpieza, Panadería, Carnes, Frutas y Verduras, Cuidado Personal, Mascotas, Congelados

**35 productos** en total con precios actualizados a Junio 2026.

## Fase 2: Estructura de Componentes
```
src/
├── data/
│   └── productos.json
├── components/
│   ├── ParticleBackground.js  # Canvas animado con partículas interactivas
│   ├── HeroStats.js           # Stats con contadores animados (IntersectionObserver)
│   ├── Header.js              # Navbar + logo + título animado + filtro categorías
│   ├── ProductList.js         # Grid de productos con filtro por categoría
│   ├── ProductCard.js         # Card con floating emoji, glow precio, shimmer hover
│   ├── ProductModal.js        # Modal con tabla comparativa + gráfico + links
│   ├── PriceComparisonTable.js # Tabla de precios por supermercado
│   ├── PriceHistoryChart.js   # Gráfico Recharts (líneas de evolución) con toggle
│   ├── SupermarketBadge.js    # Badge con color/logo del supermercado
│   ├── OfferBadge.js          # Badge "Oferta" / "Precio Normal"
│   └── Footer.js              # Footer informativo
├── styles/
│   └── global.css             # Animaciones clave: shimmer, float, pulse-glow, gradient-shift, bg-shift
├── App.js
└── index.js
```

## Fase 3: Visual Design (Mejorado)
- **Paleta de Colores**:
  - Primary: `#FF6B35` (naranja vibrante)
  - Secondary: `#004E89` (azul profundo)
  - Accent: `#1A936F` (verde para precios bajos)
  - Warning: `#F7B731` (amarillo para ofertas)
  - Fondo: `#F0F4F8` con gradiente suave a `#FFF`
  - Cards: white con glassmorphism
- **Tipografía**: Google Fonts "Poppins" (importada en index.html)
- **Fondo Animado**: Sistema de partículas en canvas con:
  - 60 partículas flotando con movimiento Browniano
  - Conexiones entre partículas cercanas (efecto neural)
  - Interacción con el mouse (las partículas huyen del cursor)
  - 4 colores basados en la paleta de la app
- **Hero Stats**: 4 tarjetas con contadores animados via IntersectionObserver
  - Total productos monitoreados
  - Total precios registrados
  - Ofertas activas 🔥
  - Supermercado con más productos baratos 🏆
- **Animaciones por componente**:
  - Header: Slide down con spring, gradiente animado en título
  - Categorías: Stagger fade-in con delay progresivo
  - ProductCard: Spring entrada, floating emoji infinito, glow pulsante en precio, shimmer gradient en hover, shadow glow
  - Modal: Scale + fade con spring, backdrop blur
  - Tabla: Slide-in por fila con stagger, highlight verde
  - Gráfico: Fade-in con toggle animado de líneas
- **Transiciones**: AnimatePresence entre cambios de categoría (fade + slide)
- **Efectos visuales**:
  - Shimmer en cards al hover (barra de gradiente superior)
  - Floating emoji animado en cada card
  - Glow pulsante en el mejor precio
  - Sombra con blur progresiva en hover
  - Card hover con elevación + scale
  - Glassmorphism en stats
  - Scroll personalizado

## Fase 4: Funcionalidades Específicas
1. **Catálogo**: Grid de 35 productos con imagen emoji, nombre y mejor precio con glow
2. **Filtro**: Por categoría (11 categorías) con tabs animados y transición suave
3. **Stats**: Hero section con 4 contadores animados al hacer scroll
4. **Modal de detalle**: Al hacer clic en un producto se abre modal con:
   - Tabla comparativa de todos los supermercados
   - Badge de oferta donde corresponda
   - Link "Comprar" al producto más barato (abre en nueva pestaña)
   - Gráfico de líneas con historial de precios y toggle por supermercado
5. **Highlight**: Celda verde + glow + medalla 🥇 para el precio mínimo
6. **Background**: Partículas animadas interactivas con el mouse
7. **Responsive**: Stack vertical en mobile, tabla horizontal en desktop

## Fase 5: Datos Mock (productos.json) - 35 productos
| Producto | Categoría |
|---|---|
| Leche Entera 1L | Lácteos |
| Pan Molde 800g | Panadería |
| Arroz Grado 1 1kg | Despensa |
| Fideos Spaghetti 500g | Despensa |
| Aceite Vegetal 1L | Despensa |
| Detergente Líquido 1L | Limpieza |
| Café Instantáneo 200g | Despensa |
| Bebida Cola 2L | Bebidas |
| Queso Laminado 200g | Lácteos |
| Harina 1kg | Despensa |
| Azúcar 1kg | Despensa |
| Postre de Leche 120g | Lácteos |
| Yogurt Natural 1kg | Lácteos |
| Mantequilla 250g | Lácteos |
| Pechuga de Pollo 1kg | Carnes |
| Carne Molida 1kg | Carnes |
| Salmon Ahumado 200g | Carnes |
| Plátano 1kg | Frutas y Verduras |
| Manzana Fuji 1kg | Frutas y Verduras |
| Tomate 1kg | Frutas y Verduras |
| Lechuga Escarola | Frutas y Verduras |
| Cepillo de Dientes | Cuidado Personal |
| Shampoo 400ml | Cuidado Personal |
| Desodorante Spray | Cuidado Personal |
| Papel Higiénico 4 rollos | Limpieza |
| Ambientador 300ml | Limpieza |
| Comida para Perro 3kg | Mascotas |
| Arena para Gato 5kg | Mascotas |
| Papas Congeladas 1kg | Congelados |
| Helado Vainilla 1L | Congelados |
| Agua Sin Gas 1.5L | Bebidas |
| Jugo Néctar 1L | Bebidas |
| Cerveza 6-pack | Bebidas |
| Galletas Surtidas 300g | Despensa |
| Cereal 500g | Despensa |

Cada producto tiene 6 meses de historial de precios (Enero-Junio 2026).

## Fase 6: Verificación
```bash
npm start
```
- Verificar que la página carga sin errores
- Verificar que los componentes se renderizan correctamente
- Verificar que el gráfico muestra datos
- Verificar que los links abren en nueva pestaña
- Verificar responsividad
- Verificar animaciones de partículas
- Verificar contadores de stats
- Verificar transiciones entre categorías
