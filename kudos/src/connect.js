// Purpose: Connecting to the MySQL database using Node.js
// References: https://codeforgeek.com/node-mysql-connection-pool-example/
//             https://codeforgeek.com/nodejs-mysql-tutorial/
// Notes: Use node connect.js in the src dir to test
// Commands can be done in MySQL workbench in Users

var mysql = require("mysql");
var config = require("../../kudos-services/config.json")

// Imformation to connect into database
var pool  = mysql.createPool({
  host: "database-1.clt1avqemgdv.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "A11iedGroup",
  database: "Ally_Kudos"
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

// Name: getBalance
// Purpose: Get the kudos balance from the database for the user
// Param: id of the user in the database
// Return: balance
// Note: Not working right now
function getBalance(id) {

  var user_balance = 0;

  exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    pool.getConnection(function(err, connection) {

      connection.query('SELECT balance FROM Users WHERE user_id = ' + id, function (err,balance) {

          if(err) throw err;

          console.log('Test see balance');
          console.log(id, balance);

          user_balance = balance;

          connection.release();

          if (err) callback(err);
          else callback(null, results);
          
      });
    });

  return user_balance;

}

getBalance(1);
