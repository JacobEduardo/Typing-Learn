const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const Section = require("../models/section");


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
        res.redirect('/')
    } catch (error) {
        console.log('error', error)
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
    let arraySections = await Section.find();
    try {
        let eee = await Section.deleteOne({ section: section_name });
        res.render('delete_section', { arraySections, menssenger: "Eliminado Correctamente" });
    } catch (error) {
        console.log(error)
        res.render('delete_section', { arraySections, menssenger: "Error" });
    }
})

module.exports = router;