var Game = require('../models/videogamemodel.js');

// Adding games on admin side
// need to fix
function addGame (req, res) {
	var game = new Game ({
		title : req.body.title,
		keywordsT : req.body.keywords.split(", "),
		rating : req.body.rating,
		console : req.body.console,
		cover : req.body.cover,
		screenshots : req.body.screenshots.split(", "),
		quantity : req.body.quantity,
		received_by : req.body.received_by,
		received_date : req.body.received_date,
		comments : req.body.comments


	})
	game.save(function(err, savedGame){
			res.send(savedGame)
			console.log(savedGame)
		})

	console.log('at end of saved game controller')
	}
	


module.exports = {
	addGame : addGame
}