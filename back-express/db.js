const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWD,
  database: process.env.SQL_DATABASE,
});

connection.connect(function(err) {
    console.log("connected to database")
    if (err) throw err;
});

module.exports = connection;