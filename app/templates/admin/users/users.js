'use strict';
 
angular.module('myApp.admin.users', ['ngRoute'])
 
.controller('UsersCtrl', ['$scope', '$rootScope', '$location', 'API', '$cookies', '$confirm', function($scope, $rootScope, $location, API, $cookies, $confirm) {

	if ($cookies.get('session') == undefined)
		$location.path('/login');

	API.getUsers().then(function(data){
		$rootScope.users = data;
	});

	$scope.deleteUser = function(userId, name){ 
		
		$confirm({text: '¿Desea eliminar al usuario, '+name+'?', title: 'Eliminar usuario', ok: 'Si', cancel: 'No'})
			.then(function() {
				if(API.deleteUser(userId)){
					$location.path('/admin');
				}else{
					console.log("Error deleting user.");
				}
				
			});

	}

	$scope.updateUser = function(user){
		$confirm({user: user}, { templateUrl: 'templates/admin/users/update.html' });
	}

	$scope.createUser = function(){
		$confirm({}, { templateUrl: 'templates/admin/users/create.html' });
	}

	$scope.addStay = function(stay){
		console.log(stay);
	}

}]) ;


