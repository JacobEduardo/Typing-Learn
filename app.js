const express = require('express')
const app = express()
const port = 8081
//const morgan = require('morgan')
//const bodyParser = require('body-parser');

app.use('/', require('./router/MyRoutes'));
app.use('/add_text', require('./router/add_text'));

app.set('view engine', 'ejs');

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