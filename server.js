// Dependencie
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Configs
var db = require('./config/db');

// Connect to the DB
mongoose.connect(db.url);

app.use(express.static(__dirname + '/public'));

// log every request to the console
app.use(morgan('dev'));

// For parsing HTTP responses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// Express Routes
require('./app/routes/api')(app);
require('./app/routes/routes')(app);

io.on('connection', function(socket){
  console.log('a user connected');
	socket.on('disconnect', function(){
    console.log('user disconnected');
  });
	socket.on('chat message', function(msg){
    console.log('message: ' + msg);
		io.emit('chat message', msg);
  });
});

// Start the app with listen and a port number
http.listen(3000, function(){
  console.log('listening on *:3000');
});
