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
				controller: "main"
				})

		})