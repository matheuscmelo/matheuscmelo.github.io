angular.module('Series').controller('RegisterController', ['$scope', '$http', '$state', 'RESTService','SeriesRepository', RegisterController]);

function RegisterController($scope, $http,$state , RESTService, SeriesRepository) {
	$scope.user = {};

	$scope.registerUser = function(user) {
		promise = RESTService.registerUser(user);
		promise.then(function(response) {
			user = response.data;
			SeriesRepository.setUser(user);
			SeriesRepository.printUser();
			$state.transitionTo('series.search');
		});
	};

};