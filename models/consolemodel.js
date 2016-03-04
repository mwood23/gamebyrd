var mongoose = require('mongoose')

var consoleSchema = mongoose.Schema({
	name : {type : String, required : true, unique : true},
	alternative_name : {type : String, required : true},
	rating : {type : String},
	release_date : {type : String, required : true},
	picture : {type : String, required : true},
	quantity : {type : Number, required : true},
	received_by : {type : String, required : true},
	received_date : {type : String, required : true},
	comments : {type : String}
})

module.exports = mongoose.model('GameConsole', consoleSchema)