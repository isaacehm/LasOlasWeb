'use strict';
 
angular.module('myApp.admin.stays', ['ngRoute'])
 
.controller('StaysCtrl', ['$scope', '$rootScope', '$location', 'API', '$cookies', '$confirm', function($scope, $rootScope, $location, API, $cookies, $confirm) {

	if ($cookies.get('session') == undefined)
		$location.path('/login');

	API.getStays().then(function(data){
		$rootScope.stays = data;
	});

	$scope.delete = function(stayId, name){ 
		
		$confirm({text: '¿Desea eliminar la estancia, '+name+'?', title: 'Eliminar usuario', ok: 'Si', cancel: 'No'})
			.then(function() {
				if(API.deleteStay(stayId)){
					$location.path('/admin');
				}else{
					console.log("Error deleting user.");
				}
				
			});

	}

	$scope.update = function(stay){
		$confirm({stay: stay}, { templateUrl: 'templates/admin/stays/update.html' });
	}

	$scope.create = function(stay){
		$confirm({stay: stay}, { templateUrl: 'templates/admin/stays/create.html' });
	}

}]) ;


