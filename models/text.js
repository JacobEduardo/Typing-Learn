const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textSchema = new Schema({
  section_text: String,
  english_text:  String,
  spanish_text: String,
  audio_text: String
});

// Crear el modelo
const Text = mongoose.model('Text', textSchema);

module.exports = Text;