var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// Model Schema
var RoomSchema = new Schema ({
	code: String,
  users: { type : Array , "default" : [] }
});

module.exports = mongoose.model('Model', RoomSchema);
