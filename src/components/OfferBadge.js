import { motion } from 'framer-motion';

export default function OfferBadge({ esOferta, precioAnterior }) {
  if (esOferta) {
    return (
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        style={{
          background: 'var(--gradient-primary)',
          color: '#fff',
          padding: '3px 10px',
          borderRadius: '12px',
          fontSize: '0.7rem',
          fontWeight: 700,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          whiteSpace: 'nowrap',
        }}
      >
        🔥 Oferta
      </motion.span>
    );
  }

  return (
    <span style={{
      backgroundColor: '#F5F5F5',
      color: '#999',
      padding: '3px 10px',
      borderRadius: '12px',
      fontSize: '0.7rem',
      fontWeight: 500,
      whiteSpace: 'nowrap',
    }}>
      Precio normal
    </span>
  );
}
