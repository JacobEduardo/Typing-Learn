const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const Section = require("../models/section");
const Text = require("../models/text");

router.get('/add_section', async (req, res) => {

    try {
        let arraySections = await Section.find();
        res.render('add_section', { arraySections });
    
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
        let arraySections = await Section.find();
        res.render('add_section', { arraySections , right: "Successfully added" })
    } catch (error) {
        let arraySections = await Section.find();
        res.render('add_section', { arraySections , wrong: "Audio file name already exists" })
    }
})

router.get('/delete_section', async (req, res) => {

    try {
        let arraySections = await Section.find();
        res.render('delete_section', { arraySections });
    
      } catch (e) {
        console.log(e); 
      }

})

router.post('/delete_section', async (req, res) => {
    let section_name = req.body.section;
    console.log(section_name)
    try {
        let eee = await Section.deleteOne({ section: section_name });
        let aaa = await Text.deleteMany({ section_text: section_name });
        let arraySections = await Section.find();
        res.render('delete_section', { arraySections, right: "The section was deleted successfully"})
    } catch (error) {
        let arraySections = await Section.find();
        res.render('delete_section', { arraySections, wrong: "An error has occurred."})
    }
})

module.exports = router;