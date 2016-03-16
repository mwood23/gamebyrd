var GameConsole = require('../models/consolemodel.js');
var Game = require('../models/videogamemodel.js');
var Accessory = require('../models/accessorymodel.js');

// // Works, but not very well
// function search (req, res) {

//  console.log(req.body.search);
//  GameConsole.find({
//   $text:
//     {
//       $search: req.body.search,
//     }
// 	}, function(err, docs){
// 	    Game.find({
// 	      $text:
// 	        {
// 	          $search: req.body.search,
// 	        }
// 	    }, function(err, docs){
// 	    	console.log("through games", err)
// 	        Accessory.find({
// 	          $text:
// 	            {
// 	              $search: req.body.search,
// 	            }
// 	        }, function(err, docs){
// 	        	console.log("through accessories", err)
// 	            res.send(docs)
// 	            console.log(err, docs)
// 	        })

// 	    })
	    
// 	})
//  	console.log("At the end of search")
// 	}


// For search functionality
function search (req, res) {
	console.log(req.body.search)

	// Creates a regular expression that is not case sensitive
	var searchQuery = new RegExp(req.body.search + '+', 'i')
	
	// Nested finds to make all of the objects come back async
	GameConsole.find({ name : {$regex : searchQuery}}, 
		function (err, consoles) {

			console.log(consoles)
			Game.find({ title : {$regex : searchQuery}},
				function(err, games){

					console.log(games)
					Accessory.find({ name : {$regex : searchQuery}},
						function(err, accessories){

							// Returns one big object to categorize search results
							res.send({consoles : consoles,
									 games : games, 
									 accessories : accessories})
							// res.send(consoles)
							console.log(consoles, games, accessories)
						})
				})
		})
	console.log('at the end of search')
}

// Send back key vlaues pairs to make 3 different categories


	


module.exports = {
	search : search
}