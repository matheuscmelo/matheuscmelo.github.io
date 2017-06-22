angular.module('Series').service('SeriesRepository', function() {
  this.mySeries = [];
  this.watchList = [];
  this.addToMySeries = addToMySeries;
  this.removeFromMySeries = removeFromMySeries;
  this.addToWatchlist = addToWatchlist;
  this.getChunkedMySeries = getChunkedMySeries;

  function addToMySeries(serie) {
    if (!containsSerie(this.mySeries, serie)) {
			this.mySeries.push(serie);
      return true;
    } else {
      return false;
    }
	};

  function removeFromMySeries(serie) {
      removeSerie(this.mySeries, serie);
  };

  function addToWatchlist(serie) {
    if(!containsSerie(this.watchlist, serie)) {
      this.watchlist.push(serie);
      return true;
    } else {
      return false;
    }
  }

  function removeFromWatchlist(series) {
    removeSerie(this.watchlist, serie);
  };

  function removeSerie(array, serie) {
    var index = array.indexOf(serie);
    if (index > -1) {
      array.splice(index, 1);
    }
  };

  function getChunkedMySeries() {
    return chunk(this.mySeries, 4);
  }

  function containsSerie(array, serie) {
    for (var i = 0; i < array.length; i++) {
    if(array[i].Title.toLowerCase() == serie.Title.toLowerCase()) {
      return true;
      }
    }
    return false;
  };

  function chunk(arr, size) {
    var newArr = [];
    for (var i=0; i < arr.length; i+=size) {
      newArr.push(arr.slice(i, i+size));
    }
    return newArr;
  };


});
