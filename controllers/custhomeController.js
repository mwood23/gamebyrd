var Game = require('../models/videogamemodel.js');
var Accessory = require('../models/accessorymodel.js');
var GameConsole = require('../models/consolemodel.js');


// Loads in all of the games, accessories, and consoles from the DB
function getGamesList (req, res){

	Game.find({}, function(err, docs){
		res.send(docs)
	})
}

function getConsolesList (req, res){

	GameConsole.find({}, function(err, docs){
		res.send(docs)
	})
}

function getAccessoriesList (req, res){

	Accessory.find({}, function(err, docs){
		res.send(docs)
	})
}

// Loads in the top 10 rated games and consoles using DB filters
function getTopGames (req, res){
	Game.find().sort({ rating: -1 }).limit(10).exec( function (err, docs) {
		res.send(docs)
	})

}

function getTopConsoles (req, res){

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