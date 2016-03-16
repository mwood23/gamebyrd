var User = require('../models/user.js');
var GameConsole = require('../models/consolemodel.js');
var Game = require('../models/videogamemodel.js');
var Accessory = require('../models/accessorymodel.js');


function getCart(req, res) {
	console.log('get cart fired')
	console.log(req.body)

	res.send({success : 'Item saved'})
}


// Ran everytime something happens with a user to make sure nothing happens during 
// shopping process.

function getUser(req, res){
	console.log(new Date())
    // Return the logged in user (or undefined if they are not logged in)
    if(req.user) {

    	// Set cart object to variable
	    var cartObject = req.user.cart
	    console.log(cartObject)

	    // Use Object.keys to put the key names into an array
	    var cartItems = Object.keys(cartObject)
	    console.log(cartObject)
	    
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


		    	console.log(consoles)
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
		    					console.log(consoleSubTotal)
		    				}

		    				for (var i = 0; i < games.length; i++){
		    					gameSubTotal += games[i].subTotal
		    					console.log(gameSubTotal)
		    				}

		    				for (var i = 0; i < accessories.length; i++){
		    					accessorySubTotal += accessories[i].subTotal
		    					console.log(accessorySubTotal)
		    				}

		    				// Assign the subtotal to req.user.subTotal
		    				var subTotal = consoleSubTotal + gameSubTotal + accessorySubTotal
		    				console.log('req.user', req.user.subTotal)

		    					User.findByIdAndUpdate(req.user._id, 
		    						{ $set: {subTotal : subTotal,
		    							}}, {upsert:true, new: true}, function (err, user){
		    							console.log(err, user)
		    							
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