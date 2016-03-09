var mongoose = require('mongoose')

var accessorySchema = mongoose.Schema({
	name : {            type : String, required : true, index : "text"},
	rating : {          type : Number, required : true},
	picture : {         type : String, required : true},
	quantity : {        type : Number, required : true},
	quantity_sold : {   type : Number, required : true},
	description : {     type : String, required : true},
	price : {           type : Number, required : true},
	received_by : {     type : String, required : true},
	console : {         type : String, required : true},
	comments : {        type : String}
})

module.exports = mongoose.model('Accessory', accessorySchema)