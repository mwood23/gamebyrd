var mongoose = require('mongoose')

var consoleSchema = mongoose.Schema({
	name : {type : String, required : true, unique : true},
	rating : {type : String},
	picture : {type : String, required : true},
	quantity : {type : Number, required : true},
	received_by : {type : String, required : true},
	comments : {type : String}
})

module.exports = mongoose.model('GameConsole', consoleSchema)