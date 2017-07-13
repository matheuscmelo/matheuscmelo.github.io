angular.module('Series').service('SeriesRepository', function() {
  this.mySeries = [];
  this.watchlist = [];
  this.addToMySeries = addToMySeries;
  this.removeFromMySeries = removeFromMySeries;
  this.removeFromWatchlist = removeFromWatchlist;
  this.addToWatchlist = addToWatchlist;
  this.getChunkedMySeries = getChunkedMySeries;
  this.getChunkedWatchlist = getChunkedWatchlist;
  this.setLastEpisode = setLastEpisode;
  this.setMyScore = setMyScore;

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
    if(!containsSerie(this.watchlist, serie) && !containsSerie(this.mySeries, serie)) {
      this.watchlist.push(serie);
      return true;
    } else {
      return false;
    }
  }

  function removeFromWatchlist(serie) {
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

  function getChunkedWatchlist() {
    return chunk(this.watchlist, 4);
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

  function setLastEpisode(name, serie) {
		serie.LastEpisode = name;
	};

  function setMyScore(score, serie) {
		serie.MyScore = score;
	};


});
