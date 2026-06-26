import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return [count, ref];
}

function StatCard({ icon, label, value, color, delay }) {
  const [count, ref] = useCountUp(value);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, type: 'spring', stiffness: 80 }}
      whileHover={{ y: -4, scale: 1.02 }}
      style={{
        backgroundColor: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(0,0,0,0.06)',
        borderRadius: '16px',
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        minWidth: '150px',
        flex: 1,
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        transition: 'box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,78,137,0.12)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; }}
    >
      <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{icon}</span>
      <motion.span
        key={count}
        initial={{ scale: 1.3, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          fontSize: '1.6rem',
          fontWeight: 800,
          color: color || '#004E89',
          lineHeight: 1,
        }}
      >
        {count.toLocaleString('es-CL')}
        {label.includes('%') ? '%' : ''}
      </motion.span>
      <span style={{
        fontSize: '0.75rem',
        color: '#888',
        fontWeight: 500,
        textAlign: 'center',
      }}>
        {label}
      </span>
    </motion.div>
  );
}

export default function HeroStats({ productos }) {
  const totalProductos = productos.length;
  const totalPrecios = productos.reduce((acc, p) => acc + p.precios.length, 0);
  const ofertas = productos.filter((p) => p.precios.some((pr) => pr.esOferta)).length;
  const mejorSuperCounts = {};
  productos.forEach((p) => {
    const min = Math.min(...p.precios.map((pr) => pr.valor));
    const mejor = p.precios.find((pr) => pr.valor === min);
    if (mejor) {
      mejorSuperCounts[mejor.supermercado] = (mejorSuperCounts[mejor.supermercado] || 0) + 1;
    }
  });
  const topSuper = Object.entries(mejorSuperCounts).sort((a, b) => b[1] - a[1])[0];
  const superNames = { lider: 'Líder', unimarc: 'Unimarc', santa_isabel: 'Santa Isabel', jumbo: 'Jumbo', spid: 'Spid' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        maxWidth: '1200px',
        margin: '-20px auto 10px',
        padding: '0 24px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        <StatCard icon="📦" label="Productos monitoreados" value={totalProductos} color="#004E89" delay={0.1} />
        <StatCard icon="🏪" label="Precios registrados" value={totalPrecios} color="#FF6B35" delay={0.2} />
        <StatCard icon="🔥" label="Ofertas activas" value={ofertas} color="#1A936F" delay={0.3} />
        <StatCard icon={`🏆`} label={`${topSuper ? superNames[topSuper[0]] || topSuper[0] : '-'} tiene más baratos`} value={topSuper ? topSuper[1] : 0} color="#F7B731" delay={0.4} />
      </div>
    </motion.div>
  );
}
