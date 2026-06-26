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

export default function ProductCard({ producto, index, onClick }) {
  const { precios } = producto;
  const mejorPrecio = Math.min(...precios.map((p) => p.valor));
  const mejorSuper = precios.find((p) => p.valor === mejorPrecio);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.04,
        duration: 0.5,
        type: 'spring',
        stiffness: 80,
        damping: 15,
      }}
      whileHover={{ y: -8, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(producto)}
      style={{
        backgroundColor: '#fff',
        borderRadius: '20px',
        padding: '20px',
        cursor: 'pointer',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,78,137,0.18)';
        e.currentTarget.style.borderColor = 'rgba(0,78,137,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)';
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #004E89, #FF6B35, #1A936F, #004E89)',
          backgroundSize: '300% 100%',
          borderRadius: '20px 20px 0 0',
          opacity: 0,
          transition: 'opacity 0.4s ease',
        }}
        className="card-shimmer"
      />

      <div style={{
        fontSize: '2.6rem', textAlign: 'center', lineHeight: 1,
        background: 'linear-gradient(135deg, #F0F4F8, #FFF)',
        borderRadius: '14px', padding: '14px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <motion.span
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            duration: 3 + (index % 3),
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ display: 'inline-block' }}
        >
          {producto.imagen}
        </motion.span>
      </div>

      <h3 style={{
        margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#1a1a2e',
        textAlign: 'center', lineHeight: 1.3,
      }}>
        {producto.nombre}
      </h3>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: '0.7rem', color: '#AAA', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Desde
        </span>
        <motion.span
          animate={{
            textShadow: [
              '0 0 8px rgba(26,147,111,0.15)',
              '0 0 20px rgba(26,147,111,0.3)',
              '0 0 8px rgba(26,147,111,0.15)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            fontSize: '1.4rem', fontWeight: 800, color: '#1A936F',
          }}
        >
          ${mejorPrecio.toLocaleString('es-CL')}
        </motion.span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap' }}>
        {producto.precios.map((p) => (
          p.valor === mejorPrecio && (
            <SupermarketBadge key={p.supermercado} id={p.supermercado} nombre={SUPER_NAMES[p.supermercado]} size="sm" />
          )
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
        {mejorSuper && <OfferBadge esOferta={mejorSuper.esOferta} precioAnterior={mejorSuper.precioAnterior} />}
        {mejorSuper && mejorSuper.esOferta && mejorSuper.precioAnterior && (
          <span style={{
            fontSize: '0.68rem', color: '#FF6B35', fontWeight: 600,
          }}>
            -{Math.round((1 - mejorPrecio / mejorSuper.precioAnterior) * 100)}%
          </span>
        )}
      </div>

      {mejorSuper && mejorSuper.esOferta && mejorSuper.precioAnterior && (
        <div style={{
          textAlign: 'center', fontSize: '0.72rem', color: '#BBB',
        }}>
          <span style={{ textDecoration: 'line-through', marginRight: '4px' }}>
            ${mejorSuper.precioAnterior.toLocaleString('es-CL')}
          </span>
          <span style={{ color: '#FF6B35', fontWeight: 600 }}>antes</span>
        </div>
      )}

      <motion.div
        whileHover={{ scale: 1.03 }}
        style={{
          textAlign: 'center', marginTop: 'auto',
          color: '#fff', fontSize: '0.78rem', fontWeight: 600,
          padding: '8px 12px', borderRadius: '10px',
          background: 'linear-gradient(135deg, #004E89, #1A6FB5)',
          boxShadow: '0 2px 8px rgba(0,78,137,0.25)',
        }}
      >
        Ver detalle →
      </motion.div>
    </motion.div>
  );
}
