// Dependencie
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Configs
const db = require('./config/db');

let dbUrl = process.env.MLAB_URL || db.url;
console.log('hellllllllllo');
console.log(dbUrl);
// Connect to the DB
mongoose.connect(dbUrl);
app.use(express.static(__dirname + '/src/public'));

// log every request to the console
app.use(morgan('dev'));

// For parsing HTTP responses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// Express Routes
require('./app/routes/api')(app, io);
require('./app/routes/routes')(app);

// Start the app with listen and a port number
const port = process.env.PORT || 3000;

http.listen(port, function(){
  console.log(`listening on ${port}`);
});
