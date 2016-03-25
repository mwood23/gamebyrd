var User = require('../models/user.js');
var config = require('../config.js')
var stripe = require('stripe')(config.testSecretKey)
var twilio = require('twilio')(config.account_sid, config.auth_token)



// Calls to Strip to charge user
function charge(req, res) {

	// Stripe token on the body to the post
    var stripeToken = req.body.stripeToken;
    var amount = req.user.subTotal * 100;

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

    		User.findByIdAndUpdate(req.user._id,
    			pushObject, {upsert : true, new : true, safe : true}, function (err, user){
    				var clearCart = {
    					$set : {}
    				}

    				clearCart.$set['cart'] = {}

                    // Updates the cart to an empty object after it's values have been
                    // Pushed into the purchase history object
    				User.update({_id: req.user._id}, clearCart, function(err, user){
    					

                        //Send an SMS text message
                        twilio.sendMessage({

                            to: '+1' + req.user.mobile_phone, // Any number Twilio can deliver to
                            from: '+13364432018', // A number you bought from Twilio and can use for outbound communication
                            body: 'Hey ' + req.user.first_name + ', thank you for your order! Your order number is <test>. Be on the lookout for your order around 4:30! We will send another message with a tracking link when it ships' // body of the SMS message

                        }, function(err, responseData) { //this function is executed when a response is received from Twilio

                            if (!err) { // "err" is an error received during the request, if any

                                // "responseData" is a JavaScript object containing data received from Twilio.
                                // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                                // http://www.twilio.com/docs/api/rest/sending-sms#example-1

                                res.redirect('/success')

                            } else {
                                res.send({error : "Something went wrong!"})
                            }
                        });

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