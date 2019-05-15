const express = require("express");
const router = express.Router();

const ordenController = require("../controllers/ventaController"); 

router.get("/vistacompras", ventaController.show); 

module.exports = router;