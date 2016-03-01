angular.module('cust', ['ngRoute', 'ngMaterial'] );


angular
	.module('cust')
		.controller('main', ['$scope', 'inventory', '$route', '$routeParams', '$location', function($scope, inventory, $route, $routeParams, $location){

			$scope.$route = $route;
			$scope.$location = $location;
			$scope.$routeParams = $routeParams;

			$scope.gamesLibrary = inventory.gamesLibrary;
			$scope.consoleLibrary = inventory.consoleLibrary;
			$scope.bundles = inventory.bundles;

			// console.log($routeParams)

			if($scope.$routeParams.console){
			$scope.activeConsole = _.find($scope.consoleLibrary, function(item){
				// console.log(item)
				// console.log($scope.$routeParams)
				return item.name === $scope.$routeParams.console

			})
			}
			// console.log($scope.activeConsole)
			// console.log($scope.gamesLibrary)
			// console.log($scope.consoleLibrary)
			// console.log($scope.bundles)


			// Add to Cart
			$scope.orderBox = true;

			$scope.basket = []
			$scope.orderItem = {}
			$scope.total = 0

			$scope.addToOrder = function(item){
				$scope.thisItem = item
				console.log($scope)
			}

			// Total Price
			$scope.totalPrice = function() {
			$scope.total = 0
			for (var i=0; i < $scope.basket.length; i++) {
				$scope.total += $scope.basket[i].price;
			}
				console.log($scope.total);
				return $scope.total;
			}






		}])

angular
	.module('cust')
		.controller('console', ['$scope', 'inventory', '$route', '$routeParams', '$location', function($scope, inventory, $route, $routeParams, $location){

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

			})}

			if($scope.$routeParams.console){
			$scope.gameList = _.filter($scope.gamesLibrary, function(item){
				console.log(item)
				console.log($scope.$routeParams)
				return item.console.indexOf($scope.$routeParams.console) > -1

			})}

			console.log($scope)

			console.log($scope.activeConsole)
			// console.log($scope.gamesLibrary)
			// console.log($scope.consoleLibrary)
			// console.log($scope.bundles)
		}])

angular
	.module('cust')
		.controller('game', ['$scope', 'inventory', '$route', '$routeParams', '$location', function($scope, inventory, $route, $routeParams, $location){

			$scope.$route = $route;
			$scope.$location = $location;
			$scope.$routeParams = $routeParams;

			$scope.gamesLibrary = inventory.gamesLibrary;
			$scope.consoleLibrary = inventory.consoleLibrary;
			$scope.bundles = inventory.bundles;

			console.log($routeParams)

			if($scope.$routeParams.game){
			$scope.activeGame = _.find($scope.gamesLibrary, function(item){
				console.log(item)
				console.log($scope.$routeParams)
				return item.name === $scope.$routeParams.game

			})
			}
			console.log($scope.activeConsole)
			// console.log($scope.gamesLibrary)
			// console.log($scope.consoleLibrary)
			// console.log($scope.bundles)

			// Add to Cart
			$scope.orderBox = true;

			$scope.basket = []
			$scope.orderItem = {}
			$scope.total = 0

		}])