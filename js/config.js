angular.
	module('app').
		config(function ($routeProvider){

			$routeProvider
			.when('/',
			{
				templateUrl: "index.html",
				controller: "main"
			})

			.when('/howitworks', 
			{
				templateUrl: "howitworks.html",
				controller: "howitworks"
			})

		})