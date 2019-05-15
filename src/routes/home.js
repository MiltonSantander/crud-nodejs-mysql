const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController"); 

router.get("/vistahome", homeController.show); 

module.exports = router;