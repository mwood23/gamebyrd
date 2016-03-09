angular.module('cust', ['ngRoute', 'ngMaterial', 'ngMessages', 'util'] );


angular
	.module('cust')
		.controller('main', ['$scope', '$rootScope', '$http', 'inventory', '$route', '$routeParams', '$location', '$mdDialog', '$mdMedia', function($scope, $rootScope, $http, inventory, $route, $routeParams, $location, $mdDialog, $mdMedia){

			$scope.$route = $route;
			$scope.$location = $location;
			$scope.$routeParams = $routeParams;
			
			inventory.getGamesList().then(function(returnData){
					$scope.gamesList = returnData.data
					console.log($scope.gamesList)
				})	
			inventory.getConsolesList().then(function(returnData){
					$scope.consolesList = returnData.data
					console.log($scope.consolesList)
				})	

			inventory.getTopGames().then(function(returnData){
					$scope.topGames = returnData.data
					console.log($scope.topGames)
				})

			inventory.getTopConsoles().then(function(returnData){
					$scope.topConsoles = returnData.data
					console.log($scope.topConsoles)
				})


			// console.log($scope.topGames)
			// console.log($scope.topConsoles)

			if($scope.$routeParams.console){
			$scope.activeConsole = _.find($scope.consoleLibrary, function(item){
				// console.log(item)
				// console.log($scope.$routeParams)
				return item.name === $scope.$routeParams.console

			})
			}

			$scope.search = ""
			console.log($scope.search)

			// For async search
			$http({
				method: 'POST',
				url   : 'api/search',
				data  : $scope.search
			}).then(function(returnData){
				$scope.searchResults = returnData.data.items
			}
			)

			$http.get('/api/me')
			    .then(function(returnData){
			        if(returnData.data.user){
			           console.log(returnData)
			           $rootScope.user = returnData.data.user;
			           $rootScope.currentUserSignedIn = true;
			        }
			        else {
			            // No user :(
			           console.log("no user")
			        }
			    })




			// MODALS MODALS MODALS
			// For logging in
			$scope.showLogin = function(ev) {
				$mdDialog.show({
					controller: loginController,
					templateUrl: '../../html/cust/modals/login.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose:true
			    })
			};



			// For top charts
			$scope.showTopItem = function(ev, item) {
				$scope.thisItem = item
				console.log($scope)
				console.log($scope.thisItem)
				
				// This code make the modal full screen on small devices
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
				// This code right here

			  
			// Using locals to pass an object into the dialog
			$mdDialog.show({
				locals:{thisItem: $scope.thisItem},
			    controller: topItemController,
			    templateUrl: '../../html/cust/modals/topitem.html',
			    parent: angular.element(document.body),
			    targetEvent: ev,
			    clickOutsideToClose:true,
			    fullscreen: useFullScreen
			})



			$scope.$watch(function() {
					return $mdMedia('xs') || $mdMedia('sm');
				}, function(wantsFullScreen) {
			    	$scope.customFullscreen = (wantsFullScreen === true);
			  	});

			};

			// Controllers for MODALS MODALS MODALS
			// Injected this item to give me access to it on modal
			function topItemController($scope, $mdDialog, thisItem) {

			// Make thisItem available on the modal
			$scope.thisItem = thisItem

			$scope.hide = function() {
			    $mdDialog.hide();
			};

			$scope.cancel = function() {
			    $mdDialog.cancel();
			};

			$scope.addToCart = function(item) {
				var cartData = {
					itemID : item._id,
					user : $rootScope.user._id
				}
				console.log(cartData)
				$http({
					method : 'POST',
					url    : '/api/addToCart',
					data   : cartData,
				}).then(function(returnData){
					console.log(returnData.data.success)
				})
			}

			}

			function loginController($scope, $rootScope, $mdDialog) {
			  $scope.hide = function() {
			    $mdDialog.hide();
			  };

			  $scope.cancel = function() {
			    $mdDialog.cancel();
			  };

	  		// Login and SignUp
	  		$scope.signup = function(){
	  			console.log('sign up before AJAX')
	              $http({
	                  method : 'POST',
	                  url    : '/signup',
	                  data   : $scope.signupForm
	              }).then(function(returnData){
	                  console.log(returnData)
	                  if ( returnData.data.success ) { window.location.href="/#/" }
	              })
	          }

	          $scope.login = function(){
	              $http({
	                  method : 'POST',
	                  url    : '/login',
	                  data   : $scope.loginForm
	              }).then(function(returnData){
	              		console.log(returnData)
	                  if ( returnData.data.user ) {
	                  	$rootScope.user = returnData.data.user;
	                 	$rootScope.currentUserSignedIn = true;
	              		console.log($scope.user)
	              		console.log($rootScope.currentUserSignedIn)
	              		console.log($rootScope.currentUserSignedIn)

	              		$mdDialog.hide();
	              	}

	                  else { console.log(returnData)}
	              })
	          }

			}

			// End controller MODALS MODALS MODALS

			// Add to Cart
			$scope.orderBox = true;

			$scope.basket = []
			$scope.orderItem = {}
			$scope.total = 0

			$scope.addToOrder = function(item){
				$scope.thisItem = item
				console.log($scope)
				console.log($scope.thisItem)
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

			console.log($routeParams)

			inventory.getConsolesList().then(function(returnData){
				$scope.consolesList = returnData.data
				console.log($scope.consolesList)
				})	
			inventory.getGamesList().then(function(returnData){
					$scope.gamesList = returnData.data
					console.log($scope.gamesList)
				})	

			if($scope.$routeParams.console){
			$scope.activeConsole = _.find($scope.consolesList, function(item){
				console.log(item)
				console.log($scope.$routeParams)
				return item._id === $scope.$routeParams.console

			})}

			if($scope.$routeParams.console){
			$scope.gameList = _.filter($scope.gamesList, function(item){
				console.log(item)
				console.log($scope.$routeParams)
				return item.console.indexOf($scope.$routeParams.console) > -1

			})}

			console.log($scope.gamesList)

			// console.log($scope)
			// console.log($scope.activeConsole)
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

			console.log($routeParams)

			inventory.getGamesList().then(function(returnData){
					$scope.gamesList = returnData.data
					console.log($scope.gamesList)
				})	

			if($scope.$routeParams.game){
			$scope.activeGame = _.find($scope.gamesList, function(item){
				console.log(item)
				console.log($scope.$routeParams)
				return item.title === $scope.$routeParams.game

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