const express = require("express");
const router = express.Router();

const tipoController = require("../controllers/tipoController"); 

router.get("/vistatipos", tipoController.list); 

router.post("/add", tipoController.save);

router.get("/delete/:id", tipoController.delete); 

router.get("/update/:id", tipoController.selection); 

router.post("/update/:id", tipoController.update); 

module.exports = router;