const mysql = require("mysql");




const mysqlConnection = mysql.createPool({
  host:"127.0.0.1",
  user:"root",
  password:"",
  database: "w2_database",
  multipleStatements: true,
});


mysqlConnection.on('connection', function (connection) {
  console.log("... connected");
});

mysqlConnection.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});

module.exports = mysqlConnection