import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import PriceComparisonTable from './PriceComparisonTable';
import PriceHistoryChart from './PriceHistoryChart';

export default function ProductModal({ producto, supermercados, onClose }) {
  if (!producto) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px',
          backdropFilter: 'blur(4px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: '#fff',
            borderRadius: '24px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
          }}
        >
          <div style={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            padding: '20px 24px',
            borderBottom: '1px solid #F0F0F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 10,
            borderRadius: '24px 24px 0 0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '2rem' }}>{producto.imagen}</span>
              <div>
                <h2 style={{
                  margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#1a1a2e',
                }}>
                  {producto.nombre}
                </h2>
                <span style={{
                  fontSize: '0.75rem', color: '#999',
                  backgroundColor: '#F0F0F0', padding: '2px 10px',
                  borderRadius: '10px', fontWeight: 500,
                }}>
                  {producto.categoria}
                </span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.5rem',
                color: '#999',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IoClose />
            </motion.button>
          </div>

          <div style={{ padding: '24px' }}>
            <h3 style={{
              margin: '0 0 12px', fontSize: '0.9rem', fontWeight: 600, color: '#666',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              📊 Comparativa de Precios
            </h3>
            <PriceComparisonTable producto={producto} supermercados={supermercados} />

            <div style={{ marginTop: '32px' }}>
              <h3 style={{
                margin: '0 0 16px', fontSize: '0.9rem', fontWeight: 600, color: '#666',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                📈 Historial de Precios
              </h3>
              <PriceHistoryChart historialPrecios={producto.historialPrecios} />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
