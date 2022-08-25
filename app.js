const express = require('express')
const app = express()
const port = 8081
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const db = require("./Conexion")
db.conexionMongoDB();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

app.use('/', require('./router/texts'));

app.use((req, res, next) => {
  res.status(404).render("404", {
      titulo: "404",
      descripcion: "Título del sitio web"
  })
})

app.use(express.static('public'));

app.listen(port, () => {
  console.log('App up')
})