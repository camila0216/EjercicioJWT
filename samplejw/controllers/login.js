const conn = require("../lib/MongoUtils");

const sendPassword = (username, callback) => {
  conn.then((client) => {
    client
      .db("db_ejerciciojwt")
      .collection("users")
      .findOne({ username })
      .then((result) => {
        if (result) {
          callback(result.password);
        } else {
          callback(null);
        }
      });
  });
};

const updateToken = (username, token) => {
  conn.then((client) => {
    client
      .db("db_ejerciciojwt")
      .collection("users")
      .updateOne({ username }, { $set: { token: token } });
  });
};

module.exports = {
  sendPassword,
  updateToken,
};
