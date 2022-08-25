const express = require('express');
const router = express.Router();
const Text = require("../models/text");
const multer = require('multer');

console.log(__dirname)

const storage = multer.diskStorage({
  destination: './public/audio',
  filename: function (req, file, cb) {
    cb("", file.originalname);
  }
})

const upload = multer({
  storage: storage
})

router.get('/texts', (req, res) => {
  res.render("add_text")
  console.log("este es unnnumeri")
  console.log(__dirname)
})

router.get('/texts/add_text', (req, res) => {
  res.render("add_text")
  console.log("este es unnnumeri")
  console.log(__dirname)
})

router.post('/add_text', upload.single('audio_text'), async (req, res) => {
  const body = req.body
  try {
    await Text.create({
      english_text: body.english_text,
      spanish_text:  body.spanish_text,
      audio_text: req.file.filename
    })
    console.log(__dirname)
    res.redirect('/texts')
  } catch (error) {
    console.log('error', error)
  }
})

module.exports = router;