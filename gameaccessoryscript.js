var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/gamebyrd')

var Game = require('./models/videogamemodel.js')
var Accessory = require('./models/accessorymodel.js')
var GameConsole = require('./models/consolemodel.js')

var accessoryData = require('./accessory.json')
var gameData = require('./games.json')




	gameData.forEach(function(datum){
		// console.log(datum)
		GameConsole.findOne({name : datum.console}, function(err, foundConsole){
			console.log(err, foundConsole, datum.console);
			datum.console = foundConsole._id;
			(new Game(datum)).save(function(err, savedDatum){
			console.log(err)
		})
		})

	})

	accessoryData.forEach(function(datum){
		// console.log(datum)
		GameConsole.findOne({name : datum.console}, function(err, foundConsole){
			console.log(err, foundConsole, datum.console);
			datum.console = foundConsole._id;
			(new Accessory(datum)).save(function(err, savedDatum){
			console.log(err)
		})
		})

	})

// accessoryData.forEach(function(datum){
// 	(new Accessory(datum)).save(function(err, savedDatum){
// 		console.log(err)
// 	})
// })