angular.module('Series', []).controller('SeriesController', function($scope, $http) {
	
	$scope.mySeries = [];
	$scope.chunkedMySeries = [];
	$scope.chunkedSearchedSeries = [];

	function chunkMySeries() {
		$scope.chunkedMySeries = chunk($scope.mySeries, 4);
	}

	function pushFullSerie(serie) {
		var index = $scope.mySeries.indexOf(serie);

		var promise = $http.get('https://omdbapi.com/?t=' + serie.Title + '&apikey=93330d3c');

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
		$scope.chunkedMySeries = chunk($scope.mySeries, 4);
	};

	$scope.getShortSeries = function(name) {
		var promise = $http.get('https://omdbapi.com/?s=' + name + '&type=series&apikey=93330d3c');
		promise.then(function(response) {
			$scope.chunkedSearchedSeries = chunk(response.data.Search, 4);
		}).catch(function(error) {
			console.log(error);
		});
	};

});
