var Game = require('../models/videogamemodel.js');
var Accessory = require('../models/accessorymodel.js');
var GameConsole = require('../models/consolemodel.js');

function getGamesList (req, res){
	console.log('get games list fires')

	Game.find({}, function(err, docs){
		res.send(docs)
	})
}

function getConsolesList (req, res){
	console.log('get consoles list fires')

	GameConsole.find({}, function(err, docs){
		res.send(docs)
	})
}

function getAccessoriesList (req, res){
	console.log('get accessories list fires')

	Accessory.find({}, function(err, docs){
		res.send(docs)
	})
}

function getTopGames (req, res){
	console.log('getTopGames fires')

	Game.find().sort({ rating: -1 }).limit(10).exec( function (err, docs) {
		res.send(docs)
	})

}

function getTopConsoles (req, res){
	console.log('getTopConsoles fires')

	GameConsole.find().sort({ rating: -1 }).limit(10).exec( function (err, docs) {
		res.send(docs)
	})

}

module.exports = {
	getGamesList : getGamesList,
	getConsolesList : getConsolesList,
	getAccessoriesList : getAccessoriesList,
	getTopGames : getTopGames,
	getTopConsoles : getTopConsoles
}		