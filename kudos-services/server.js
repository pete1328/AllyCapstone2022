const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/users')
const cors = require('cors');

const app = express();

var corsOptions = {
	origin: 'http://localhost:8080/'
		};
app.use (cors(corsOptions));

// parse requests of content-type - application/json

app.use (bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded

app.use (bodyParser.urlencoded({extended:true}));

//simple route
app.get ('/', (req, res) => res.send('INDEX'));

//user routes
app.use('/api', routes);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log (`Server started on port ${PORT}`));
