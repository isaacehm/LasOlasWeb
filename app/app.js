'use strict';

//var myUrl = 'http://localhost:3000/api';
var myUrl = 'http://oneidea.com.ar/balneario/api';

angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'angular-confirm',
  'ui.bootstrap',
  'myApp.login',
  //'myApp.orders',
  //'myApp.admin',
  //'myApp.admin.menu',
  'myApp.admin.users'
]).
config(['$routeProvider', function($routeProvider) {
	// Routes will be here
	$routeProvider.when('/login', {
        templateUrl: 'templates/login/login.html',
        controller: 'LoginCtrl'
    })

    .when('/logout', {
		template: '',
		controller: 'LogoutCtrl'
	})

	.when('/orders', {
        templateUrl: 'templates/orders/orders.html',
        controller: 'OrdersCtrl'
    })

    .when('/admin', {
        templateUrl: 'templates/admin/admin.html',
        controller: 'AdminCtrl'
    })

    .when('/admin/menu', {
        templateUrl: 'templates/admin/menu/menu.html',
        controller: 'MenuCtrl'
    })

    .when('/admin/stays', {
        templateUrl: 'templates/admin/stays/stays.html',
        controller: 'StaysCtrl'
    })

    .when('/admin/users', {
        templateUrl: 'templates/admin/users/users.html',
        controller: 'UsersCtrl'
    })

	.otherwise({
		redirectTo: '/login'
	});
}])

.factory('API', ['$http', function($http) {

	var employee = null;
	var users = null;

	return{
		login: function(username, password){
            var req = {
                    method: 'POST',
                    //url: 'http://localhost:3000/api/user', 
                    url: myUrl+'/user',
                    headers: { 
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data:{
                        username: username,
                        password: password
                    }
                };

            return $http(req).then(function(data) {
                return data.data;
              
            }, function(data) {
                console.log(data.status+": "+data.data.msg);
                return false;
            });
        },

        getUsers: function(){
        	var req = {
                    method: 'GET',
                    url: myUrl+'/users',
                };

                return $http(req).then(function(data) {	                
                	return data.data;
	              
	            }, function(data) {
	                console.log(data.status+": "+data.data.msg);
	                return false;
	            });
        },

        updateUser: function(user){

            var req = {
                    method: 'PUT',
                    //url: 'http://localhost:3000/api/user', 
                    url: myUrl+'/user/'+user._id,
                    headers: { 
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data:{
                        name: user.name,
                        username: user.username,
                        password: user.password,
                        type: user.type
                    }
                };

            return $http(req).then(function(data) {
                return true;
              
            }, function(data) {
                console.log(data.status+": "+data.data.msg);
                return false;
            });
            
        },


        addUser: function(user){

            var req = {
                    method: 'POST',
                    url: myUrl+'/users',
                    headers: { 
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data:{
                        name: user.name,
                        username: user.username,
                        password: user.password,
                        type: user.type
                    }
                };

            return $http(req).then(function(data) {
                return true;
              
            }, function(data) {
                console.log(data.status+": "+data.data.msg);
                return false;
            });
            
        },


        deleteUser: function(userId){

            var req = {
                    method: 'DELETE',
                    url: myUrl+'/user/'+userId
                };

            return $http(req).then(function(data) {                 
                return true;
              
            }, function(data) {
                console.log(data.status+": "+data.data.msg);
                return false;
            });



        }














	}

}]);