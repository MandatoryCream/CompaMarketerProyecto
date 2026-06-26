import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductos, createProducto, updateProducto, deleteProducto } from './services/dataService';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ConfirmDialog from './components/ConfirmDialog';
import Footer from './components/Footer';
import HeroStats from './components/HeroStats';
import ParticleBackground from './components/ParticleBackground';
import './App.css';

const CATEGORIAS = ['Todas', 'Lácteos', 'Despensa', 'Bebidas', 'Limpieza', 'Panadería', 'Carnes', 'Frutas y Verduras', 'Cuidado Personal', 'Mascotas', 'Congelados'];

function App() {
  const [productos, setProductos] = useState([]);
  const [supermercados, setSupermercados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');

  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  useEffect(() => {
    loadProductos();
  }, []);

  async function loadProductos() {
    setLoading(true);
    setError('');
    try {
      const data = await getProductos();
      setProductos(data);
      setSupermercados([
        { id: 'lider', nombre: 'Líder', color: '#D81B60', icono: 'L' },
        { id: 'unimarc', nombre: 'Unimarc', color: '#880E4F', icono: 'U' },
        { id: 'santa_isabel', nombre: 'Santa Isabel', color: '#FFC107', icono: 'SI' },
        { id: 'jumbo', nombre: 'Jumbo', color: '#E65100', icono: 'J' },
        { id: 'spid', nombre: 'Spid', color: '#6A1B9A', icono: 'S' },
      ]);
    } catch (err) {
      setError(err.message || 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  }

  const productosFiltrados = useMemo(() => {
    if (categoriaActiva === 'Todas') return productos;
    return productos.filter((p) => p.categoria === categoriaActiva);
  }, [categoriaActiva, productos]);

  const showFeedback = useCallback((type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback({ type: '', message: '' }), 4000);
  }, []);

  const handleCreate = useCallback(async (data) => {
    try {
      const nuevo = await createProducto(data);
      setProductos((prev) => [...prev, nuevo]);
      showFeedback('success', `✅ "${nuevo.nombre}" creado exitosamente`);
    } catch (err) {
      showFeedback('danger', `❌ Error al crear: ${err.message}`);
      throw err;
    }
  }, [showFeedback]);

  const handleUpdate = useCallback(async (data) => {
    if (!editingProduct) return;
    try {
      const updated = await updateProducto(editingProduct.id, data);
      setProductos((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      showFeedback('success', `💾 "${updated.nombre}" actualizado exitosamente`);
      setEditingProduct(null);
    } catch (err) {
      showFeedback('danger', `❌ Error al actualizar: ${err.message}`);
      throw err;
    }
  }, [editingProduct, showFeedback]);

  const handleDelete = useCallback(async () => {
    if (!deletingProduct) return;
    setDeleting(true);
    try {
      await deleteProducto(deletingProduct.id);
      setProductos((prev) => prev.filter((p) => p.id !== deletingProduct.id));
      showFeedback('success', `🗑️ "${deletingProduct.nombre}" eliminado`);
      setDeletingProduct(null);
    } catch (err) {
      showFeedback('danger', `❌ Error al eliminar: ${err.message}`);
    } finally {
      setDeleting(false);
    }
  }, [deletingProduct, showFeedback]);

  const openCreate = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const openEdit = (producto) => {
    setEditingProduct(producto);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingProduct(null);
  };

  const openDelete = (producto) => setDeletingProduct(producto);
  const closeDelete = () => setDeletingProduct(null);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      <ParticleBackground />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header
          categorias={CATEGORIAS}
          categoriaActiva={categoriaActiva}
          onCambiarCategoria={setCategoriaActiva}
        />

        {feedback.message && (
          <div className="container mt-3">
            <div className={`alert alert-${feedback.type} d-flex align-items-center gap-2 fade show`}
              style={{ borderRadius: '12px', marginBottom: 0 }}
              role="alert">
              {feedback.message}
            </div>
          </div>
        )}

        <div className="container d-flex justify-content-between align-items-center mt-4 mb-2">
          <h2 style={{
            fontSize: '1.1rem', fontWeight: 700, color: '#880E4F', margin: 0,
            letterSpacing: '-0.3px',
          }}>
            {categoriaActiva === 'Todas'
              ? `Todos los productos (${productosFiltrados.length})`
              : `${categoriaActiva} (${productosFiltrados.length})`}
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openCreate}
            className="btn btn-magenta"
            style={{ borderRadius: '10px', fontSize: '0.85rem' }}
          >
            ➕ Nuevo Producto
          </motion.button>
        </div>

        {loading ? (
          <div className="container text-center py-5">
            <div className="spinner-border" style={{ color: 'var(--magenta)', width: '3rem', height: '3rem' }} role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2" style={{ color: '#888' }}>Cargando productos...</p>
          </div>
        ) : error ? (
          <div className="container text-center py-5">
            <div className="alert alert-danger" style={{ borderRadius: '12px', maxWidth: '500px', margin: '0 auto' }}>
              ⚠️ {error}
            </div>
            <button className="btn btn-magenta mt-2" onClick={loadProductos}
              style={{ borderRadius: '10px' }}>
              🔄 Reintentar
            </button>
          </div>
        ) : (
          <>
            <HeroStats productos={productos} />

            <AnimatePresence mode="wait">
              <motion.main
                key={categoriaActiva}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                style={{ flex: 1 }}
              >
                <ProductList
                  productos={productosFiltrados}
                  supermercados={supermercados}
                  onEdit={openEdit}
                  onDelete={openDelete}
                />
              </motion.main>
            </AnimatePresence>
          </>
        )}

        <Footer />
      </div>

      {formOpen && (
        <ProductForm
          producto={editingProduct}
          onSave={editingProduct ? handleUpdate : handleCreate}
          onClose={closeForm}
        />
      )}

      <ConfirmDialog
        show={Boolean(deletingProduct)}
        title="Eliminar Producto"
        message={deletingProduct ? `¿Estás seguro de eliminar "${deletingProduct.nombre}"? Esta acción no se puede deshacer.` : ''}
        onConfirm={handleDelete}
        onCancel={closeDelete}
        loading={deleting}
      />
    </div>
  );
}

export default App;
