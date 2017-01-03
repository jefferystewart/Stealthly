// Module for API Routes (serving JSON)

module.exports = function(app, io) {
	// var mongoose = require('mongoose'),
		const Room = require('../models/room');
		var bodyParser = require('body-parser');

	app.post('/api/room/new', function(req, res) {
		if (!req.body.host) return res.sendStatus(400);
		const host = req.body.host;
		Room.generateCode(host, io, function(code) {
			const nsp = io.of(`/${code}`);
			nsp.on('connection', function(socket){
				console.log(`connected to ${code}`);
			});
			res.send(code);
		});
	});

	app.get('/api/room/:code', function(req, res) {
		const code = req.params.code;
		Room.findOne({ code: code }, function (err, room) {
			if (err) return handleError(err);
			if (room){
				res.status(200);
				res.send(room.code);
			} else{
				res.status(404).send('No room with that code!');
			}

		});
	});
};
