const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const Section = require("../models/section");


router.get('/add_section', async (req, res) => {

    try {
        let Arraysections = await Section.find();
        res.render('add_section', { Arraysections });
    
      } catch (e) {
        console.log(e);
      }

})

router.post('/add_section', async (req, res) => {
    const body = req.body
    try {
        await Section.create({
            section: body.section_name,
        })
        res.redirect('/')
    } catch (error) {
        console.log('error', error)
    }
})

module.exports = router;