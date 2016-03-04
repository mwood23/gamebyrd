angular.
	module('admin').
		config(function ($routeProvider){

			$routeProvider
			.when('/',
			{
				templateUrl: "html/admin/dashboard.html",
				controller: "main"
			})

			.when('/additem',
			{
				templateUrl: "html/admin/additem.html",
				controller: "additem"
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