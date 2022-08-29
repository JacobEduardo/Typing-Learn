const express = require('express');
const router = express.Router();
const Text = require("../models/text");
const Section = require("../models/section");

router.get('/', async (req, res) => {
    let arraySections = await Section.find();
    if(req.query.section && req.query.n ){
        try {
            let arrayTexts = await Text.find({section_text : req.query.section });
            res.render('play', { arrayTexts, length: arrayTexts.length, num: req.query.n , arraySections, section: req.query.section});
            console.log(arrayTexts)
          } catch (e) {
            console.log(e);
        }
    }else{
        res.render('index', { arraySections });
    }
})

module.exports = router;