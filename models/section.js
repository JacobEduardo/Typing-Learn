const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
  section:  String,
});

// Crear el modelo
const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;