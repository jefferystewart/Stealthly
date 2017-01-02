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


const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: options.GOOGLE_CLIENT_ID,
    clientSecret: options.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// Configs
const db = require('./config/db');

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
