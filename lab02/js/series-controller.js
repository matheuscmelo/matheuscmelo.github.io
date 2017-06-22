angular.module('Series').controller('SeriesController', ['$scope','RESTService','SeriesRepository', '$http', SeriesController]);


function SeriesController ($scope, RESTService, SeriesRepository) {
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

	function chunk(arr, size) {
    var newArr = [];
    for (var i=0; i < arr.length; i+=size) {
      newArr.push(arr.slice(i, i+size));
    }
    return newArr;
  };

	$scope.addToMySeries = function(serie) {
			var promise = RESTService.getFullSerie(serie);
			promise.then(function(response) {
				if(SeriesRepository.addToMySeries(response.data)) {
					$scope.chunkedMySeries = SeriesRepository.getChunkedMySeries();
				} else {
					alert('Esta série já está presente nas suas séries!');
				}
			}).catch(function(error) {
				console.log(error);
			});
	};

	$scope.removeFromMySeries = function(serie) {
		removeSerie(mySeries, serie);
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
		var promise = RESTService.getShortSeries(name);

		promise.then(function(response) {
			$scope.searched = true;
			if(response.data.Response == 'True') {
				$scope.chunkedSearchedSeries = chunk(response.data.Search, 4);
			} else {
				$scope.chunkedSearchedSeries = [];
			}
		}).catch(function(error) {
			$scope.searched = true;
			console.log(error);
		});
	};

	$scope.addToWatchlist = function(serie) {
		if(!containsSerie(watchlist, serie)){
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



};
