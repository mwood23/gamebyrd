var User = require('../models/user.js');

function updateUser(req, res) {
	console.log("made it back here", req.body)

	User.findByIdAndUpdate(req.user._id, 
		{ $set: {first_name : req.body.first_name,
				 last_name  : req.body.last_name,
				 email      : req.body.email,
				 address    : req.body.address,
				 city       : req.body.city,
				 state      : req.body.state,
				 zip_code   : req.body.zip_code,
				 mobile_phone : req.body.mobile_phone
		}}, {upsert:true, new: true}, function (err, user){
			console.log(err, user)
			res.send(user)
		})
}




module.exports = {
	updateUser : updateUser
}
