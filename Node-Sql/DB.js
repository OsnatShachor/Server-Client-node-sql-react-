 const mysql = require('mysql2');


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'postsDB',
  port: 3306,
  password: 'mysql24',
}).promise();

module.exports = pool;