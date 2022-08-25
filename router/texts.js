const express = require('express');
const router = express.Router();

console.log(__dirname);
router.all('/texts', require( __dirname + '/CRUD_text.js'));
router.all('/sections', require( __dirname + '/CRUD_section.js'));

router.get('/index', (req, res) => {
    res.render("texts")
})

module.exports = router;