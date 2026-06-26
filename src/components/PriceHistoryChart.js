import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';

const SUPER_LINE_COLORS = {
  lider: '#00A650',
  unimarc: '#E30613',
  santa_isabel: '#003DA5',
  jumbo: '#F58220',
  spid: '#0098D5',
};

const SUPER_NAMES = {
  lider: 'Líder',
  unimarc: 'Unimarc',
  santa_isabel: 'Santa Isabel',
  jumbo: 'Jumbo',
  spid: 'Spid',
};

function formatPrice(value) {
  return `$${value.toLocaleString('es-CL')}`;
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload) return null;
  return (
    <div style={{
      backgroundColor: 'rgba(255,255,255,0.95)',
      border: '1px solid #E0E0E0',
      borderRadius: '12px',
      padding: '12px 16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(10px)',
    }}>
      <p style={{ margin: '0 0 8px', fontWeight: 600, fontSize: '0.85rem', color: '#333' }}>
        {label}
      </p>
      {payload.map((entry) => (
        <div key={entry.name} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.8rem',
          margin: '3px 0',
        }}>
          <span style={{
            width: '10px', height: '10px', borderRadius: '50%',
            backgroundColor: entry.color, display: 'inline-block',
          }} />
          <span style={{ color: '#666' }}>{SUPER_NAMES[entry.name] || entry.name}:</span>
          <span style={{ fontWeight: 600, color: '#333' }}>
            {formatPrice(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function PriceHistoryChart({ historialPrecios }) {
  const [selectedLines, setSelectedLines] = useState({
    lider: true, unimarc: true, santa_isabel: true, jumbo: true, spid: true,
  });

  if (!historialPrecios || historialPrecios.length === 0) {
    return <p style={{ textAlign: 'center', color: '#999' }}>Sin historial disponible</p>;
  }

  const data = historialPrecios.map((entry) => ({
    fecha: entry.fecha,
    lider: entry.valores.lider,
    unimarc: entry.valores.unimarc,
    santa_isabel: entry.valores.santa_isabel,
    jumbo: entry.valores.jumbo,
    spid: entry.valores.spid,
  }));

  const toggleLine = (key) => {
    setSelectedLines((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{
        display: 'flex', gap: '12px', justifyContent: 'center',
        flexWrap: 'wrap', marginBottom: '16px',
      }}>
        {Object.entries(SUPER_LINE_COLORS).map(([key, color]) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleLine(key)}
            style={{
              padding: '4px 12px',
              borderRadius: '20px',
              border: `2px solid ${color}`,
              backgroundColor: selectedLines[key] ? color : 'transparent',
              color: selectedLines[key] ? '#fff' : color,
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
          >
            {SUPER_NAMES[key]}
          </motion.button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
          <XAxis
            dataKey="fecha"
            tick={{ fontSize: 12, fill: '#888' }}
            axisLine={{ stroke: '#E0E0E0' }}
          />
          <YAxis
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            tick={{ fontSize: 12, fill: '#888' }}
            axisLine={{ stroke: '#E0E0E0' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span style={{ color: '#666', fontSize: '0.8rem' }}>{SUPER_NAMES[value] || value}</span>
            )}
          />
          {Object.entries(SUPER_LINE_COLORS).map(([key, color]) => (
            selectedLines[key] && (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={color}
                strokeWidth={2.5}
                dot={{ r: 4, fill: color, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6, fill: color, strokeWidth: 2, stroke: '#fff' }}
                name={key}
                connectNulls
              />
            )
          ))}
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
