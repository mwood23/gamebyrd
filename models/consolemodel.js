var mongoose = require('mongoose')

var consoleSchema = mongoose.Schema({
	name : {         type : String, required : true, unique : true, index : "text"},
	rating : {       type : Number, required : true},
	picture : {      type : String, required : true},
	description : {  type : String, required : true},
	quantity : {     type : Number, required : true},
	quantity_sold : {type : Number, required : true},
	price : {        type : Number, required : true},
	received_by : {  type : String, required : true},
	comments : {     type : String}
})

consoleSchema.index({name : "text"})

module.exports = mongoose.model('GameConsole', consoleSchema)