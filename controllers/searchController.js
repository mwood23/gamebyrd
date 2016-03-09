var GameConsole = require('../models/consolemodel.js');
var Game = require('../models/consolemodel.js');
var Accessory = require('../models/consolemodel.js');


function search (req, res) {

	
 GameConsole.find({
  $text:
    {
      $search: req.body.search,
    }
	}, function(err, docs){
	    Game.find({
	      $text:
	        {
	          $search: req.body.search,
	        }
	    }, function(err, docs){
	        Accessory.find({
	          $text:
	            {
	              $search: req.body.search,
	            }
	        }, function(err, docs){
	            res.send(docs)
	            console.log(err, docs)
	        })

	    })

})
 	console.log("At the end of search")
	}
	


module.exports = {
	search : search
}