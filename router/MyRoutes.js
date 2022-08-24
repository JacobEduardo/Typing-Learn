const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render("add_text", {tituloServicios: "Este es un mensaje dinámico de servicios"})
})

module.exports = router;