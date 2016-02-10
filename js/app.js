angular.module('app', ['ngRoute']);


angular
	.module('app')
		.controller('main', ['$scope', 'inventory', '$route', '$routeParams', '$location', function($scope, inventory, $route, $routeParams, $location){

			$scope.$route = $route;
			$scope.$location = $location;
			$scope.$routeParams = $routeParams;

			$scope.gamesLibrary = inventory.gamesLibrary;
			$scope.consoleLibrary = inventory.consoleLibrary;
			$scope.bundles = inventory.bundles;

			console.log($routeParams)

			if($scope.$routeParams.console){
			$scope.activeConsole = _.find($scope.consoleLibrary, function(item){
				console.log(item)
				console.log($scope.$routeParams)
				return item.name === $scope.$routeParams.console

			})
		}

			console.log($scope.activeConsole)

			


			// console.log($scope.gamesLibrary)
			// console.log($scope.consoleLibrary)
			// console.log($scope.bundles)



		}])