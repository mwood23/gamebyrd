angular.module('util', ['ngRoute', 'ngMaterial'] );


angular
	.module('util')
		.controller('main', ['$scope', '$route', '$routeParams', 'inventory', '$location', function($scope, $route, $routeParams, inventory, $location){

			$scope.$route = $route;
			$scope.$location = $location;
			$scope.$routeParams = $routeParams;


		}])