var mongoose = require('mongoose')

var videogameSchema = mongoose.Schema({
	name : {type : String, required : true, unique : true},
	alternative_name : {type : String},
	rating : {type : String, required : true},
	release_dates : {type : String, required : true},
	companies : {type : String, required : true},
	cover : {type : String, required : true},
	screenshots : {type : String, required : true},
	quantity : {type : Number, required : true},
	received_by : {type : String, required : true},
	received_date : {type : String, required : true},
	comments : {type : String}

})

module.exports = mongoose.model('Game', videogameSchema)