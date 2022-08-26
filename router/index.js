const express = require('express');
const router = express.Router();
const Text = require("../models/text");

router.get('/', async (req, res) => {
    if(req.query.section && req.query.n ){
        try {
            let arraytexts = await Text.find({section_text : req.query.section });
            console.log(arraytexts)
            res.render('index', { arraytexts, length: arraytexts.length, num: req.query.n });
          } catch (e) {
            console.log(e);
        }
    }else{
        res.render('index');
    }
})

module.exports = router;