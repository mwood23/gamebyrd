var User = require('../models/user.js');

function updateCart(req, res) {
	// console.log('made it to updateCart', req.body, req.user)

	var itemToUpdate = "cart." + req.body._id
	var passMeIn = itemToUpdate.toString()
	console.log('itemtoupdate', itemToUpdate, passMeIn)
	var test = 'cart.56e0707a8f9574722b0b46c5'

	// var action = {}
	// var variable = "cart" + req.body._id
	// action[variable] = req.body._id
	// console.log(action[variable])

	
		User.findByIdAndUpdate(req.user._id,
				{ $set: { test : req.body.quantityOrdered, 
				}}, {upsert:true, new: true}, function (err, user){
					console.log('test', test)
					console.log('user', user)
					res.send(user)
				})
}

function deleteItem(req, res) {
	console.log('made it to deleteItem', req.body)
	
	// User.findByIdAndUpdate(req.user._id, 
	// 	{ $set: {first_name : req.body.first_name,
	// 			 last_name  : req.body.last_name,
	// 			 email      : req.body.email,
	// 			 address    : req.body.address,
	// 			 city       : req.body.city,
	// 			 state      : req.body.state,
	// 			 zip_code   : req.body.zip_code,
	// 			 mobile_phone : req.body.mobile_phone
	// 	}}, {upsert:true, new: true}, function (err, user){
	// 		console.log(err, user)
	// 		res.send(user)
	// 	})
}



module.exports = {
	updateCart : updateCart,
	deleteItem : deleteItem
}