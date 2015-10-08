'use strict';

/**
 * @ngdoc function
 * @name architechApp.factpry:weatherService
 * @description
 * # weatherService
 * Service of the architechApp
 */
angular.module('architechApp')
  .factory('weatherService', ['$http', '$q', 
  function ($http, $q) {
    /*
      The factory service returns an object, which later gets injected into the controller
      of the app.
    */
  function getWeather(city){

     /* The function getWeather is a mehtod on the returned object of the factory service.
      Inside the get method of the native angular $http service is used for getting the 
      data from the api. The success and error methods are called on get to handle the 
      returned when the promise is resolved data or print out an error message upon the 
      promise not being fullfilled. */

  		var deferred = $q.defer();
  		
  		$http.get('http://api.openweathermap.org/data/2.5/forecast/city?q='+city+'&units=metric&mo?callback=JSON_CALLBACK')	
  			.success(function(data){    
  				deferred.resolve(data);
  			})
  			.error(function(err){
  				console.log('Weather data not available')
  				deferred.reject(err);
 			
      });

        return deferred.promise;
        
  };

  return {
  			   getWeather: getWeather
  		   };

  }]);