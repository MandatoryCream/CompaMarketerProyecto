import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIAS = ['Lácteos', 'Despensa', 'Bebidas', 'Limpieza', 'Panadería', 'Carnes', 'Frutas y Verduras', 'Cuidado Personal', 'Mascotas', 'Congelados'];
const SUPERMERCADOS = [
  { id: 'lider', nombre: 'Líder' },
  { id: 'unimarc', nombre: 'Unimarc' },
  { id: 'santa_isabel', nombre: 'Santa Isabel' },
  { id: 'jumbo', nombre: 'Jumbo' },
  { id: 'spid', nombre: 'Spid' },
];

function sanitize(val) {
  if (typeof val !== 'string') return '';
  return val.trim().replace(/[<>]/g, '');
}

function validate(form) {
  const errors = {};
  if (!sanitize(form.nombre)) errors.nombre = 'El nombre es requerido';
  if (sanitize(form.nombre).length > 100) errors.nombre = 'Máximo 100 caracteres';
  if (!form.categoria) errors.categoria = 'Selecciona una categoría';
  SUPERMERCADOS.forEach((sup) => {
    const v = Number(form.precios[sup.id]);
    if (isNaN(v) || v <= 0) errors[`precio_${sup.id}`] = 'Debe ser un número positivo';
  });
  return errors;
}

