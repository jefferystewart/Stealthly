// Dependencie
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const options = require('./config/options');
const passport = require('passport');

// Configs
const db = require('./config/db');

// Connect to the DB
mongoose.connect(db.url);
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

// io.on('connection', function(socket){
//   console.log('a user connected');
// 	socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// 	socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
// 		io.emit('chat message', msg);
//   });
// });

// Start the app with listen and a port number
http.listen(3000, function(){
  console.log('listening on *:3000');
});
