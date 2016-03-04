var Game = require('../models/videogamemodel.js');

function addGame (req, res) {
	var game = new Game ({
		name : req.body.name,
		alternative_name : req.body.alternative_name,
		rating : req.body.rating,
		release_dates : req.body.release_dates,
		companies : req.body.companies,
		cover : req.body.cover,
		screenshots : req.body.screenshots,
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