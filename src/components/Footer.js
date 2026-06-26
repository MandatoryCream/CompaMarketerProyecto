export default function Footer() {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '24px',
      color: '#888',
      fontSize: '0.78rem',
      borderTop: '1px solid rgba(216,27,96,0.1)',
      marginTop: '40px',
      background: 'linear-gradient(180deg, #FFF, #FCE4EC)',
    }}>
      <p style={{ margin: 0 }}>
        🛒 CompaMarketer — Compara precios y ahorra en tus compras 🏆
      </p>
      <p style={{ margin: '4px 0 0', fontSize: '0.72rem' }}>
        Los precios son referenciales y pueden variar según tu ubicación.
      </p>
    </footer>
  );
}
