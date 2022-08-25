const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textSchema = new Schema({
  english_text:  String,
  spanish_text: String,
  audio_text: String
});

// Crear el modelo
const Text = mongoose.model('Text', textSchema);

module.exports = Text;