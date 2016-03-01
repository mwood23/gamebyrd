angular.module('admin', ['ngRoute', 'ngMaterial'] );


angular
	.module('admin')
		.controller('main', ['$scope', '$route', '$routeParams', '$location', function($scope, $route, $routeParams, $location){

			$scope.$route = $route;
			$scope.$location = $location;
			$scope.$routeParams = $routeParams;

			// $scope.gamesLibrary = inventory.gamesLibrary;
			// $scope.consoleLibrary = inventory.consoleLibrary;
			// $scope.bundles = inventory.bundles;

			// console.log($routeParams)

			// if($scope.$routeParams.console){
			// $scope.activeConsole = _.find($scope.consoleLibrary, function(item){
			// 	console.log(item)
			// 	console.log($scope.$routeParams)
			// 	return item.name === $scope.$routeParams.console

			// })}

			// if($scope.$routeParams.console){
			// $scope.gameList = _.filter($scope.gamesLibrary, function(item){
			// 	console.log(item)
			// 	console.log($scope.$routeParams)
			// 	return item.console.indexOf($scope.$routeParams.console) > -1

			// })}

			// console.log($scope)

			// console.log($scope.activeConsole)
			// // console.log($scope.gamesLibrary)
			// // console.log($scope.consoleLibrary)
			// // console.log($scope.bundles)
		}])