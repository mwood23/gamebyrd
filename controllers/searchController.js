var GameConsole = require('../models/consolemodel.js');
var Game = require('../models/consolemodel.js');
var Accessory = require('../models/consolemodel.js');

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

function search (req, res) {
	console.log(req.body.search)
	var searchQuery = new RegExp(req.body.search + '+', 'i')
	

	GameConsole.find({ name : {$regex : searchQuery}}, function (err, docs) {
		res.send(docs)
		console.log(docs, err)
	}

	)
}

// Send back key vlaues pairs to make 3 different categories


	


module.exports = {
	search : search
}