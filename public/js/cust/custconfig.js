angular.
	module('cust').
		config(function ($routeProvider){

			$routeProvider
			.when('/',
			{
				templateUrl: "html/cust/home.html",
				controller: "main"
			})
			// Customer Routes
			.when('/faqs', 
			{
				templateUrl: "html/cust/faqs.html",
				controller: "main"
			})

			.when('/consoles/:console',
			{
				templateUrl: "html/cust/consoleTemplate.html",
				controller: "console"
			})

			.when('/games/:game',
			{
				templateUrl: "html/cust/gamesTemplate.html",
				controller: "game"
			})

			.when('/checkout',
			{
				templateUrl: "html/cust/checkout.html",
				controller: "checkout"
			})

		})