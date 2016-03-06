var mongoose = require('mongoose')

var videogameSchema = mongoose.Schema({
	title : {type : String, required : true},
	rating : {type : Number, required : true},
	console : {type : String, required : true},
	cover : {type : String, required : true},
	quantity : {type : Number, required : true},
	description : {type : String, required : true},
	received_by : {type : String, required : true}

})

module.exports = mongoose.model('Game', videogameSchema)