var User = require('../models/user.js');

function updateCart(req, res) {
	// console.log('made it to updateCart', req.body, req.user)


	// Creates an object so properties can be passed dynamically into DC
	// Uses $set because the cart object will carry the other values that
	// are in the cart.
	var itemToUpdate = "cart." + req.body._id

	var updateObject = {
		$set : {}
	}

	updateObject.$set[itemToUpdate] = req.body.quantityOrdered
	
		User.findByIdAndUpdate(req.user._id,
				updateObject, {upsert:true, new: true}, function (err, user){
					console.log('user', user)
					res.send(user)
				})
}

function deleteItem(req, res) {
	console.log('made it to deleteItem')

	// Similar to above, uses $unset to remove one object key
	// Passed in as an object to keep it dynamic basked on the item's ID
	var itemToDelete = "cart." + req.body._id

	var deleteObject = {
		$unset : {}
	}

	deleteObject.$unset[itemToDelete] = 1
	
		User.update({_id: req.user._id}, deleteObject, function (err, user){
			console.log(err, 'user', user.cart)
					res.send(user)
				})
	
}


module.exports = {
	updateCart : updateCart,
	deleteItem : deleteItem
}