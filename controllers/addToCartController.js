var User = require('../models/user.js');


function addToCart (req, res) {

	User.update({_id: req.user._id},
			{cart: req.body},
			function(err, updated){
				console.log(err, updated)
			}
		)
	
	res.send({success : 'Item added to cart'})
	console.log('at end of saved accessory controller')

	}
	


module.exports = {
	addToCart : addToCart
}