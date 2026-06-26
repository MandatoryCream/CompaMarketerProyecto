# Plan de Corrección — CompaMarketer

## Diagnóstico vs Requisitos

| Requisito | Estado |
|---|---|
| React SPA | ✅ Cumplido (React 19) |
| **CRUD (Crear, Leer, Actualizar, Eliminar)** | ❌ Solo lectura — datos desde JSON estático |
| **localStorage** | ❌ No existe |
| useState / useEffect | ⚠️ Parcial |
| **fetch / axios** | ❌ No existe |
| **Bootstrap 5** | ❌ No instalado |
| **Colores magenta/amarillo** | ❌ Usa azul/orange/verde |
| **Validación inputs / sanitización** | ❌ No hay formularios |
| **Manejo de errores (try/catch)** | ❌ No existe |
| **PROMPTS.md** | ❌ No existe |
| UI atractiva + animaciones | ✅ Framer Motion, Recharts, partículas |
| README | ✅ Existe pero desactualizado |

---

## Fase 1 — Dependencias
- Instalar `bootstrap` y `axios`

## Fase 2 — Servicio de datos (`src/services/dataService.js`)
- API simulada con axios + localStorage como respaldo
- Funciones async: `getProductos`, `getProductoById`, `createProducto`, `updateProducto`, `deleteProducto`
- Flujo: intenta axios → si falla (catch) → usa localStorage con `setTimeout` para simular latencia
- Seed inicial desde `productos.json` si localStorage vacío
- Validación de integridad

## Fase 3 — Bootstrap 5 (híbrido)
- Importar `bootstrap/dist/css/bootstrap.min.css` en `index.js`
- Layout: `container` → `row` → `col-*`
- Componentes Bootstrap: Modal, Form.Control, Button, Badge, Alert, Table, Card
- Mantener custom CSS (animaciones, glassmorphism, scrollbar)
- Sobrescribir variables Bootstrap

## Fase 4 — Paleta magenta/amarillo
| Rol | Color |
|---|---|
| Primario | `#D81B60` (rosa magenta) |
| Secundario | `#FFC107` (amarillo) |
| Dark | `#880E4F` |
| Fondo claro | `#FCE4EC` |
| Gradientes | magenta → amarillo |

## Fase 5 — CRUD (componentes nuevos)
- **`ProductForm.js`** — Modal con formulario controlado + validaciones
- Botones Editar/Eliminar en cada ProductCard
- **`ConfirmDialog.js`** — Modal de confirmación para borrar
- Feedback visual con Alert de Bootstrap

## Fase 6 — Estado global con useEffect
- `useEffect` → `dataService.getProductos()` con try/catch
- Estados: productos, loading, error, feedbackMessage
- Pasar callbacks `onCreate`, `onUpdate`, `onDelete`

## Fase 7 — Seguridad y validación
- trim() en strings, Number() con validación isNaN en precios
- maxLength en inputs, escape de HTML
- Validar existencia de campos al leer/escribir localStorage

## Fase 8 — Documentación
- Crear `PROMPTS.md`
- Actualizar `README.md`

---

## Archivos a modificar/crear

| Archivo | Acción |
|---|---|
| `package.json` | Modificar (bootstrap, axios) |
| `src/index.js` | Modificar (import Bootstrap CSS) |
| `src/services/dataService.js` | **Crear** |
| `src/App.js` | Modificar |
| `src/App.css` | Modificar (variables magenta/amarillo) |
| `src/styles/global.css` | Modificar (paleta colores) |
| `src/components/Header.js` | Modificar |
| `src/components/ProductCard.js` | Modificar |
| `src/components/ProductList.js` | Modificar |
| `src/components/ProductModal.js` | Modificar |
| `src/components/PriceComparisonTable.js` | Modificar |
| `src/components/PriceHistoryChart.js` | Modificar |
| `src/components/HeroStats.js` | Modificar |
| `src/components/Footer.js` | Modificar |
| `src/components/ParticleBackground.js` | Modificar |
| `src/components/OfferBadge.js` | Modificar |
| `src/components/SupermarketBadge.js` | Modificar |
| `src/components/ProductForm.js` | **Crear** |
| `src/components/ConfirmDialog.js` | **Crear** |
| `PROMPTS.md` | **Crear** |
| `README.md` | Modificar |
