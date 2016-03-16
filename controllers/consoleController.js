var GameConsole = require('../models/consolemodel.js');


// need to fix

// For adding consoles on the admin side
function addConsole (req, res) {
	var gameConsole = new GameConsole ({
		name : req.body.name,
		alternative_name : req.body.alternative_name,
		rating : req.body.rating,
		release_date : req.body.release_date,
		picture : req.body.picture,
		quantity : req.body.quantity,
		received_by : req.body.received_by,
		received_date : req.body.received_date,
		comments : req.body.comments


	})
	gameConsole.save(function(err, savedgameConsole){
			res.send(savedgameConsole)
			console.log(savedgameConsole)
		})

	console.log('at end of saved console controller')
	}
	


module.exports = {
	addConsole : addConsole
}