// Module for API Routes (serving JSON)

module.exports = function(app, passport) {
	var mongoose = require('mongoose'),
		User = require('../models/user');

	app.get('/auth/google/', passport.authenticate('google', { scope : ['email'] }));

	app.get('/auth/google/callback',
	  passport.authenticate('google', { failureRedirect: '/login' }),
	  function(req, res) {
	    // Successful authentication, redirect home.
			
	    res.redirect('/');
	  });

	// Example API route
};
