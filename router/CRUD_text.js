const express = require('express');
const router = express.Router();
const Text = require("../models/text");
const Section = require("../models/section");

const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');


const { v4: uuidv4 } = require('uuid');

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


//TEXT SERVICS
const TextToSpeechService = require('../TextToSpeechService');
const apiKey = 'a3u3nLGJYlllU2qc1a_8bNFGBFVf_5dzVv_XrKhEVN01';
const serviceUrl = 'https://api.au-syd.text-to-speech.watson.cloud.ibm.com/instances/4dbc3129-b394-418c-9cd8-da1a1805ffdf';
const textToSpeech = new TextToSpeechService(apiKey, serviceUrl);

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
    const body = req.body;
    var text_ing = body.english_text;
    var filename = uuidv4();
    filename = filename + ".wav";
    try {
      await Text.create({
        section_text: body.section_text,
        english_text: body.english_text,
        spanish_text: body.spanish_text,
        audio_text: filename
      })
      console.log(__dirname)
      let arraySections = await Section.find();

      const textToSpeech = new TextToSpeechV1({
        authenticator: new IamAuthenticator({
          apikey: 'a3u3nLGJYlllU2qc1a_8bNFGBFVf_5dzVv_XrKhEVN01',
        }),
        serviceUrl: 'https://api.au-syd.text-to-speech.watson.cloud.ibm.com/instances/4dbc3129-b394-418c-9cd8-da1a1805ffdf',
      });
      
      console.log(filename)
      console.log(text_ing)
      const synthesizeParams = {
        text: text_ing,
        accept: 'audio/wav',
        voice: 'en-US_KevinV3Voice',
      };
  
      textToSpeech.synthesize(synthesizeParams)
        .then(response => {
          return textToSpeech.repairWavHeaderStream(response.result);
        })
        .then(buffer => {
          fs.writeFileSync("public/audio/" + filename, buffer);
        })
        .catch(err => {
          console.log('error:', err);
        });
  
      res.render('add_text', { arraySections, right: "Successfully addedd" })

    } catch (error) {
      console.log('error', error)
    }

  
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