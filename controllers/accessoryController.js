var Accessory = require('../models/accessorymodel.js');


// For backend use adding accessories to DB
function addAccessory (req, res) {
	var accessory = new Accessory ({
		name : req.body.name,
		alternative_name : req.body.alternative_name,
		rating : req.body.rating,
		release_date : req.body.release_date,
		picture : req.body.picture,
		quantity : req.body.quantity,
		received_by : req.body.received_by,
		received_date : req.body.received_date,
		console : req.body.console,
		comments : req.body.comments


	})
	accessory.save(function(err, savedAccessory){
			res.send(savedAccessory)
			console.log(savedAccessory)
		})

	console.log('at end of saved accessory controller')
	}
	


module.exports = {
	addAccessory : addAccessory
}