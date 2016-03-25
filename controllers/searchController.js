var GameConsole = require('../models/consolemodel.js');
var Game = require('../models/videogamemodel.js');
var Accessory = require('../models/accessorymodel.js');


// For search functionality
function search (req, res) {

	// Creates a regular expression that is not case sensitive
	var searchQuery = new RegExp(req.body.search + '+', 'i')
	
	// Nested finds to make all of the objects come back async
	GameConsole.find({ name : {$regex : searchQuery}}, 
		function (err, consoles) {

			Game.find({ title : {$regex : searchQuery}},
				function(err, games){

					Accessory.find({ name : {$regex : searchQuery}},
						function(err, accessories){

							// Returns one big object to categorize search results
							res.send({consoles : consoles,
									 games : games, 
									 accessories : accessories})
							// res.send(consoles)
						})
				})
		})
}

// Send back key vlaues pairs to make 3 different categories


	


module.exports = {
	search : search
}