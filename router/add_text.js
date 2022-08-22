const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("add_text", {listaMascotas: "Aquí irán todas las mascotas"})
})

router.get('/text2/', (req, res) => {
    res.render("add_text", {listaMascotas: "Aquí irán todas las masssscotas"})
})

module.exports = router;