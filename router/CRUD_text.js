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
  let arraySections = await Section.find();
  res.render('add_text', { arraySections });
})

router.get('/select_delete_text', async (req, res) => {
  let arraySections = await Section.find();
  res.render('select_delete_text', { arraySections });
})


router.post('/add_text', upload.single('audio_text'), async (req, res) => {
  if (!req.file) {
    let arraySections = await Section.find();
    res.render('add_text', { arraySections, wrong: "You must attach a file" })
  } else {
    let arrayTexts = await Text.find({ audio_text: req.file.filename });
    console.log(arrayTexts);
    if (arrayTexts.length < 1) {
      const body = req.body
      try {
        await Text.create({
          section_text: body.section_text,
          english_text: body.english_text,
          spanish_text: body.spanish_text,
          audio_text: req.file.filename
        })
        console.log(__dirname)
        let arraySections = await Section.find();
        res.render('add_text', { arraySections, right: "Successfully added" })
      } catch (error) {
        console.log('error', error)
      }
    } else {
      let arraySections = await Section.find();
      res.render('add_text', { arraySections, wrong: "Audio file name already exists" })
    }
  }
})



router.post('/delete_text', async (req, res) => {
  let section_name = req.body.section;
  let arraySections = await Section.find();
  if (req.body.section) {
    try {
      let arrayTexts = await Text.find({ section_text: section_name });
      res.render('delete_text', { arrayTexts, arraySections, section: req.query.section });
    } catch (e) {
      console.log(e);
    }
  } else {
    res.render('select_delete_text', { arraySections });
  }
})

router.get('/delete_text', async (req, res) => {
  let arraySections = await Section.find();
  if (req.query.id) {
    await Text.deleteOne({ _id: req.query.id });
    let arrayTexts = await Text.find({ section_text: req.query.section });
    res.render('delete_text', { arrayTexts, arraySections, section: req.query.section });
  }
})

module.exports = router;