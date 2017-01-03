// Module for API Routes (serving JSON)

module.exports = function(app, passport) {
	// var mongoose = require('mongoose'),
		const Room = require('../models/room');
		var bodyParser = require('body-parser');

	app.get('/api/room/new', function(req, res){
		console.log('ok');

		const code = Room.generateCode();
		res.send(code, 200);
	});

	// app.get('/auth/google/', passport.authenticate('google', { scope : ['email'] }));
	//
	// app.get('/auth/google/callback',
	//   passport.authenticate('google', { failureRedirect: '/login' }),
	//   function(req, res) {
	//     res.redirect('/');
	//   });

	// Example API route
};
