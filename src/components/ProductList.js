import { useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

export default function ProductList({ productos, supermercados }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        padding: '24px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {productos.map((producto, index) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            supermercados={supermercados}
            index={index}
            onClick={setSelectedProduct}
          />
        ))}
      </div>

      {productos.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '60px 20px', color: '#999',
        }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '12px' }}>🔍</span>
          <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>No hay productos en esta categoría</p>
        </div>
      )}

      <ProductModal
        producto={selectedProduct}
        supermercados={supermercados}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
