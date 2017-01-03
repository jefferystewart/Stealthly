const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const randomstring = require("randomstring");


// Model Schema
var RoomSchema = new Schema ({
	code: String,
  users: { type : Array , "default" : [] }
});

RoomSchema.statics.generateCode = function(cb){
	let randomString = randomstring.generate(4);
	let searching = true;

	const searchFunc = function (err, room){
		console.log(room);
		console.log(randomString);
		if (room.length){
			randomString = randomstring.generate(4);
		} else {
			searching = false;
		}
	}.bind(this);
		this.find({code: randomString}, function(err, room){
			console.log(randomString);
			console.log(room);
		});

		return randomString;
};


module.exports = mongoose.model('Room', RoomSchema);
