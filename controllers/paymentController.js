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
     
    	if(err) {
    		res.send(500, err)
    	} else {
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

    				User.update({_id: req.user._id}, clearCart, function(err, user){
    					console.log(err, 'user', user)
    					// res.send(204)
    					res.redirect('/')
    				})

    			})
    	}


    	// var itemToDelete = "cart." + req.body._id

    	// var deleteObject = {
    	// 	$unset : {}
    	// }

    	// deleteObject.$unset[itemToDelete] = 1
    	
    	// 	User.update({_id: req.user._id}, deleteObject, function (err, user){
    	// 		console.log(err, 'user', user.cart)
    	// 				res.send(user)
    	// 			})




// 	var itemToUpdate = "cart." + req.body._id

// 	var updateObject = {
// 		$set : {}
// 	}

// 	updateObject.$set[itemToUpdate] = req.body.quantityOrdered
	
// 		User.findByIdAndUpdate(req.user._id,
// 				updateObject, {upsert:true, new: true}, function (err, user){
// 					console.log('user', user)
// 					res.send(user)
// 				})



// Contact.findByIdAndUpdate(
//         info._id,
//         {$push: {"messages": {title: title, msg: msg}}},
//         {safe: true, upsert: true, new : true},
//         function(err, model) {
//             console.log(err);
//         }
//     );

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