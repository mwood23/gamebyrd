angular.module('cust', ['ngRoute', 'ngMaterial', 'ngMessages', 'n3-pie-chart', 'util'] );


angular
	.module('cust')
		.controller('main', ['$scope', '$rootScope', '$timeout', '$http', 'inventory', '$route', '$routeParams', '$location', '$mdDialog', '$mdMedia', function($scope, $rootScope, $timeout, $http, inventory, $route, $routeParams, $location, $mdDialog, $mdMedia){

			$scope.$route = $route;
			$scope.$location = $location;
			$scope.$routeParams = $routeParams;

			// For parallax images
			$scope.classics = inventory.classics
			$scope.newbies = inventory.newbies
			
			// Gets inventory to load single page app
			inventory.getGamesList().then(function(returnData){
					$scope.gamesList = returnData.data
				})	
			inventory.getConsolesList().then(function(returnData){
					$scope.consolesList = returnData.data
				})	

			inventory.getAccessoriesList().then(function(returnData){
					$scope.accessoriesList = returnData.data
				})	

			inventory.getTopGames().then(function(returnData){
					$scope.topGames = returnData.data
				})

			inventory.getTopConsoles().then(function(returnData){
					$scope.topConsoles = returnData.data
				})

			// Closes search after 1/2 second
			$scope.closeSearch = function() {$timeout(function() {
				$scope.showSearch = false
				$scope.search.search = ""
			}, 500)}

			if($scope.$routeParams.console){
			$scope.activeConsole = _.find($scope.consoleLibrary, function(item){
				return item.name === $scope.$routeParams.console
			})
			}

			// Async search query on a ng-change. Runs for each character typed.
			$scope.search = {search : ""}
			$scope.showSearch = false
			// For async search
			$scope.searchQuery = function(){
				if($scope.search.search.length > 3) {
				$http({
					method: 'POST',
					url   : 'api/search',
					data  : $scope.search
				}).then(function(returnData, err){
					$scope.searchResults = returnData.data
					$scope.showSearch = true

				})
			}
			
			// Closes search when string is less than 3 characters
			if($scope.search.search.length <= 3){
				$scope.searchResults = {}
				$scope.showSearch = false
			}
			}

			// Check to see if there is a user signed in
			// If so, show the basket and set data
			$http.get('/api/me')
			    .then(function(returnData){
			        if(returnData.data.user){
			           $rootScope.user = returnData.data.user;
			           $rootScope.currentUserSignedIn = true
			           $rootScope.cart = returnData.data
			        }
			        else {
			            // No user :(
			           console.log("no user")
			        }
			    })

			// EDIT CART

			// Buttons to edit cart
			$scope.editItem = function(value) {
				value.showEdit = true

			}

			// After edits are made saves to database so it has memory
			$scope.saveItem = function(value) {
				value.showEdit = false
				$http.post('/api/updateCart', value)
					.then(function(returnData, err){
						$http.get('/api/me')
						    .then(function(returnData){
						        if(returnData.data.user){
						           $rootScope.cart = returnData.data
						           $rootScope.user = returnData.data.user
						        }
						    })
				})
			}

				// Removes from DB and updates cart to remove dynamically
				$scope.deleteItem = function(value) {
					value.showEdit = false
					$http.post('/api/deleteItem', value)
						.then(function(returnData, err){
							$http.get('/api/me')
							    .then(function(returnData){
							        if(returnData.data.user){
							           $rootScope.cart = returnData.data
							           $rootScope.user = returnData.data.user
							        }
							    })
					})
				}


			// CHECKOUT

			// Confirm/update user information

			// Tabs for checkout flow
			$scope.tabTwoDisabled = true
			$scope.tabThreeDisabled = true

			$scope.max = 3;
			$scope.selectedIndex = 0;
			// Activates next tab on button click
			$scope.nextTab = function() {
			   var index = ($scope.selectedIndex == $scope.max) ? 0 : $scope.selectedIndex + 1;
			   $scope.selectedIndex = index;
			 };

			 $scope.confirmationTab = function() {
			 	$scope.tabThreeDisabled = false
			 	$scope.nextTab()
			 }
			
			// Updates users information async
			// Also used for the account dropdown button
			// the next tab functions does not have any adverse side effects
			$scope.updateUser = function() {
				$http.post('/api/updateUser', $rootScope.user)
					.then(function(returnData){
						$scope.tabTwoDisabled = false
						$scope.nextTab()
						Materialize.toast('Information updated!', 3000, 'success');
						// Send to next part of form
					})
			}


				// Add to cart
				$scope.addToCart = function(item) {

					if($rootScope.user) {
						// If there is not a user set cart to empty object
						if (!$rootScope.user.cart){
							$rootScope.user.cart = {}
						}

						// Rootscope because of nested modals
						var cart = $rootScope.user.cart

						// If the item is already in cart increment it
						if(cart[item._id]) {
							cart[item._id] += 1
						} else {
							cart[item._id] = 1
						}

						$http({
							method : 'POST',
							url    : '/api/addToCart',
							data   : cart,
						}).then(function(returnData){
							$http.get('/api/me')
							    .then(function(returnData){
							        	
							        	// Updates data to be reflected in cart and checkout
								        if(returnData.data.user){
								           $rootScope.cart = returnData.data
								           $rootScope.user = returnData.data.user
				                 	       Materialize.toast('Item added to cart', 3000, 'success');
								        }
							    })
						})
					} else {
						Materialize.toast('Please sign in to add to cart', 3000);
					}

				}

			// MODALS MODALS MODALS
			// For logging in
			$scope.showLogin = function(ev) {
				$mdDialog.show({
					controller: loginController,
					templateUrl: '../../html/cust/modals/login.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose:true,
					focusOnOpen: false
			    })
			};

			// For top charts
			$scope.showTopItem = function(ev, item) {
				$scope.thisItem = item
				
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
			    focusOnOpen: false,
			    fullscreen: useFullScreen
			})



			$scope.$watch(function() {
					return $mdMedia('xs') || $mdMedia('sm');
				}, function(wantsFullScreen) {
			    	$scope.customFullscreen = (wantsFullScreen === true);
			  	});

			};

			$scope.showTopConsoleItem = function(ev, item) {
				$scope.thisItem = item
				
				// This code make the modal full screen on small devices
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
				// This code right here

			  
			// Using locals to pass an object into the dialog
			$mdDialog.show({
				locals:{thisItem: $scope.thisItem},
			    controller: topItemController,
			    templateUrl: '../../html/cust/modals/consoletopitem.html',
			    parent: angular.element(document.body),
			    targetEvent: ev,
			    clickOutsideToClose:true,
			    focusOnOpen: false,
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
			function topItemController($scope, $rootScope, $mdDialog, thisItem) {

			// Make thisItem available on the modal
			$scope.thisItem = thisItem

			$scope.hide = function() {
			    $mdDialog.hide();
			};

			$scope.cancel = function() {
			    $mdDialog.cancel();
			};

			// Same as above but needed it in here because modals create
			// Their own controllers
			$scope.addToCart = function(item) {
				
				if($rootScope.user) {
					if (!$rootScope.user.cart){
						$rootScope.user.cart = {}
					}

					var cart = $rootScope.user.cart

					if(cart[item._id]) {
						cart[item._id] += 1
					} else {
						cart[item._id] = 1
					}

					$http({
						method : 'POST',
						url    : '/api/addToCart',
						data   : cart,
					}).then(function(returnData){
						$http.get('/api/me')
						    .then(function(returnData){
						        
							        if(returnData.data.user){
							           $rootScope.cart = returnData.data
							           $rootScope.user = returnData.data.user		                 	
			                 	       $mdDialog.hide()
			                 	       Materialize.toast('Item added to cart', 3000, 'success');
							        }
						    })
					})
				} else {
					Materialize.toast('Please sign in to add to cart', 3000);
				}

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
	              $http({
	                  method : 'POST',
	                  url    : '/signup',
	                  data   : $scope.signupForm
	              }).then(function(returnData){
	                  if ( returnData.data.success ) {
	                 	$http.get('/api/me')
	                 	    .then(function(returnData){
	                 	        if(returnData.data.user){
	                 	           $rootScope.cart = returnData.data
	                 	           $rootScope.user = returnData.data.user
	                 	        }
	                 	    })

	                 	$rootScope.currentUserSignedIn = true;
	              		$mdDialog.hide();
						    } else {
						    	Materialize.toast('Username taken/Enter valid email', 3000);
						   } }) 
	          	}
	          

	          $scope.login = function(){
	              $http({
	                  method : 'POST',
	                  url    : '/login',
	                  data   : $scope.loginForm
	              }).then(function(returnData){
	                  if ( returnData.data.user ) {
	                 	$http.get('/api/me')
	                 	    .then(function(returnData){
	                 	        if(returnData.data.user){
	                 	           $rootScope.cart = returnData.data
	                 	           $rootScope.user = returnData.data.user
	                 	        }
	                 	    })

	                 	$rootScope.currentUserSignedIn = true;
	              		$mdDialog.hide();
	              	} else {
	                  Materialize.toast('Wrong username/password', 3000);
	              	}
	              })
	          }
}

			// End controller MODALS MODALS MODALS


			

		}])

angular
	.module('cust')
		.controller('console', ['$scope', 'inventory', '$route', '$routeParams', '$location', function($scope, inventory, $route, $routeParams, $location){

			$scope.$route = $route;
			$scope.$location = $location;
			$scope.$routeParams = $routeParams;

			inventory.getConsolesList().then(function(returnData){
				$scope.consolesList = returnData.data
				})	
			
			inventory.getGamesList().then(function(returnData){
					$scope.gamesList = returnData.data
				})	

			inventory.getAccessoriesList().then(function(returnData){
					$scope.accessoriesList = returnData.data
				})	

			// Sets active console by searcing through the consoleslist
			// and seeing what one equals the routeparams
			if($scope.$routeParams.console){
			$scope.activeConsole = _.find($scope.consolesList, function(item){
				return item._id === $scope.$routeParams.console

			})}

			// Finds all games that pertain to that console
			if($scope.$routeParams.console){
			$scope.gameList = _.filter($scope.gamesList, function(item){
				return item.console.indexOf($scope.$routeParams.console) > -1
			})}

			// Accessories
			// Same as active console
			if($scope.$routeParams.console){
			$scope.accessoryList = _.filter($scope.accessoriesList, function(item){
				return item.console.indexOf($scope.$routeParams.console) > -1
			})}

			// n-3 pie charts data
			$scope.gauge_data = [
			  {label: "Rating", value: $scope.activeConsole.rating, suffix: "%", color: "#3C3B82"}
			];

			$scope.gauge_options = {thickness: 5, mode: "gauge", total: 100};

		}])

angular
	.module('cust')
		.controller('game', ['$scope', 'inventory', '$route', '$routeParams', '$location', function($scope, inventory, $route, $routeParams, $location){

			$scope.$route = $route;
			$scope.$location = $location;
			$scope.$routeParams = $routeParams;

			$scope.limit = 10

			inventory.getGamesList().then(function(returnData){
					$scope.gamesList = returnData.data
				})	

			inventory.getAccessoriesList().then(function(returnData){
					$scope.accessoriesList = returnData.data
				})	

			// Same as active console
			if($scope.$routeParams.game){
			$scope.activeGame = _.find($scope.gamesList, function(item){
				return item._id === $scope.$routeParams.game
			})}

			// Same as active console
			if($scope.$routeParams.game){
			$scope.gameList = _.filter($scope.gamesList, function(item){
				return item.console.indexOf($scope.activeGame.console) > -1
			})}

			// Accessories
			// Same as active console
			if($scope.$routeParams.game){
			$scope.accessoryList = _.filter($scope.accessoriesList, function(item){
				return item.console.indexOf($scope.activeGame.console) > -1
			})}

			// Same as above
			$scope.gauge_data = [
			  {label: "Rating", value: $scope.activeGame.rating, suffix: "%", color: "#3C3B82"}
			];

			$scope.gauge_options = {thickness: 5, mode: "gauge", total: 100};
			

		}])

angular
	.module('cust')
		.controller('accessory', ['$scope', 'inventory', '$route', '$routeParams', '$location', function($scope, inventory, $route, $routeParams, $location){

			$scope.$route = $route;
			$scope.$location = $location;
			$scope.$routeParams = $routeParams;

			$scope.limit = 10


			inventory.getGamesList().then(function(returnData){
					$scope.gamesList = returnData.data
				})	

			inventory.getAccessoriesList().then(function(returnData){
					$scope.accessoriesList = returnData.data
				})	

			// Same as active console
			if($scope.$routeParams.accessory){
			$scope.activeAccessory = _.find($scope.accessoriesList, function(item){
				return item._id === $scope.$routeParams.accessory
			})}

			// Same as active console
			if($scope.$routeParams.accessory){
			$scope.gameList = _.filter($scope.gamesList, function(item){
				return item.console.indexOf($scope.activeAccessory.console) > -1
			})}

			// Accessories
			// Same as active console
			if($scope.$routeParams.accessory){
			$scope.accessoryList = _.filter($scope.accessoriesList, function(item){
				return item.console.indexOf($scope.activeAccessory.console) > -1
			})}

			// Same as above
			$scope.gauge_data = [
			  {label: "Rating", value: $scope.activeAccessory.rating, suffix: "%", color: "#3C3B82"}
			];

			$scope.gauge_options = {thickness: 5, mode: "gauge", total: 100};
			

		}])