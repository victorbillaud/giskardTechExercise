const mysql = require('mysql2');
require('dotenv').config();



const connection = mysql.createConnection({
  host: "mysql_server",
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWD,
  database: process.env.SQL_DATABASE,
  multipleStatements: true
});

connection.connect(function(err) {
    if (err) throw err;    
    console.log("connected to database")
});

module.exports = connection;