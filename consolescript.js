var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/translator')

var GameConsole = require('./models/consolemodel.js')

var seedData = require('./consoles.json')

seedData.forEach(function(datum){
	(new GameConsole(datum)).save(function(err, savedDatum){
		console.log(err)
	})
})