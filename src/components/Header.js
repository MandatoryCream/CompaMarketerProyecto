import { motion } from 'framer-motion';

export default function Header({ categorias, categoriaActiva, onCambiarCategoria }) {
  return (
    <header style={{
      background: 'var(--gradient-header)',
      padding: '20px 24px 16px',
      boxShadow: '0 4px 30px rgba(216,27,96,0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1200px',
          margin: '0 auto',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <motion.span
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: '2rem' }}
          >
            🛒
          </motion.span>
          <div>
            <h1 style={{
              margin: 0,
              color: '#fff',
              fontSize: '1.6rem',
              fontWeight: 800,
              letterSpacing: '-0.5px',
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              CompaMarketer
            </h1>
            <p style={{
              margin: '2px 0 0',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.75rem',
              fontWeight: 400,
            }}>
              Compara y ahorra 🏆
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '16px',
          maxWidth: '1200px',
          margin: '16px auto 0',
        }}
      >
        {categorias.map((cat, index) => (
          <motion.button
            key={cat}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCambiarCategoria(cat)}
            style={{
              padding: '8px 18px',
              borderRadius: '25px',
              border: categoriaActiva === cat ? '2px solid #FFC107' : '2px solid rgba(255,255,255,0.2)',
              backgroundColor: categoriaActiva === cat ? 'rgba(255,193,7,0.2)' : 'rgba(255,255,255,0.08)',
              color: categoriaActiva === cat ? '#FFC107' : 'rgba(255,255,255,0.8)',
              cursor: 'pointer',
              fontSize: '0.82rem',
              fontWeight: categoriaActiva === cat ? 700 : 500,
              backdropFilter: 'blur(10px)',
              transition: 'all 0.2s ease',
            }}
          >
            {cat === 'Todas' && '📋 '}
            {cat === 'Lácteos' && '🧀 '}
            {cat === 'Despensa' && '📦 '}
            {cat === 'Bebidas' && '🥤 '}
            {cat === 'Limpieza' && '🧹 '}
            {cat === 'Panadería' && '🥖 '}
            {cat}
          </motion.button>
        ))}
      </motion.div>
    </header>
  );
}
