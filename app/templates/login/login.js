'use strict';
 
angular.module('myApp.login', ['ngRoute'])
 
.controller('LoginCtrl', ['$scope', '$rootScope', '$location', 'API', '$cookies', '$confirm', function($scope, $rootScope, $location, API, $cookies, $confirm) {

	if ($cookies.get('session') == undefined)
		$location.path('/login');

	API.getUsers().then(function(data){
		$rootScope.users = data;
	});

	$scope.login = function(user){
		//console.log(user);
		if (user)
			API.login(user.username, user.password).then(function(data){
				if(data.type == 'Administrator'){
					$cookies.put('session', data._id);
					$location.path('/orders');
				}
			});		
	}

}]) ;


