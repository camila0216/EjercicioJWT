var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");
let config = require("../config");
const conn = require("../lib/MongoUtils");
const login = require("../controllers/login");
const CryptoJS = require("crypto-js");

/* GET users listing. */
router.post("/", function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  //Estos valores deben ser cableados a la base de datos. Voy a la bd y consulto el usuario con el nombre username (Admin) y obtengo la contraseña
  //username:admin
  //password:123456 en la base de datos se almacena es el md5 de esto
  //hacer un md5 (password) y compara con lo que está almacenado en la base de datos
  //Se debería encriptar la contraseña al almacenarla por ejemplo con un hash md5
  if (username && password) {
    let encryptedpw = CryptoJS.MD5(password).toString();
    login.sendPassword(username, (psword) => {
      if (!psword) {
        res.send({
          success: false,
          message: "User doesn't exists",
        });
      } else {
        if (encryptedpw === psword) {
          let token = jwt.sign({ username: username }, config.secret, {
            expiresIn: "24h",
          });
          //Se almacena el token en la base de datos
          login.updateToken(username, token);
          res.send({
            success: true,
            message: "Authentication success",
            token: token,
          });
        } else {
          res.send({
            success: false,
            message: "Username or password not valid",
          });
        }
      }
    });
  } else {
    res.send({
      success: false,
      message: "Username or password not valid",
    });
  }
});

module.exports = router;
