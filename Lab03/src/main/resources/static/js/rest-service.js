angular.module('Series').service('RESTService', function($http) {

  this.getShortSeries = getShortSeries;
  this.getFullSerie = getFullSerie;
  this.registerUser = registerUser;
  this.login = login;
  this.addToMySeries = addToMySeries;
  this.addToWatchlist = addToWatchlist;
  this.removeFromMySeries = removeFromMySeries;
  function getShortSeries(name) {
  		var promise = $http.get('https://omdbapi.com/?s=' + name + '&type=series&apikey=93330d3c');
  		return promise;
  	};

    function getFullSerie(serie) {
      var promise = $http.get('https://omdbapi.com/?i=' + serie.imdbID + '&apikey=93330d3c');
      return promise;
    };

    function registerUser(user) {
      var promise = $http.post('api/user/register/', user);
      return promise;
    };
    
    function login(user) {
    	var promise = $http.post('api/user/validate/', user);
        return promise;
    };
    
    function addToMySeries(id, serie) {
    	$http.put('api/user/id/' + id + '/series/', serie);
    };
    
    function addToWatchlist(id, serie) {
    	$http.put('api/user/id/' + id + '/watchlist/', serie);
    };
    
    function removeFromMySeries(id, serie) {
    	$http.delete('api/user/id/' + id + '/series/' + serie);
    };

});
