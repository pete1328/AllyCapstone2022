// Purpose: Connecting to the MySQL database using Node.js
// Resources: https://www.sitepoint.com/using-node-mysql-javascript-client/
//            https://www.w3schools.com/nodejs/nodejs_mysql_insert.asp
//            https://www.mysqltutorial.org/mysql-nodejs/insert/
// Notes: Use node connect.js in the src dir to test
// Doesn't seem to update in MySQL when checking the workbench?

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
// var user = {username: 'test', password: 'test', first_name: 'Koichi', last_name: 'Zenigata', position: 'Manager', reports_to: '3'};
// connection.query('INSERT INTO Users SET ?', user, (err, res) => {
//     if(err) throw err;
//     console.log('Last insert ID:', res.insertId);
//});

// Cleanup
// connection.query(
//     'DELETE FROM Users WHERE user_id > 3', (err, result) => {
//       if (err) throw err;
//       console.log(`Deleted ${result.affectedRows} row(s)`);
//     }
//);

// End connection
connection.end((err) => {
});
