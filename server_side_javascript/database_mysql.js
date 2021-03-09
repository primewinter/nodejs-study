const dev = require('./config/dev');
var mysql      = require('mysql');
var connection = mysql.createConnection({
   host     : dev.mysql.host,
   port     : dev.mysql.port,
   user     : dev.mysql.user,
   password : dev.mysql.password,
   database : dev.mysql.database
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();