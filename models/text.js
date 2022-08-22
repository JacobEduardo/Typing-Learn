const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textSchema = new Schema({
  nombre:  String,
  descripcion: String
});

// Crear el modelo
const Text = mongoose.model('Text', textSchema);

module.exports = Text;