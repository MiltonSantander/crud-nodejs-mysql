const express = require("express");
const router = express.Router();

const marcaController = require("../controllers/marcaController"); 

router.get("/vistamarcas", marcaController.list); 

router.post("/add", marcaController.save);

router.get("/delete/:id", marcaController.delete); 

router.get("/update/:id", marcaController.selection); 

router.post("/update/:id", marcaController.update); 

module.exports = router;