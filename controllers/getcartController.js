var User = require('../models/user.js');
var GameConsole = require('../models/consolemodel.js');
var Game = require('../models/videogamemodel.js');
var Accessory = require('../models/accessorymodel.js');


function getCart(req, res) {
	console.log('get cart fired')
	console.log(req.body)

	res.send({success : 'Item saved'})
}

function getUser(req, res){
	console.log(new Date())
    // Return the logged in user (or undefined if they are not logged in)
    if(req.user) {
	    var cartObject = req.user.cart
	    var cartItems = Object.keys(cartObject)
	    console.log(cartObject)
	    GameConsole.find({
		       '_id' : { $in : cartItems }
		    }, function(err, consoles){
		    	
		    	console.log(consoles)
		    	Game.find({ 
		    		'_id' : { $in : cartItems }
		    	},	function(err, games){
		    		

		    		for(var i = 0; i < games.length; i++){
		    			games[i].quantityOrdered = cartObject[games[i]._id]
		    			console.log('num ordered', cartObject[games[i]._id])
		    			// req.user.cart === games[i]._id 
		    		}

		    		console.log(games, 'game console')
		    		Accessory.find({
		    			'_id' : { $in : cartItems }
		    		}, function(err, accessories){
		    			console.log(accessories)	
		    			

		    			res.send({user:req.user,
		    					  consoles: consoles,
		    					  games: games,
		    					  accessories: accessories
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