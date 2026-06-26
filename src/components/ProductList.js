import { useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

export default function ProductList({ productos, supermercados, onEdit, onDelete }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <div className="container" style={{ padding: '24px' }}>
        <div className="row g-3">
          {productos.map((producto, index) => (
            <div key={producto.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ProductCard
                producto={producto}
                supermercados={supermercados}
                index={index}
                onClick={setSelectedProduct}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          ))}
        </div>
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
