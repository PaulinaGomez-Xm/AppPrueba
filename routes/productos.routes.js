const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/productos.controller");

router.get("/", ctrl.listar);
router.get("/:id", ctrl.obtenerUno);

module.exports = router;
