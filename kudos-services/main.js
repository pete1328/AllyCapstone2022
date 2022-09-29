var mysql = require("mysql");
var config = require("./config.json")

var pool  = mysql.createPool({
    host     : config.dbhost,
    user     : config.dbuser,
    password : config.dbpassword,
    database : config.dbname
  });
  
  exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    pool.getConnection(function(err, connection) {
      // connected!
      connection.query('SELECT * from Users', function (error, results, fields) {

        connection.release();

        if (error) callback(error);
        else callback(null, results);
        
    });
  });
};