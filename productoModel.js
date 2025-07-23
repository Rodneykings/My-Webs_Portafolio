const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  imagen: { type: String } // puedes agregar más campos si lo deseas
});

module.exports = mongoose.model('Producto', productoSchema);
