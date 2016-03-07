angular.
	module('util').
		factory('inventory', ['$http', function($http) {

			var topGames = []
			var topConsoles = []
			var gamesList = []
			var consolesList = []
			var accessoriesList = []

			getGamesList = function(){
				return $http.get('/getGamesList')
			}

			getConsolesList = function(){
				return $http.get('/getConsolesList')
			}

			getAccessoriesList = function(){
				return $http.get('/getAccessoriesList')
			}

			getTopGames = function(){
				return $http.get('/getTopGames')
				
			}

			getTopConsoles = function(){
				return $http.get('/getTopConsoles')
			}

			// Bundles

			return	{
				getGamesList : getGamesList,
				getConsolesList : getConsolesList,
				getAccessoriesList : getAccessoriesList,
				getTopGames : getTopGames,
				getTopConsoles : getTopConsoles
			}

}])
