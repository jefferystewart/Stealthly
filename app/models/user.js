var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// Model Schema
var UserSchema = new Schema ({
	google : {
		id: Number,
		token: String,
		name: String,
		email: String
	},
	local: {
		name: String,
		password:String
	}
});

module.exports = mongoose.model('Model', UserSchema);
