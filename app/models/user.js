var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// Model Schema
var UserSchema = new Schema ({
	username : {
		type: String
	},
});

module.exports = mongoose.model('Model', UserSchema);
