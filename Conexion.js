const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.set('view engine' , 'ejs')

const uri = 'mongodb+srv://admin:1234@mymongodb.e4fnvyd.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))