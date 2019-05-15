const express = require("express");
const router = express.Router();

const reciboController = require("../controllers/reciboController"); 

router.get("/vistarecibos", reciboController.list); 

router.post("/add", reciboController.save);

router.get("/delete/:id", reciboController.delete); 

router.get("/update/:id", reciboController.selection); 

router.post("/update/:id", reciboController.update); 

module.exports = router;