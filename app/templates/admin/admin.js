'use strict';
 
angular.module('myApp.admin', ['ngRoute'])
 
.controller('AdminCtrl', ['$scope', '$rootScope', '$location', 'API', '$cookies', '$confirm', function($scope, $rootScope, $location, API, $cookies, $confirm) {

	if ($cookies.get('session') == undefined)
		$location.path('/login');



}]);


