import { motion } from 'framer-motion';
import SupermarketBadge from './SupermarketBadge';
import OfferBadge from './OfferBadge';

const SUPER_NAMES = {
  lider: 'Líder',
  unimarc: 'Unimarc',
  santa_isabel: 'Santa Isabel',
  jumbo: 'Jumbo',
  spid: 'Spid',
};

export default function PriceComparisonTable({ producto, supermercados }) {
  if (!producto || !producto.precios) return null;

  const { precios } = producto;
  const mejorPrecio = Math.min(...precios.map((p) => p.valor));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        overflowX: 'auto',
        borderRadius: '16px',
        border: '1px solid #E8E8E8',
      }}
    >
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '0.85rem',
        minWidth: '500px',
      }}>
        <thead>
          <tr style={{ backgroundColor: '#F8F9FA' }}>
            <th style={thStyle}>Supermercado</th>
            <th style={thStyle}>Precio</th>
            <th style={thStyle}>Estado</th>
            <th style={thStyle}>Comprar</th>
          </tr>
        </thead>
        <tbody>
          {precios.map((p, index) => {
            const esMejor = p.valor === mejorPrecio;
            return (
              <motion.tr
                key={p.supermercado}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                style={{
                    backgroundColor: esMejor ? 'rgba(255,193,7,0.08)' : '#fff',
                  borderBottom: '1px solid #F0F0F0',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!esMejor) e.currentTarget.style.backgroundColor = '#F8F9FA';
                }}
                onMouseLeave={(e) => {
                  if (!esMejor) e.currentTarget.style.backgroundColor = '#fff';
                }}
              >
                <td style={{ ...tdStyle, display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px' }}>
                  <SupermarketBadge id={p.supermercado} nombre={SUPER_NAMES[p.supermercado]} />
                  {esMejor && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                      style={{ fontSize: '1.2rem' }}
                    >
                      🥇
                    </motion.span>
                  )}
                </td>
                <td style={tdStyle}>
                  <span style={{
                    fontSize: '1.1rem',
                    fontWeight: esMejor ? 800 : 500,
                    color: esMejor ? '#D81B60' : '#333',
                  }}>
                    ${p.valor.toLocaleString('es-CL')}
                  </span>
                  {p.esOferta && p.precioAnterior && (
                    <div style={{ fontSize: '0.7rem', color: '#999' }}>
                      <span style={{ textDecoration: 'line-through' }}>
                        ${p.precioAnterior.toLocaleString('es-CL')}
                      </span>
                    </div>
                  )}
                </td>
                <td style={tdStyle}>
                  <OfferBadge esOferta={p.esOferta} precioAnterior={p.precioAnterior} />
                </td>
                <td style={tdStyle}>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      backgroundColor: esMejor ? '#FFC107' : '#D81B60',
                      color: '#fff',
                      textDecoration: 'none',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {esMejor ? '✨ Comprar' : 'Ir'}
                  </motion.a>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </motion.div>
  );
}

const thStyle = {
  padding: '12px 16px',
  textAlign: 'left',
  fontWeight: 700,
  color: '#666',
  fontSize: '0.78rem',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  borderBottom: '2px solid #E0E0E0',
};

const tdStyle = {
  padding: '12px 16px',
  verticalAlign: 'middle',
};
