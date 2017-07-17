angular.module('Series').controller('SeriesController', ['$scope', '$state','RESTService','SeriesRepository', '$http', SeriesController]);


function SeriesController ($scope, $state, RESTService, SeriesRepository) {
	$scope.chunkedMySeries = [];
	$scope.chunkedSearchedSeries = [];
	$scope.chunkedWatchlist = [];
	$scope.searched = false;
	
	function chunkMySeries() {
		$scope.chunkedMySeries = SeriesRepository.getChunkedMySeries();
	}

	function chunkWatchlist() {
		$scope.chunkedWatchlist = SeriesRepository.getChunkedWatchlist();
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
					SeriesRepository.removeFromWatchlist(serie);
					var userId = SeriesRepository.getUserId();
					RESTService.addToMySeries(userId, response.data);
					chunkMySeries();
					chunkWatchlist();
				} else {
					alert('Esta série já está presente nas suas séries!');
				}
			}).catch(function(error) {
				console.log(error);
			});
	};

	$scope.removeFromMySeries = function(serie) {
		if(confirm('Deseja realmente remover esta série?')) {
			
			SeriesRepository.removeFromMySeries(serie);
			chunkMySeries();
			alert('Série removida.');
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
		SeriesRepository.addToWatchlist(serie);
		var userId = SeriesRepository.getUserId();
		RESTService.addToWatchlist(userId, serie);
		
		chunkWatchlist();
	};

	$scope.setLastEpisode = function(name, serie) {
		SeriesRepository.setLastEpisode(name, serie);
	};

	$scope.setMyScore = function(score, serie) {
		SeriesRepository.setMyScore(score, serie);
	}
	
	$scope.toMySeries = function() {
		$state.transitionTo('series.myseries');
		console.log($scope.chunkedMySeries);
	}
	
	$scope.toWatchlist = function() {
		$state.transitionTo('series.watchlist');
	}
	
	$scope.toSearch = function() {
		$state.transitionTo('series.search');
	}
	
	
	chunkWatchlist();
	chunkMySeries();
};
