const express = require('express');
const router = express.Router();
const Text = require("../models/text");
const multer = require('multer');
const { Types } = require('mongoose');
const mimeTypes = require('mime-types')


const storage = multer.diskStorage({
  destination: './public/audio',
  filename: function (req, file, cb) {
    cb("", Date.now() + "." + mimeTypes.extension(file.mimetype));
  }
})


const upload = multer({
  storage: storage
})

router.get('/', (req, res) => {
  res.render("texts")
})

router.get('/add_text', (req, res) => {
  res.render("add_text")
})

router.post('/add_text', upload.single('audio'), async (req, res) => {
  const body = req.body
  console.log(body)
  try {
    await Text.create({
      nombre:  "qaw",
      descripcion: "asdas",
      audio_name: "asdasd"
    })
    res.redirect('/texts')
  } catch (error) {
    console.log('error', error)
  }
})

module.exports = router;