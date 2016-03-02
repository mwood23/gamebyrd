angular.module('admin', ['ngRoute', 'ngMaterial'] );


angular
	.module('admin')
		.controller('main', ['$scope', '$route', '$routeParams', '$location', function($scope, $route, $routeParams, $location){

			$scope.$route = $route;
			$scope.$location = $location;
			$scope.$routeParams = $routeParams;


		}])