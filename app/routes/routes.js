// Exported routes to Node
// They respect a last declared hiearchy, so the ones defined at
// the bottom may override the ones at the top.
module.exports = function(app) {
	// Wildcard route serving static html page
	app.get('/', function(req, res) {
		// Displaying an already made view
		res.sendfile('public/views/index.html');
	});
};
