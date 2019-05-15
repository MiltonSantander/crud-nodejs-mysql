const express = require("express");
const router = express.Router();

const ventaController = require("../controllers/ventaController"); 

router.get("/vistaventas", ventaController.show); 

module.exports = router;