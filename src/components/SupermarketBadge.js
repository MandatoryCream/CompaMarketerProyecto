import { motion } from 'framer-motion';

const SUPER_COLORS = {
  lider: { bg: '#E8F5E9', text: '#2E7D32', border: '#A5D6A7' },
  unimarc: { bg: '#FFEBEE', text: '#C62828', border: '#EF9A9A' },
  santa_isabel: { bg: '#E3F2FD', text: '#1565C0', border: '#90CAF9' },
  jumbo: { bg: '#FFF3E0', text: '#E65100', border: '#FFCC80' },
  spid: { bg: '#E1F5FE', text: '#0277BD', border: '#81D4FA' },
};

export default function SupermarketBadge({ id, nombre, size = 'md' }) {
  const colors = SUPER_COLORS[id] || { bg: '#F5F5F5', text: '#333', border: '#CCC' };
  const sizeStyles = size === 'sm'
    ? { padding: '2px 8px', fontSize: '0.7rem' }
    : { padding: '4px 14px', fontSize: '0.8rem' };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      style={{
        ...sizeStyles,
        backgroundColor: colors.bg,
        color: colors.text,
        border: `1.5px solid ${colors.border}`,
        borderRadius: '20px',
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: colors.text,
        display: 'inline-block',
      }} />
      {nombre}
    </motion.span>
  );
}
