'use strict';
 
angular.module('myApp.login', ['ngRoute'])
 
.controller('LoginCtrl', ['$scope', '$rootScope', '$location', 'API', '$cookies', '$confirm', function($scope, $rootScope, $location, API, $cookies, $confirm) {

	if ($cookies.get('session') == undefined){
		$location.path('/login');
	}else{
		$location.path('/orders');
	}

	API.getUsers().then(function(data){
		$rootScope.users = data;
	});

	$scope.login = function(user){
		//console.log(user);
		if (user)
			API.login(user.username, user.password).then(function(data){
				if(data.type == 'Administrator'){
					var expireDate = new Date();
  					expireDate.setDate(expireDate.getDate() + 1);
  					
					$cookies.put('session', data._id, {'expires': expireDate});
					$location.path('/orders');
				}
			});		
	}

}])


.controller('LogoutCtrl', ['$scope', '$rootScope', '$location', 'API', '$cookies', '$confirm', function($scope, $rootScope, $location, API, $cookies, $confirm) {

	$cookies.put('session', undefined);
	$location.path('/login');

}]);


