var mongoose = require('mongoose')

var videogameSchema = mongoose.Schema({
	title : {          type : String, required : true, index : "text"},
	rating : {         type : Number, required : true},
	console : {        type : String, required : true},
	cover : {          type : String, required : true},
	quantity : {       type : Number, required : true},
	quantity_sold : {  type : Number, required : true},
	price : {          type : Number, required : true},
	description : {    type : String, required : true},
	received_by : {    type : String, required : true},
	quantityOrdered : {type : Number},
	subTotal : {	   type : Number},
	comments : {       type : String}

})

videogameSchema.index({title : "text"})

module.exports = mongoose.model('Game', videogameSchema)