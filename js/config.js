angular.
	module('app').
		config(function ($routeProvider){

			$routeProvider
			.when('/',
			{
				templateUrl: "home.html",
				controller: "main"
			})

			.when('/howitworks', 
			{
				templateUrl: "howitworks.html",
				controller: "main"
			})

			.when('/consoles/:console',
				{
				templateUrl: "consoleTemplate.html",
				controller: "console"
				})

			.when('/games/:game',
				{
				templateUrl: "gamesTemplate.html",
				controller: "game"
				})

		})