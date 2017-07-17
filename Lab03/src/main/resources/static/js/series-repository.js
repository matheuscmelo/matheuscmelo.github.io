angular.module('Series').service('SeriesRepository', function() {
	this.user = {};
	this.addToMySeries = addToMySeries;
	this.removeFromMySeries = removeFromMySeries;
	this.removeFromWatchlist = removeFromWatchlist;
	this.addToWatchlist = addToWatchlist;
	this.getChunkedMySeries = getChunkedMySeries;
	this.getChunkedWatchlist = getChunkedWatchlist;
	this.setLastEpisode = setLastEpisode;
	this.setMyScore = setMyScore;
	this.setUser = setUser;
	this.printUser = printUser;
	this.getUserId = getUserId;
	
	function getUserId(){
		return this.user.id;
	};
	
	function addToMySeries(serie) {
		console.log(this.user.series);
	    if (!containsSerie(this.user.series, serie)) {
	    	this.user.series.push(serie);
	    	return true;
	    } else {
	    	return false;
	    }
	};

 	function removeFromMySeries(serie) {
      removeSerie(this.user.series, serie);
  };

  	function addToWatchlist(serie) {
	    if(!containsSerie(this.user.watchList, serie) && !containsSerie(this.user.series, serie)) {
	      this.user.watchList.push(serie);
	      return true;
	    } else {
	      return false;
	    }
	    console.log(this.user.series);
  }

  function removeFromWatchlist(serie) {
    removeSerie(this.user.watchList, serie);
  };

  function removeSerie(array, serie) {
    var index = array.indexOf(serie);
    if (index > -1) {
      array.splice(index, 1);
    }
  };

  function getChunkedMySeries() {
    return chunk(this.user.series, 4);
  }

  function getChunkedWatchlist() {
    return chunk(this.user.watchList, 4);
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
	
  function setUser(user) {
	  this.user = user;
	  console.log(this.user);
  }
  
  function printUser() {
	  console.log(this.user);
  }


});
