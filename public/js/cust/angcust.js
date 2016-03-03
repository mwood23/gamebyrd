angular.module('cust', ['ngRoute', 'ngMaterial', 'ngMessages', 'util'] );


angular
	.module('cust')
		.controller('main', ['$scope', '$http', 'inventory', '$route', '$routeParams', '$location', '$mdDialog', '$mdMedia', function($scope, $http, inventory, $route, $routeParams, $location, $mdDialog, $mdMedia){

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

			// MODALS MODALS MODALS
			  $scope.showTabDialog = function(ev) {
			    $mdDialog.show({
			      controller: DialogController,
			      templateUrl: '../../html/cust/modals/login.html',
			      parent: angular.element(document.body),
			      targetEvent: ev,
			      clickOutsideToClose:true
			    })
			        // .then(function(answer) {
			        //   $scope.status = 'You said the information was "' + answer + '".';
			        // }, function() {
			        //   $scope.status = 'You cancelled the dialog.';
			        // });
			  };

			function DialogController($scope, $mdDialog) {
			  $scope.hide = function() {
			    $mdDialog.hide();
			  };

			  $scope.cancel = function() {
			    $mdDialog.cancel();
			  };

			  // $scope.answer = function(answer) {
			  //   $mdDialog.hide(answer);
			  // };
			}

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

		// Login and SignUp
		$scope.signup = function(){
			console.log('sign up before AJAX')
            $http({
                method : 'POST',
                url    : '/signup',
                data   : $scope.signupForm
            }).then(function(returnData){
                console.log(returnData)
                if ( returnData.data.success ) { window.location.href="/dashboard" }
            })
        }

        $scope.login = function(){
            $http({
                method : 'POST',
                url    : '/login',
                data   : $scope.loginForm
            }).then(function(returnData){
                if ( returnData.data.success ) { window.location.href="/dashboard" } 
                else { console.log(returnData)}
            })
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