// Purpose: Testing query functionality
// Notes: Use node connectTests.js in the src dir to test
// Commands can be done in MySQL workbench in Users

// var express = require("express");
// var app = express();
var mysql = require('mysql');

// Imformation to connect into database
var connection = mysql.createConnection({
  host: "database-1.clt1avqemgdv.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "A11iedGroup",
  database: "Ally_Kudos"
});

connection.connect((err) => {
    if (err) throw err;
    console.log('You are now connected! :)');
});


// Test (Connection)
connection.query('SELECT * FROM Users', (err,rows) => {
    if(err) throw err;
    console.log('Data received from Db:');
    console.log(rows);
});

// Test (Insert) (Does not check for duplicates)
// var user = {username: 'test', password: 'test', first_name: 'Koichi', last_name: 'Zenigata', position: 'Manager', reports_to: '3', balance: 896};
// connection.query('INSERT INTO Users SET ?', user, (err, res) => {
//     if(err) throw err;
//     console.log('Last insert ID:', res.insertId);
// });

// Cleanup
// connection.query(
//     'DELETE FROM Users WHERE user_id > 3', (err, result) => {
//       if (err) throw err;
//       console.log(`Deleted ${result.affectedRows} row(s)`);
//     }
// );

// Show updated database
// connection.query('SELECT * FROM Users', (err,rows) => {
//   if(err) throw err;
//   console.log('New data received from Db:');
//   console.log(rows);
// });

// test function
function getBalance(id) {

  connection.query('SELECT balance FROM Users WHERE user_id = ' + id, (err,balance) => {
    if(err) throw err;
    console.log('Test see balance');
    console.log(id, balance);
  })

}
getBalance(21);

// End connection
connection.end((err) => {
});