angular.module('Series', []).controller('SeriesController', function($scope, $http) {

	var mySeries = [];
	var watchlist = [];
	$scope.chunkedMySeries = [];
	$scope.chunkedSearchedSeries = [];
	$scope.chunkedWatchlist = [];
	$scope.searched = false;

	function chunkMySeries() {
		$scope.chunkedMySeries = chunk(mySeries, 4);
	}

	function chunkWatchlist() {
				$scope.chunkedWatchlist = chunk(watchlist, 4);
	}

	function pushFullSerie(serie) {
		if(!containsSerie(mySeries, serie)) {
		var promise = $http.get('https://omdbapi.com/?i=' + serie.imdbID + '&plot=full&apikey=93330d3c');

		promise.then(function(response) {
			var fullSerie = response.data;
				mySeries.push(fullSerie);
				chunkMySeries();
			}).catch(function(error) {
			console.log(error);
		});
		} else {
			alert('Esta série já está presente nas suas séries!');
		}
	};

	function chunk(arr, size) {
		var newArr = [];
		for (var i=0; i < arr.length; i+=size) {
			newArr.push(arr.slice(i, i+size));
		}
		return newArr;
	};

	function containsSerie(array, serie) {
		for (var i = 0; i < mySeries.length; i++) {
			if(mySeries[i].Title.toLowerCase() == serie.Title.toLowerCase()) {
				return true;
			}
		}
		return false;
	}

	function removeSerie(array, serie) {
		var index = array.indexOf(serie);
		if (index > -1) {
			array.splice(index, 1);
		}
	};

	$scope.addToMySeries = function(serie) {
			pushFullSerie(serie);
			$scope.removeFromWatchlist(serie);
	};

	$scope.removeFromMySeries = function(serie) {
		if(confirm("Tem certeza?")){
		removeSerie(mySeries, serie);
		chunkMySeries();
	}
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

	$scope.addToWatchlist = function(serie) {
		if(!containsSerie(watchlist, serie)) {
			console.log(serie.Title);
			watchlist.push(serie);
			chunkWatchlist();
		}
	};

	$scope.removeFromWatchlist = function(serie) {
		removeSerie(watchlist, serie);
		chunkWatchlist();
	}

	$scope.setLastEpisode = function(name, serie) {
		serie.LastEpisode = name;
	};

	$scope.setMyScore = function(score, serie) {
		serie.MyScore = score;
	}

});
