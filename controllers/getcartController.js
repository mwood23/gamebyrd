var User = require('../models/user.js');
var GameConsole = require('../models/consolemodel.js');
var Game = require('../models/videogamemodel.js');
var Accessory = require('../models/accessorymodel.js');


function getCart(req, res) {

	res.send({success : 'Item saved'})
}


// Ran everytime something happens with a user to make sure nothing happens during 
// shopping process.


// The cart is actually an object stored on the user. That is to make sure
// there are no duplicate items. In order to get the cart to show in a user
// Friendly way this function runs which parses out the object's keys (_ids)
// And returns the object plus the quantity order to be ng-repeated over on
// the front end.

function getUser(req, res){
    // Return the logged in user (or undefined if they are not logged in)
    if(req.user) {

    	// Set cart object to variable
	    var cartObject = req.user.cart

	    // Use Object.keys to put the key names into an array
	    var cartItems = Object.keys(cartObject)
	    
	    // Finds game consoles with the id
	    GameConsole.find({
		       '_id' : { $in : cartItems }
		    }, function(err, consoles){
		    	
		    	// Add quantity ordered property to the consoles object that will be returned
		    	for(var i = 0; i < consoles.length; i++){
		    		consoles[i].quantityOrdered = cartObject[consoles[i]._id]
		    	}

		    	// Add subtotal to the consoles object that will be returned
		    	for(var i = 0; i < consoles.length; i++) {
		    		consoles[i].subTotal = (consoles[i].quantityOrdered * consoles[i].price)
		    	}


		    	Game.find({ 
		    		'_id' : { $in : cartItems }
		    	},	function(err, games){
		    		

		    		for(var i = 0; i < games.length; i++){
		    			games[i].quantityOrdered = cartObject[games[i]._id]
		    			// console.log('num ordered', cartObject[games[i]._id])
		    			// req.user.cart === games[i]._id 
		    		}

		    		for(var i = 0; i < games.length; i++) {
		    			games[i].subTotal = (games[i].quantityOrdered * games[i].price)
		    		}

		    		// console.log(games, 'game console')
		    		Accessory.find({
		    			'_id' : { $in : cartItems }
		    		}, function(err, accessories){
		    			// console.log(accessories)	

		    			for(var i = 0; i < accessories.length; i++){
		    				accessories[i].quantityOrdered = cartObject[accessories[i]._id]
		    			}

		    			for(var i = 0; i < accessories.length; i++) {
		    				accessories[i].subTotal = (accessories[i].quantityOrdered * accessories[i].price)
		    			}

		    			// Calculating subtotal of all items and assigning it to user
		    			
		    				var consoleSubTotal = 0
		    				var gameSubTotal = 0
		    				var accessorySubTotal = 0
		    				
		    				for (var i = 0; i < consoles.length; i++){
		    					consoleSubTotal += consoles[i].subTotal
		    				}

		    				for (var i = 0; i < games.length; i++){
		    					gameSubTotal += games[i].subTotal
		    				}

		    				for (var i = 0; i < accessories.length; i++){
		    					accessorySubTotal += accessories[i].subTotal
		    				}

		    				// Assign the subtotal to req.user.subTotal
		    				var subTotal = consoleSubTotal + gameSubTotal + accessorySubTotal

		    					User.findByIdAndUpdate(req.user._id, 
		    						{ $set: {subTotal : subTotal,
		    							}}, {upsert:true, new: true}, function (err, user){
		    							
		    							// Returns the user, consoles, games, and accessories
		    							res.send({user:user,
		    									  consoles: consoles,
		    									  games: games,
		    									  accessories: accessories,
		    									})
		    						})
		    				
		    			
		    		})
		    })
	    })
	} else {
		res.send({noUser : 'No user'})
	}

}



module.exports = {
	getCart : getCart,
	getUser : getUser

}