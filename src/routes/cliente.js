const express = require("express");
const router = express.Router();

const clienteController = require("../controllers/clienteController"); 

router.get("/vistaclientes", clienteController.list); 

router.post("/add", clienteController.save);

router.get("/delete/:id", clienteController.delete); 

router.get("/update/:id", clienteController.selection); 

router.post("/update/:id", clienteController.update); 

module.exports = router;