angular.module('admin', ['ngRoute', 'ngMaterial', 'ngMessages', 'util'] );


angular
	.module('admin')
		.controller('main', ['$scope', '$http', 'inventory', '$route', '$routeParams', '$location', '$mdDialog', '$mdMedia', function($scope, $http, inventory, $route, $routeParams, $location, $mdDialog, $mdMedia){

			$scope.$route = $route;
			$scope.$location = $location;
			$scope.$routeParams = $routeParams;


		}])


angular
	.module('admin')
		.controller('inventory', ['$scope', '$http', 'inventory', '$route', '$routeParams', '$location', '$mdDialog', '$mdMedia', function($scope, $http, inventory, $route, $routeParams, $location, $mdDialog, $mdMedia){

			$scope.$route = $route;
			$scope.$location = $location;
			$scope.$routeParams = $routeParams;

			$scope.greeting = "please"

			$scope.selectedTab = 0;

		}])