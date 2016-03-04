var mongoose = require('mongoose')

var accessorySchema = mongoose.Schema({
	name : {type : String, required : true, unique : true},
	alternative_name : {type : String, required: true},
	rating : {type : Number},
	release_date : {type : Date, required : true},
	picture : {type : String, required : true},
	quantity : {type : Number, required : true},
	created_by : {type : String, required : true},
	created_date : {type : Date, required : true},
	console : {type : String, required : true}
	comments : {type : String}
})

module.exports = mongoose.model('Accessory', accessorySchema)