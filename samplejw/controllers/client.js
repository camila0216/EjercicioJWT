const conn = require("../lib/MongoUtils");
const CryptoJS = require("crypto-js");

const sendClients = (req, res) =>
  conn.then((client) => {
    client
      .db("db_ejerciciojwt")
      .collection("users")
      .find({})
      .toArray((err, data) => {
        console.log(data);
        res.send(data);
      });
  });

const sendRole = (token, callback) =>
  conn.then((client) => {
    client
      .db("db_ejerciciojwt")
      .collection("users")
      .findOne({ token: token })
      .then((result) => {
        if (result) {
          callback(result.role);
        } else {
          callback(null);
        }
      });
  });

const postClient = (req, res) => {
  conn.then((client) => {
    const user = {
      username: req.body.username,
      password: CryptoJS.MD5(req.body.password).toString(),
      role: req.body.role,
      token: "",
    };

    res.send(user);
    client.db("db_ejerciciojwt").collection("users").insertOne(user);
  });
};

module.exports = {
  sendClients,
  sendRole,
  postClient,
};
