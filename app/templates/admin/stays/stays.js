'use strict';
 
angular.module('myApp.admin.stays', ['ngRoute'])
 
.controller('StaysCtrl', ['$scope', '$rootScope', '$location', 'API', '$cookies', '$confirm', function($scope, $rootScope, $location, API, $cookies, $confirm) {

	if ($cookies.get('session') == undefined)
		$location.path('/login');

	API.getStays().then(function(data){
		$rootScope.stays = data;
	});

	$scope.deleteStay = function(stayId, name){ 
		
		$confirm({text: '¿Desea eliminar la estancia, '+name+'?', title: 'Eliminar estancia', ok: 'Si', cancel: 'No'})
			.then(function() {
				if(API.deleteStay(stayId)){
					$location.path('/admin');
				}else{
					console.log("Error deleting user.");
				}
				
			});

	}

	$scope.updateStay = function(stay){
		$confirm({stay: stay}, { templateUrl: 'templates/admin/stays/update.html' });
	}

	$scope.createStay = function(){
		$confirm({}, { templateUrl: 'templates/admin/stays/create.html' });
	}

	$scope.addStay = function(stay){		
		API.addStay().then(function(data){
			console.log(data);
		});
	}

}]) ;


