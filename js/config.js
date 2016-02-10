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
				controller: "howitworks"
			})

			.when('/consoles/:console',
				{
				templateUrl: "consoleTemplate.html",
				controller: "item"
				})

			.when('/games/:game',
				{
				templateUrl: "gameTemplate.html",
				controller: "item"
				})

		})