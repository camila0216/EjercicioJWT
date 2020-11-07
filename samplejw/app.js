var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//Se adicionan las rutas
var clientsRouter = require("./routes/client");
var loginRouter = require("./routes/login");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Redirección de la ruta a clientRouter
app.use("/api/clients", clientsRouter);
//Redirección a la ruta loginRouter
app.use("/api/login", loginRouter);

module.exports = app;
