const express = require('express');
const bodyParser = require('body-parser');
const user_routes = require('./routes/users')
const appr_routes = require('./routes/appreciations')
const cors = require('cors');

const app = express();

app.use(cors());

/* var corsOptions = {
	origin: 'http://localhost:3000/'
		};
app.use (cors(corsOptions)); */

// parse requests of content-type - application/json

app.use (bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded

//app.use (bodyParser.urlencoded({extended:true}));

//simple route
app.get ('/', (req, res) => res.send('INDEX'));

//user routes
app.use('/api', user_routes);
app.use('/api', appr_routes);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log (`Server started on port ${PORT}`));
