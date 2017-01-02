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

const User = require('./app/models/user');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

app.use(passport.initialize());
app.use(passport.session());

// User.find({}, (err, users) => {
// 	console.log(users);
// });

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
		console.log(user);
    done(err, user);
  });
});


passport.use(new GoogleStrategy({
    clientID: options.GOOGLE_CLIENT_ID,
    clientSecret: options.GOOGLE_CLIENT_SECRET,
    callbackURL: options.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ 'google.id' : profile.id }, function(err, user) {
      if (err){
				return done(err);
			}
      if (user) {
				console.log(user);
        return done(null, user);
      } else {
        var newUser = new User();
        newUser.google.id = profile.id;
        newUser.google.token = accessToken;
        newUser.google.name  = profile.displayName;
        newUser.google.email = profile.emails[0].value;
        newUser.save(function(err) {
          if (err)
              throw err;
          return done(null, newUser);
        });
      }
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
require('./app/routes/api')(app, passport);
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
