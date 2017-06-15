angular.module('Series', []).controller('SeriesController', function($scope, $http) {

	$scope.mySeries = [];
	$scope.chunkedMySeries = [];
	$scope.chunkedSearchedSeries = [];
	$scope.searched = false;

	function chunkMySeries() {
		$scope.chunkedMySeries = chunk($scope.mySeries, 4);
	}

	function pushFullSerie(serie) {
		var index = $scope.mySeries.indexOf(serie);

		var promise = $http.get('https://omdbapi.com/?i=' + serie.imdbID + '&plot=full&apikey=93330d3c');

		promise.then(function(response) {
			var fullSerie = response.data;
			if(!containsSerie($scope.mySeries, fullSerie)) {
				$scope.mySeries.push(fullSerie);
				chunkMySeries();
			}

		}).catch(function(error) {
			console.log(error);
		});
	};

	function chunk(arr, size) {
		var newArr = [];
		for (var i=0; i < arr.length; i+=size) {
			newArr.push(arr.slice(i, i+size));
		}
		return newArr;
	};

	function containsSerie(array, serie) {
		for (var i = 0; i > $scope.mySeries.length; i++) {
			if($scope.mySeries[i].Title == serie.Title) {
				return true;
			}
		}
		return false;
	}

	$scope.addToMySeries = function(serie) {
			pushFullSerie(serie);
	};

	$scope.removeFromMySeries = function(serie) {
		var index = $scope.mySeries.indexOf(serie);
		if (index > -1) {
			$scope.mySeries.splice(index, 1);
		}
		chunkMySeries();
	};

	$scope.titleFilter = function(title) {
		return function(serie) {
			if (!title){
				return true;
			}
			return serie.Title.toLowerCase().indexOf(title.toLowerCase()) != -1;
		}
	}

	$scope.getShortSeries = function(name) {
		var promise = $http.get('https://omdbapi.com/?s=' + name + '&type=series&apikey=93330d3c');
		promise.then(function(response) {
			$scope.searched = true;
			if(response.data.Response == 'True'){
				$scope.chunkedSearchedSeries = chunk(response.data.Search, 4);
			} else {
				$scope.chunkedSearchedSeries = [];
			}
		}).catch(function(error) {
			console.log(error);
		});
	};

	$scope.setLastEpisode = function(name, serie) {
		serie.LastEpisode = name;
	};

	$scope.setMyScore = function(score, serie) {
		serie.MyScore = score;
	}

});
