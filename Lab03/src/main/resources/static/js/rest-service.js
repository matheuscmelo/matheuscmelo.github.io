angular.module('Series').service('RESTService', function($http) {

  this.getShortSeries = getShortSeries;
  this.getFullSerie = getFullSerie;
  this.registerUser = registerUser;

  function getShortSeries(name) {
  		var promise = $http.get('https://omdbapi.com/?s=' + name + '&type=series&apikey=93330d3c');
  		return promise;
  	};

    function getFullSerie(serie) {
      var promise = $http.get('https://omdbapi.com/?i=' + serie.imdbID + '&plot=full&apikey=93330d3c');
      return promise;
    };

    function registerUser(user) {
      var promise = $http.post('api/user/register/', user);
      return promise;
    };

});
