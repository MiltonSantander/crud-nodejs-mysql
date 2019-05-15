const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mysql = require("mysql");
const myConnection = require("express-myconnection");
// var Promise = require("bluebird"); no se utiliza
const app = express();

//importando rutas
const productoRoutes = require("./routes/producto");
const clienteRoutes = require("./routes/cliente");
const marcaRoutes = require("./routes/marca");
const tipoRoutes = require("./routes/tipo");
const ventaRoutes = require("./routes/venta");
const reciboRoutes = require("./routes/recibo");
const homeRoutes = require("./routes/home");

//settings
app.set("port", process.env.PORT || 3000); //solicita un puerto por defecto o indica el puerto 3000 sino esta indicado
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middlewares - funciones que se ejecutan antes de las peticiones de los usuarios
app.use(morgan("dev")); //para visualizar las peticiones en la consola
app.use(myConnection(mysql, {
    host:"localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "db_facturasystem"
}, "single"));
app.use(express.urlencoded({extended: false}));//se solicita del modulo de express un metodo que nos permita entender los datos que vengan del formulario "urlencoded"

//routes - peticiones del usuario
app.use("/productos", productoRoutes);
app.use("/clientes", clienteRoutes);
app.use("/marcas", marcaRoutes);
app.use("/tipos", tipoRoutes);
app.use("/ventas", ventaRoutes);
app.use("/recibos", reciboRoutes);
app.use("/home", homeRoutes);

//archivos estaticos - imagenes, css, codigo frontend javascript
app.use(express.static(path.join(__dirname, "public")));

//iniciando el servidor
app.listen(app.get("port"), function () {//se configura el puerto que estara en escucha para el proyecto
    console.log("Server on port 3000");
});