export default function ProductForm({ producto, onSave, onClose }) {
  const isEditing = Boolean(producto);
  const [form, setForm] = useState({
    nombre: '',
    categoria: '',
    imagen: '📦',
    precios: {},
    ofertas: {},
    preciosAnteriores: {},
    links: {},
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (producto) {
      const precios = {};
      const ofertas = {};
      const preciosAnteriores = {};
      const links = {};
      producto.precios.forEach((p) => {
        precios[p.supermercado] = p.valor;
        ofertas[p.supermercado] = p.esOferta;
        preciosAnteriores[p.supermercado] = p.precioAnterior || '';
        links[p.supermercado] = p.link || '';
      });
      setForm({
        nombre: producto.nombre,
        categoria: producto.categoria,
        imagen: producto.imagen || '📦',
        precios,
        ofertas,
        preciosAnteriores,
        links,
      });
    }
  }, [producto]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
    setServerError('');
  };

  const handlePrecioChange = (supId, value) => {
    setForm((prev) => ({ ...prev, precios: { ...prev.precios, [supId]: value } }));
    setErrors((prev) => ({ ...prev, [`precio_${supId}`]: '' }));
  };

  const handleOfertaChange = (supId, checked) => {
    setForm((prev) => ({
      ...prev,
      ofertas: { ...prev.ofertas, [supId]: checked },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSaving(true);
    setServerError('');

    try {
      const precios = SUPERMERCADOS.map((sup) => ({
        supermercado: sup.id,
        valor: Number(form.precios[sup.id]),
        link: sanitize(form.links[sup.id]) || '#',
        esOferta: Boolean(form.ofertas[sup.id]),
        precioAnterior: form.ofertas[sup.id] && form.preciosAnteriores[sup.id]
          ? Number(form.preciosAnteriores[sup.id])
          : null,
      }));

      await onSave({
        nombre: sanitize(form.nombre),
        categoria: form.categoria,
        imagen: form.imagen || '📦',
        precios,
      });
      onClose();
    } catch (err) {
      setServerError(err.message || 'Error al guardar el producto');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal d-block"
        tabIndex="-1"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content" style={{ borderRadius: '24px', border: 'none', overflow: 'hidden' }}>
            <div className="modal-header" style={{
              background: 'var(--gradient-primary)',
              color: '#fff',
              border: 'none',
              padding: '16px 24px',
            }}>
              <h5 className="modal-title fw-bold" style={{ fontSize: '1.1rem' }}>
                {isEditing ? '✏️ Editar Producto' : '➕ Nuevo Producto'}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Cerrar"></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body" style={{ padding: '24px' }}>
                {serverError && (
                  <div className="alert alert-danger d-flex align-items-center gap-2" style={{ borderRadius: '12px' }}>
                    <span>⚠️</span> {serverError}
                  </div>
                )}

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold" style={{ color: '#555', fontSize: '0.85rem' }}>
                      Nombre del producto *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                      value={form.nombre}
                      onChange={(e) => handleChange('nombre', e.target.value)}
                      maxLength={100}
                      placeholder="Ej: Leche Entera 1L"
                      style={{ borderRadius: '10px' }}
                    />
                    {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fw-semibold" style={{ color: '#555', fontSize: '0.85rem' }}>
                      Categoría *
                    </label>
                    <select
                      className={`form-select ${errors.categoria ? 'is-invalid' : ''}`}
                      value={form.categoria}
                      onChange={(e) => handleChange('categoria', e.target.value)}
                      style={{ borderRadius: '10px' }}
                    >
                      <option value="">Seleccionar...</option>
                      {CATEGORIAS.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {errors.categoria && <div className="invalid-feedback">{errors.categoria}</div>}
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fw-semibold" style={{ color: '#555', fontSize: '0.85rem' }}>
                      Icono (emoji)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.imagen}
                      onChange={(e) => handleChange('imagen', e.target.value)}
                      maxLength={10}
                      style={{ borderRadius: '10px' }}
                    />
                  </div>
                </div>

                <hr className="my-4" />
                <h6 className="fw-bold mb-3" style={{ color: 'var(--magenta)' }}>
                  🏪 Precios por supermercado
                </h6>

                {SUPERMERCADOS.map((sup) => (
                  <div key={sup.id} className="row g-2 mb-3 align-items-center">
                    <div className="col-md-2">
                      <span className="fw-semibold" style={{ fontSize: '0.85rem', color: '#555' }}>
                        {sup.nombre}
                      </span>
                    </div>
                    <div className="col-md-2">
                      <input
                        type="number"
                        className={`form-control ${errors[`precio_${sup.id}`] ? 'is-invalid' : ''}`}
                        value={form.precios[sup.id] || ''}
                        onChange={(e) => handlePrecioChange(sup.id, e.target.value)}
                        placeholder="$ Precio"
                        min="1"
                        style={{ borderRadius: '10px' }}
                      />
                      {errors[`precio_${sup.id}`] && (
                        <div className="invalid-feedback">{errors[`precio_${sup.id}`]}</div>
                      )}
                    </div>
                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control"
                        value={form.links[sup.id] || ''}
                        onChange={(e) => setForm((prev) => ({ ...prev, links: { ...prev.links, [sup.id]: e.target.value } }))}
                        placeholder="Link (opcional)"
                        style={{ borderRadius: '10px', fontSize: '0.8rem' }}
                      />
                    </div>
                    <div className="col-md-2 d-flex align-items-center gap-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`oferta_${sup.id}`}
                        checked={Boolean(form.ofertas[sup.id])}
                        onChange={(e) => handleOfertaChange(sup.id, e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor={`oferta_${sup.id}`} style={{ fontSize: '0.8rem' }}>
                        🔥 Oferta
                      </label>
                    </div>
                    <div className="col-md-3">
                      <input
                        type="number"
                        className="form-control"
                        value={form.preciosAnteriores[sup.id] || ''}
                        onChange={(e) => setForm((prev) => ({ ...prev, preciosAnteriores: { ...prev.preciosAnteriores, [sup.id]: e.target.value } }))}
                        placeholder="Precio anterior"
                        disabled={!form.ofertas[sup.id]}
                        min="1"
                        style={{ borderRadius: '10px', fontSize: '0.8rem', opacity: form.ofertas[sup.id] ? 1 : 0.5 }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="modal-footer" style={{ borderTop: '1px solid #F0F0F0', padding: '16px 24px' }}>
                <button type="button" className="btn btn-outline-magenta" onClick={onClose} disabled={saving}
                  style={{ borderRadius: '10px' }}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-magenta" disabled={saving}
                  style={{ borderRadius: '10px' }}>
                  {saving ? (
                    <span>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Guardando...
                    </span>
                  ) : (
                    isEditing ? '💾 Guardar Cambios' : '✅ Crear Producto'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
