const express = require("express");
const router = express.Router();

const productoController = require("../controllers/productoController"); //se importa las funciones del objeto controller y se guarda en una constante

router.get("/vistaproductos", productoController.list); //cuanto se solicite una peticion en la direccion http://localhost:3000/productos se ejecutara la funcion list que se encuentra en el objeto productoController
router.post("/add", productoController.save);

router.get("/delete/:id", productoController.delete); // el :id es un parametro de la ruta, el cual puede variar

router.get("/update/:id", productoController.selection); 
router.post("/update/:id", productoController.update); 

module.exports = router;