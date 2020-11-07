const { MongoClient } = require("mongodb");

//Cadena de conexión
const url = "mongodb://localhost:27017";

//Conexion, returns a promise
const conn = MongoClient.connect(url, { useUnifiedTopology: true });

//Make conexion available for other parts of the app
module.exports = conn;
