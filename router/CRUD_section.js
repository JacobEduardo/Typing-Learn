const express = require('express');
const router = express.Router();
const Section = require("../models/section");

router.get('/', (req, res) => {
    res.render("add_section")
})

router.get('/add_section', (req, res) => {
    res.render("add_section")
})

router.post('/add_section', async (req, res) => {
    const body = req.body
    try {
        await Section.create({
            section: body.english_text,
        })
        res.redirect('/texts')
    } catch (error) {
        console.log('error', error)
    }
})

module.exports = router;