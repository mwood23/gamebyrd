angular.
	module('cust').
		config(function ($routeProvider){

// Do not camel case, will ruin deployment

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
				templateUrl: "html/cust/consoletemplate.html",
				controller: "console"
			})

			.when('/games/:game',
			{
				templateUrl: "html/cust/gamestemplate.html",
				controller: "game"
			})

			.when('/accessories/:accessory',
			{
				templateUrl: "html/cust/accessorytemplate.html",
				controller: "accessory"
			})

			.when('/checkout',
			{
				templateUrl: "html/cust/checkout.html",
				controller: "main"
			})

			.when('/contactus',
			{
				templateUrl: "html/cust/contactus.html",
				controller: "main"
			})

			.when('/account',
			{
				templateUrl: "html/cust/account.html",
				controller: "main"
			})

		})