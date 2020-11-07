const jwt = require("jsonwebtoken");
const config = require("./config");
const client = require("./controllers/client");

const checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  // Validar si el token se paso como encabezado de la petición
  if (token) {
    //Extraer la parte del token que interesa y validar
    if (token.startsWith("Bearer ")) {
      //Tomar el contenido despues del Bearer
      token = token.slice(7, token.length);
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          //Token no valido
          return res.json({
            success: false,
            message: "Token is not valid",
          });
        } else {
          //Enviar clientes
          req.decoded = decoded;
          client.sendRole(token, (role) => {
            console.log(role);
            if (role) {
              if (role === "admin" || role === "list") {
                next();
              } else {
                res.send({
                  success: false,
                  message: "User's role can't have access to this information",
                });
              }
            } else {
              res.send({
                success: false,
                message: "No user with the token provided.",
              });
            }
          });
          //token -> user al que se le generó el token
          //Ir a la b y verificar que el user tenga acceso a /api/clientes, si tiene acceso se hace el next si no se envia un menaje indicando que no hay acceso
        }
      });
    }
  }
  //En caso contrario es porque el usuario no está consciente que debió enviarlo
  else {
    res.send({
      success: false,
      message: "Auth token is not supplied",
    });
  }
};

const checkTokenPost = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  // Validar si el token se paso como encabezado de la petición
  if (token) {
    //Extraer la parte del token que interesa y validar
    if (token.startsWith("Bearer ")) {
      //Tomar el contenido despues del Bearer
      token = token.slice(7, token.length);
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          //Token no valido
          return res.json({
            success: false,
            message: "Token is not valid",
          });
        } else {
          //Post cliente
          req.decoded = decoded;
          client.sendRole(token, (role) => {
            console.log(role);
            if (role) {
              if (role === "admin" || role === "post") {
                next();
              } else {
                res.send({
                  success: false,
                  message: "User's role can't do a post",
                });
              }
            } else {
              res.send({
                success: false,
                message: "No user with the token provided.",
              });
            }
          });
          //token -> user al que se le generó el token
          //Ir a la b y verificar que el user tenga acceso a /api/clientes, si tiene acceso se hace el next si no se envia un menaje indicando que no hay acceso
        }
      });
    }
  }
  //En caso contrario es porque el usuario no está consciente que debió enviarlo
  else {
    res.send({
      success: false,
      message: "Auth token is not supplied",
    });
  }
};

module.exports = {
  checkToken: checkToken,
  checkTokenPost: checkTokenPost,
};
