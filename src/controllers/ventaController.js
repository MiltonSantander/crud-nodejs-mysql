const controller = {};
const path = require("path");


controller.show = function (req, res) {
    res.render(path.join(__dirname, "../views/ventas.ejs"));
}

module.exports = controller;