import axios from 'axios';
import seedData from '../data/productos.json';

const STORAGE_KEY = 'compamarketer_productos';
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';
const USE_API = process.env.REACT_APP_USE_API === 'true';

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

function sanitizeString(val) {
  if (typeof val !== 'string') return '';
  return val.trim().replace(/[<>]/g, '');
}

function validateProduct(data) {
  const errors = [];
  if (!data.nombre || sanitizeString(data.nombre).length === 0) errors.push('El nombre es requerido');
  if (sanitizeString(data.nombre).length > 100) errors.push('El nombre no puede exceder 100 caracteres');
  if (!data.categoria) errors.push('La categoría es requerida');
  if (!Array.isArray(data.precios)) errors.push('Debe incluir precios');
  data.precios?.forEach((p, i) => {
    const v = Number(p.valor);
    if (isNaN(v) || v <= 0) errors.push(`Precio #${i + 1} debe ser un número positivo`);
  });
  return errors;
}

function getFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch { }
  return null;
}

function seedStorage() {
  const data = seedData.productos;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

function saveToStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export async function getProductos() {
  const stored = getFromStorage();
  const data = stored || seedStorage();

  if (USE_API) {
    try {
      const res = await axios.get(`${API_BASE_URL}/productos`);
      return res.data;
    } catch (err) {
      console.warn('API falló, usando localStorage:', err.message);
      await delay();
      return data;
    }
  }

  await delay();
  return data;
}

export async function getProductoById(id) {
  const stored = getFromStorage();
  const data = stored || seedStorage();
  const producto = data.find((p) => p.id === id);
  if (!producto) throw new Error(`Producto con id ${id} no encontrado`);

  if (USE_API) {
    try {
      const res = await axios.get(`${API_BASE_URL}/productos/${id}`);
      return res.data;
    } catch (err) {
      console.warn('API falló, usando localStorage:', err.message);
      await delay();
      return producto;
    }
  }

  await delay();
  return producto;
}

export async function createProducto(data) {
  const errors = validateProduct(data);
  if (errors.length > 0) throw new Error(errors.join('; '));

  const stored = getFromStorage();
  const productos = stored || seedStorage();

  const maxId = productos.reduce((max, p) => Math.max(max, p.id), 0);

  const now = new Date();
  const mesActual = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const newProduct = {
    id: maxId + 1,
    nombre: sanitizeString(data.nombre),
    categoria: data.categoria,
    imagen: data.imagen || '📦',
    precios: data.precios.map((p) => ({
      supermercado: p.supermercado,
      valor: Number(p.valor),
      link: p.link ? sanitizeString(p.link) : '#',
      esOferta: Boolean(p.esOferta),
      precioAnterior: p.esOferta && p.precioAnterior ? Number(p.precioAnterior) : null,
    })),
    historialPrecios: [{
      fecha: mesActual,
      valores: data.precios.reduce((acc, p) => {
        acc[p.supermercado] = Number(p.valor);
        return acc;
      }, {}),
    }],
  };

  productos.push(newProduct);
  saveToStorage(productos);

  if (USE_API) {
    try {
      await axios.post(`${API_BASE_URL}/productos`, newProduct);
    } catch (err) {
      console.warn('API falló, dato guardado localmente:', err.message);
    }
  }

  await delay();
  return newProduct;
}

export async function updateProducto(id, data) {
  const errors = validateProduct(data);
  if (errors.length > 0) throw new Error(errors.join('; '));

  const stored = getFromStorage();
  const productos = stored || seedStorage();

  const index = productos.findIndex((p) => p.id === id);
  if (index === -1) throw new Error(`Producto con id ${id} no encontrado`);

  const updated = {
    ...productos[index],
    nombre: sanitizeString(data.nombre),
    categoria: data.categoria,
    imagen: data.imagen || '📦',
    precios: data.precios.map((p) => ({
      supermercado: p.supermercado,
      valor: Number(p.valor),
      link: p.link ? sanitizeString(p.link) : '#',
      esOferta: Boolean(p.esOferta),
      precioAnterior: p.esOferta && p.precioAnterior ? Number(p.precioAnterior) : null,
    })),
  };

  const now = new Date();
  const mesActual = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const lastEntry = updated.historialPrecios[updated.historialPrecios.length - 1];
  if (!lastEntry || lastEntry.fecha !== mesActual) {
    updated.historialPrecios.push({
      fecha: mesActual,
      valores: data.precios.reduce((acc, p) => {
        acc[p.supermercado] = Number(p.valor);
        return acc;
      }, {}),
    });
  }

  productos[index] = updated;
  saveToStorage(productos);

  if (USE_API) {
    try {
      await axios.put(`${API_BASE_URL}/productos/${id}`, updated);
    } catch (err) {
      console.warn('API falló, dato guardado localmente:', err.message);
    }
  }

  await delay();
  return updated;
}

export async function deleteProducto(id) {
  const stored = getFromStorage();
  const productos = stored || seedStorage();

  const index = productos.findIndex((p) => p.id === id);
  if (index === -1) throw new Error(`Producto con id ${id} no encontrado`);

  productos.splice(index, 1);
  saveToStorage(productos);

  if (USE_API) {
    try {
      await axios.delete(`${API_BASE_URL}/productos/${id}`);
    } catch (err) {
      console.warn('API falló, dato eliminado localmente:', err.message);
    }
  }

  await delay();
  return true;
}
