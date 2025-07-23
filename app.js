const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('🟢 Conectado a MongoDB'))
  .catch(err => console.error('🔴 Error de conexión:', err));

const Producto = require('./productoModel');

// GET todos
app.get('/productos', async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

// POST nuevo
app.post('/productos', async (req, res) => {
  const nuevo = new Producto(req.body);
  await nuevo.save();
  res.status(201).json(nuevo);
});

// PUT actualizar
app.put('/productos/:id', async (req, res) => {
  const actualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(actualizado);
});

// DELETE eliminar
app.delete('/productos/:id', async (req, res) => {
  await Producto.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Producto eliminado' });
});

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
