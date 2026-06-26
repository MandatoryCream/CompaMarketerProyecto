import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import data from './data/productos.json';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import HeroStats from './components/HeroStats';
import ParticleBackground from './components/ParticleBackground';

function App() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');

  const productosFiltrados = useMemo(() => {
    if (categoriaActiva === 'Todas') return data.productos;
    return data.productos.filter((p) => p.categoria === categoriaActiva);
  }, [categoriaActiva]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      background: 'linear-gradient(180deg, #F0F4F8 0%, #F8F9FA 30%, #FFF 100%)',
    }}>
      <ParticleBackground />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header
          categorias={data.categorias}
          categoriaActiva={categoriaActiva}
          onCambiarCategoria={setCategoriaActiva}
        />

        <HeroStats productos={data.productos} />

        <AnimatePresence mode="wait">
          <motion.main
            key={categoriaActiva}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{ flex: 1 }}
          >
            <ProductList
              productos={productosFiltrados}
              supermercados={data.supermercados}
            />
          </motion.main>
        </AnimatePresence>

        <Footer />
      </div>
    </div>
  );
}

export default App;
