'use strict';
/**
 * @ngdoc function
 * @name architechApp.controller:weatherCtrl
 * @description
 * # weatherCtrl
 * Controller of the architechApp
 */
angular.module('architechApp')
    .controller('weatherCtrl', ['$scope', 'weatherService', '$filter', function($scope, weatherService, $filter) {

$scope.press = []; //Pressures array
$scope.ave = ''; //Average value of pressure for the week attached to the scope of the controller
$scope.total = 0;   //Total pressure 
var av; // Average value of pressure for the week 

$scope.time_array = []; //Array for the time points of temperature measurements
$scope.temp_array = []; //Array for temperature values throughout the week

$scope.cityName = "_____________"; //A placeholder for cityName

/*
 The function askWeather() is bound to the view via the $scope object.
 The function takes the city (that is entered in the form) upon the submit
 button being clicked inside the view.
*/

$scope.askWeather = function(city) {

  $scope.cityName = $scope.city;

//Reseting arrays and variables  
  $scope.time_array = [];
  $scope.temp_array = [];
  $scope.total = 0;
  $scope.ave = '';
   av = 0

/* 
 The getWeather() function of the weatherService factory object is called 
 with the parameter city pass to it (city enetered by the user is passed 
 to the function). The returned promise is handled in the callback 
 function of the then method. The data is then assigned to a list array on the 
 scope object. The list array is looped over and the pressure values are extracted 
 out of it and individually pushed into the press array (the array that is 
 created above to take in pressure values.)
*/
    
  weatherService.getWeather(city).then(
    function(data) {
        console.log(data);
        $scope.list = data;      
        $scope.list.forEach(function(item, index) {
            $scope.press.push(item.main.pressure);      
    });

    var j, i;
/*
 The for loop below is used for looping over the list array and extracting out 
 date and temperature values and pushing them into the arrays $scope.time_array
 and $scope.temp_array. The iteration variable of the loop is incremented by 2 for 
 the purpose of making the x-axis values of the chart (in the view) increment by 2 
 so as to prevent the time (date) values from stacking over each other.
*/        
    for (j = 0; j < $scope.list.length; j = j + 2) {
            var date = new Date($scope.list[j].dt * 1000);
            var formatted_date = $filter('date')(date, 'short');
            $scope.time_array.push(formatted_date);
            $scope.temp_array.push($scope.list[j].main.temp);

    }

/*
The next for loop, loops over the values of the press array (pressure) and calculates 
the total pressure value for the week. Outside of the loop the avarage pressure is calculated 
and converted into a two decimal point floating number and bound to the model object.
*/
    for (i = 0; i < $scope.press.length; i++) {
            $scope.total = $scope.total + $scope.press[i];
    }

    av = $scope.total / $scope.press.length;
    $scope.ave = av.toFixed(2);
    console.log($scope.ave);
    });

/*
$scope.labels and $scope.data are configuration variables of the angular-charts library.
The labels variable is assigned the time_array variable, which holds all the 
weather measurement time points of the week. The data variable is assigned the temp_array,
which holds all the temperature measuerment values of the week.
*/

    $scope.options = { 
        responsive: true,
        maintainAspectRatio: true
    };

    $scope.labels = $scope.time_array;
    console.log($scope.labels);
    $scope.series = ['Days vs Temperature'];
    $scope.data = [$scope.temp_array];
    $scope.onClick = function(points, evt) {
        console.log(points, evt);
    };

    $scope.press = [];
    $scope.city = '';
   
  };

}]);
