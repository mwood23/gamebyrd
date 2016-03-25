var User = require('../models/user.js');


// Finds the cart by req.user and then updates it using req.body
function addToCart (req, res) {

	User.update({_id: req.user._id},
			{cart: req.body},
			function(err, updated){
			}
		)
	
	res.send({success : 'Item added to cart'})

	}
	


module.exports = {
	addToCart : addToCart
}