var User = require('../models/user.js');
var config = require('../config.js')
var stripe = require('stripe')(config.testSecretKey)



// Calls to Strip to charge user
function charge(req, res) {

	// Stripe token on the body to the post
    var stripeToken = req.body.stripeToken;
    var amount = req.user.subTotal * 100;
    console.log('made it charge', req.body, amount, req.user)

    stripe.charges.create({
        card: stripeToken,
        currency: 'usd',
        amount: amount
    },
    function(err, charge) {
     
        // If error
    	if(err) {
    		res.send(500, err)
    	} else {
            // If successful push the cart object information to the purchased items object
            // for purchases history and documentation
    		
            // Create object to make it dynamic
            var pushObject = {
    			$push : {}
    		}

    		pushObject.$push['purchase_history'] = req.user.cart

    		console.log('push object and purchase history', pushObject, req.user.purchase_history)
    		User.findByIdAndUpdate(req.user._id,
    			pushObject, {upsert : true, new : true, safe : true}, function (err, user){
    				var clearCart = {
    					$set : {}
    				}

    				clearCart.$set['cart'] = {}

                    // Updates the cart to an empty object after it's values have been
                    // Pushed into the purchase history object
    				User.update({_id: req.user._id}, clearCart, function(err, user){
    					console.log(err, 'user', user)
    					// res.send(204)
    					res.redirect('/')
    				})

    			})
    	}

    });
}


// if (err) {
//     res.send(500, err);
// } else {
//     res.send(204);
// }



module.exports = {
	charge : charge
}