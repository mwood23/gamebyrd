angular.module('app', []);

angular
	.module('app')
		.controller('main', ['$scope', function($scope){
			$scope.greeting = "hello"

		}])