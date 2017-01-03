// Module for API Routes (serving JSON)

module.exports = function(app, passport) {
	// var mongoose = require('mongoose'),
		const Room = require('../models/room');
		var bodyParser = require('body-parser');

	app.get('/api/room/new', function(req, res){
		Room.generateCode(function(code){
			console.log(code);
			res.send(code);
		});
	});
};
