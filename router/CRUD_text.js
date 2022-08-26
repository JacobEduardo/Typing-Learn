const express = require('express');
const router = express.Router();
const Text = require("../models/text");
const Section = require("../models/section");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './public/audio',
  filename: function (req, file, cb) {
    cb("", file.originalname);
  }
})

const upload = multer({
  storage: storage
})


router.get('/add_text', async (req, res) => {
  let Arraysections = await Section.find();
  res.render('add_text', { Arraysections });
})

router.post('/add_text', upload.single('audio_text'), async (req, res) => {
  const body = req.body
  try {
    await Text.create({
      section_text: body.section_text,
      english_text: body.english_text,
      spanish_text:  body.spanish_text,
      audio_text: req.file.filename
    })
    console.log(__dirname)
    res.redirect('/')
  } catch (error) {
    console.log('error', error)
  }
})

module.exports = router;