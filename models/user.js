var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
	first_name : {      type: String, required:true},
	last_name : {       type: String, required: true},
	email : {           type: String, required: true},
	username : {        type : String, required:true, unique : true},
	password : {        type : String, required:true},
	address : {         type : String},
	city : {            type : String},
	state : {           type : String},
	zip_code : {        type : String},
	cart : {            type : Object, required:true, default: {}},
	subTotal : {        type : Number},
	mobile_phone : {    type : Number},
	purchase_history : {type : Array},
	current_items : {   type : Array},
	permissions : {     type : String},


}, { minimize: false })

module.exports = mongoose.model('User', userSchema)