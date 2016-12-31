var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// Model Schema
var ModelSchema = new Schema ({
	name : {
		type: String
	},
});

module.exports = mongoose.model('Model', ModelSchema);
