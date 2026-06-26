import { motion } from 'framer-motion';

const SUPER_COLORS = {
  lider: { bg: '#FCE4EC', text: '#D81B60', border: '#F48FB1' },
  unimarc: { bg: '#F3E5F5', text: '#880E4F', border: '#CE93D8' },
  santa_isabel: { bg: '#FFF8E1', text: '#F57F17', border: '#FFE082' },
  jumbo: { bg: '#FFF3E0', text: '#E65100', border: '#FFCC80' },
  spid: { bg: '#FCE4EC', text: '#AD1457', border: '#F48FB1' },
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
