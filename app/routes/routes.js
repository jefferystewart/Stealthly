// Exported routes to Node
// They respect a last declared hiearchy, so the ones defined at
// the bottom may override the ones at the top.
module.exports = function(app) {
	const Room = require('../models/room');
	app.get('/', function(req, res) {
		// Displaying an already made view
		res.sendfile('src/public/views/index.html');

		Room.find({}, function(err, rooms){
		  // console.log(rooms);
			// rooms.forEach((room)=>{
			// 	room.remove();
			// });
		});
	});

	app.get('/*', function(req, res) {
		// Displaying an already made view
		// res.send('<h1>nice try <3</h1>', 404);
		// res.sendfile('src/public/views/index.html');

		Room.find({}, function(err, rooms){
		  // console.log(rooms);
			// rooms.forEach((room)=>{
			// 	room.remove();
			// });
		});
	});
};
