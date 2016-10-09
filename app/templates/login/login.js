'use strict';
 
angular.module('myApp.login', ['ngRoute'])
 
.controller('LoginCtrl', ['$scope', '$rootScope', '$location', 'API', '$cookies', '$confirm', 'toastr', function($scope, $rootScope, $location, API, $cookies, $confirm, toastr) {

	toastr.info('Por favor, identifíquese para ingresar al Panel administrativo.', '¡Bienvenido!');

	if ($cookies.get('session') == undefined){
		$location.path('/login');
	}else{
		$location.path('/orders');
	}

	API.getUsers().then(function(data){
		$rootScope.users = data;
	});

	$scope.login = function(user){
		if (user)
			API.login(user.username, user.password).then(function(data){
				if(!data){
					toastr.warning('Disculpe, los datos son incorrectos. Intente nuevamente.', 'Datos incorrectos.');
				}else if(data.type == 'Administrator'){
					var expireDate = new Date();
  					expireDate.setDate(expireDate.getDate() + 1);
  					
					$cookies.put('session', data._id, {'expires': expireDate});
					$location.path('/orders');
				}else{
					toastr.warning('Disculpe, usted no está autorizado para acceder al Panel administrativo.', 'Acceso restringido.');
				}
			});		
	}

}])


.controller('LogoutCtrl', ['$scope', '$rootScope', '$location', 'API', '$cookies', '$confirm', function($scope, $rootScope, $location, API, $cookies, $confirm) {

	$cookies.put('session', undefined);
	$location.path('/login');

}]);


