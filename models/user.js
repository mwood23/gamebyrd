var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
	first_name : {type: String, required:true},
	last_name : {type: String, required: true},
	email : {type: String, required: true},
	username : {type : String, required:true, unique : true},
	password : {type : String, required:true},
})

module.exports = mongoose.model('User', userSchema)