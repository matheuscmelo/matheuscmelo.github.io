angular.module('Series').controller('RegisterController', ['$scope', '$http', 'RESTService', RegisterController]);

function RegisterController($scope, $http, RESTService) {
	$scope.user = {};

	$scope.registerUser = function(user) {
		promise = RESTService.registerUser(user);
		promise.then(function(response) {
			user = response.data;
		});
	};

};