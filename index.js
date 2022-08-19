const express = require('express')
const app = express()
const port = 8081
const morgan = require('morgan')
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:1234@mymongodb.e4fnvyd.mongodb.net/?retryWrites=true&w=majority');

app.use(morgan('dev'));
app.set('view engine' , 'ejs')
app.get('/user', (req, res) => {
  res.send('Hello World!')
})

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})