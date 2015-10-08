'use strict';
/**
 * @ngdoc function
 * @name architechApp.controller:weatherCtrl
 * @description
 * # weatherCtrl
 * Controller of the architechApp
 */
angular.module('architechApp')
    .controller('weatherCtrl', ['$scope', 'weatherService', '$filter', '$window',function($scope, 
        weatherService, $filter, $window) {

$scope.press = []; //Pressures array
$scope.ave = ''; //Average value of pressure for the week attached to the scope of the controller
$scope.total = 0;   //Total pressure 
$scope.time_array = []; //Array for the time points of temperature measurements
$scope.temp_array = []; //Array for temperature values throughout the week

var av; // Average value of pressure for the week 

$scope.cityName = "_____________"; //A placeholder for cityName



$scope.askWeather = function() {

    console.log('city', $scope.city);

//Reseting arrays and variables  
  $scope.press = [];
  $scope.time_array = [];
  $scope.temp_array = [];
  $scope.time_array = [];
  $scope.temp_array = [];
  $scope.total = 0;
  $scope.ave = '';
   av = 0


 $scope.cityName = "_____________"; 

  if($scope.city === ''|| $scope.city === undefined){ 
    $window.location.reload();
  }


  $scope.cityName = $scope.city;

    
  weatherService.getWeather($scope.city).then(function(data) {
  
    $scope.list = data.list;
    $scope.list.forEach(function(item, index) {
            $scope.press.push(item.main.pressure);      
    });

  var j, i;

  $scope.listSkipped = [];
       
    for (j = 0; j < $scope.list.length; j = j + 4) {
        $scope.listSkipped.push($scope.list[j]);
            var date = new Date($scope.list[j].dt * 1000);
            var formatted_date = $filter('date')(date, 'short');
            $scope.time_array.push(formatted_date);
            $scope.temp_array.push($scope.list[j].main.temp);

    }


    for (i = 0; i < $scope.press.length; i++) {
            $scope.total = $scope.total + $scope.press[i];
    }

    av = $scope.total / $scope.press.length;
    $scope.ave = av.toFixed(2);
    console.log($scope.ave);
    });

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
