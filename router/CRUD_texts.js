const express = require('express');
const router = express.Router();
const Text = require("../models/text")

router.get('/', (req, res) => {
    res.render("texts")
})

router.get('/add_text', (req, res) => {
  res.render("add_text")
})

router.post('/add_text', async (req, res) => {
  const body = req.body
  console.log(body)
  try {
    await Text.create(body)
      res.redirect('/texts')
  } catch (error) {
      console.log('error', error)
  }
})

module.exports = router;