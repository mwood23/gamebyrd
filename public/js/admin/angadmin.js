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
		.controller('additem', ['$scope', '$http', 'inventory', '$route', '$routeParams', '$location', '$mdDialog', '$mdMedia', function($scope, $http, inventory, $route, $routeParams, $location, $mdDialog, $mdMedia){

			$scope.$route = $route;
			$scope.$location = $location;
			$scope.$routeParams = $routeParams;

			$scope.greeting = "please"

			$scope.newGame = function() {
				console.log('newGame function fired')
			}

		$scope.newGame = function(){
		$http.post('/api/addGame', $scope.addGame)
			.then(function(returnData){
				$scope.games = $scope.games || []
				$scope.games.push(returnData.data)
				console.log(returnData)
				$scope.addGame = {}
			})
		}

		$scope.newConsole = function(){
			console.log($scope.newConsole)
			console.log($scope.addConsole)
		$http.post('/api/addConsole', $scope.addConsole)
			.then(function(returnData){
				$scope.consoles = $scope.consoles || []
				$scope.consoles.push(returnData.data)
				console.log(returnData)
				$scope.addConsole = {}
			})
		}

		$scope.newAccessory = function(){
		$http.post('/api/addAccessory', $scope.addAccessory)
			.then(function(returnData){
				$scope.accessories = $scope.accessories || []
				$scope.consoles.push(returnData.data)
				console.log(returnData)
				$scope.addAccessory = {}
			})
		}


		}])