angular.
	module('admin').
		config(function ($routeProvider){

			$routeProvider
			// Admin Routes
			.when('/',
			{
				templateUrl: "html/admin/dashboard.html",
				controller: "main"
			})

			.when('/inventory',
			{
				templateUrl: "html/admin/inventory.html",
				controller: "inventory"
			})

			.when('/receivables',
			{
				templateUrl: "html/admin/receivables.html",
				controller: "receivables"
			})

			.when('/fleet',
			{
				templateUrl: "html/admin/fleet.html",
				controller: "fleet"
			})

			.when('/activeorders',
			{
				templateUrl: "html/admin/activeorders.html",
				controller: "activeorders"
			})

})