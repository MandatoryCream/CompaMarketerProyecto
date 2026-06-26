import { motion, AnimatePresence } from 'framer-motion';

export default function ConfirmDialog({ show, title, message, onConfirm, onCancel, loading }) {
  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal d-block"
        tabIndex="-1"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
        onClick={onCancel}
      >
        <div className="modal-dialog modal-dialog-centered modal-sm" onClick={(e) => e.stopPropagation()}>
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="modal-content"
            style={{ borderRadius: '20px', border: 'none', overflow: 'hidden' }}
          >
            <div className="modal-body text-center" style={{ padding: '32px 24px' }}>
              <span style={{ fontSize: '3rem', display: 'block', marginBottom: '12px' }}>🗑️</span>
              <h5 className="fw-bold mb-2" style={{ color: '#1a1a2e' }}>{title || 'Confirmar'}</h5>
              <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>
                {message || '¿Estás seguro de realizar esta acción?'}
              </p>
              <div className="d-flex gap-2 justify-content-center">
                <button
                  className="btn btn-outline-magenta"
                  onClick={onCancel}
                  disabled={loading}
                  style={{ borderRadius: '10px', minWidth: '100px' }}
                >
                  Cancelar
                </button>
                <button
                  className="btn"
                  onClick={onConfirm}
                  disabled={loading}
                  style={{
                    borderRadius: '10px',
                    minWidth: '100px',
                    background: 'linear-gradient(135deg, #D81B60, #880E4F)',
                    border: 'none',
                    color: '#fff',
                    fontWeight: 600,
                  }}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                  ) : (
                    'Eliminar'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
