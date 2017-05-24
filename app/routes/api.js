// Module for API Routes (serving JSON)
module.exports = function(app, io) {
	const Room = require('../models/room');
	var bodyParser = require('body-parser');

	app.post('/api/room/new', (req, res) => {
		if (!req.body.host) return res.sendStatus(400);
		const host = req.body.host;
		Room.generateCode(host, (code) => {
			const nsp = io.of(`/${code}`);
			nsp.on('connection', (socket) => {
					socket.on('user-disconnected', (nickname) => {
				    nsp.emit('user-disconnected', nickname);
				  });
					socket.on('user-connect', (nickname) => {
				    nsp.emit('user-connect', nickname);
				  });
					socket.on('chat message', (msg, nickname) => {
						nsp.emit('chat message', msg, nickname);
				  });
					socket.on('chat gif', (gif, nickname) => {
						nsp.emit('chat gif', gif, nickname);
				  });
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
