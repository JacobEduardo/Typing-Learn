function conexionMongoDB() {
  const mongoose = require('mongoose');

  const uri = 'mongodb+srv://admin:1234@mymongodb.e4fnvyd.mongodb.net/MyTexts?retryWrites=true&w=majority';

  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('conectado a mongodb'))
    .catch(e => console.log('error de conexión', e))
}

exports.conexionMongoDB = conexionMongoDB