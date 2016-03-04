var mongoose = require('mongoose')

var videogameSchema = mongoose.Schema({
	name : {type : String, required : true, unique : true},
	alternative_name : {type : String, required : true},
	rating : {type : Number, required : true},
	release_dates : {type : Array, required : true},
	companies : {type : Array, required : true},
	cover : {type : String, required : true},
	screenshots : {type : Array, required : true},
	quantity : {type : Number, required : true},
	received_by : {type : String, required : true},
	received_date : {type : Date, required : true},
	comments : {type : String}

})

module.exports = mongoose.model('Console', videogameSchema)