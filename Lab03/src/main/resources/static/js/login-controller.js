angular.module('Series').controller('LoginController', ['$scope', '$http', '$state', 'RESTService','SeriesRepository', RegisterController]);

function RegisterController($scope, $http,$state , RESTService, SeriesRepository) {
	$scope.user = {};

	$scope.login = function(user) {
		promise = RESTService.login(user);
		promise.then(function(response) {
			user = response.data;
			SeriesRepository.setUser(user);
			$state.transitionTo('series.search');
		}).catch(function(error) {
			alert("Usuario nao cadastrado ou senha invalida!");
		});
	};

};