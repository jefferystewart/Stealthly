const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const randomstring = require("randomstring");
const stringOptions = {
	length: 4,
	charset: 'alphabetic',
	capitalization: 'uppercase'
};

// Model Schema
var RoomSchema = new Schema ({
	code: String,
  users: { type : Array , "default" : [] },
	host: String
});

RoomSchema.statics.generateCode = function(host, cb){
	let randomString = randomstring.generate(stringOptions);

	const countFunc = function (err, count){
		console.log('counting');
    if(count > 0){
			let randomString = randomstring.generate(stringOptions);
			this.count({code: randomString}, countFunc);
    } else {
			this.create({ code: randomString, users:[], host: host }, function (err, room) {
  			if (err) return handleError(err);
				cb(randomString);
			});
		}
	}.bind(this);
	this.count({code: randomString}, countFunc);
};


module.exports = mongoose.model('Room', RoomSchema);
