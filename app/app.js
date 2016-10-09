'use strict';

//var myUrl = 'http://localhost:3000/api';
var myUrl = 'http://oneidea.com.ar/balneario/api';

angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'toastr',
  'angular-confirm',
  'ui.bootstrap',
  'myApp.login',
  'myApp.orders',
  'myApp.reports',
  'myApp.admin',
  'myApp.admin.menu',
  'myApp.admin.stays',
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

    .when('/reports', {
        templateUrl: 'templates/reports/reports.html',
        controller: 'ReportsCtrl'
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

    //var socket = io('http://localhost:3000'); FOR DEVELOPMENT ONLY
    var socket = io('http://oneidea.com.ar:3000'); // FOR PRODUCTION
	var employee = null;
	var users = null;
    var categories = null;
    var subcategories = null;
    var products = null;
    var orders = {};

	return{
		login: function(username, password){
            var req = {
                    method: 'POST',
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



        },


        getStays: function(){
            var req = {
                    method: 'GET',
                    url: myUrl+'/stays',
                };

                return $http(req).then(function(data) {                 
                    return data.data;
                  
                }, function(data) {
                    console.log(data.status+": "+data.data.msg);
                    return false;
                });
        },

        updateStay: function(stay){

            var req = {
                    method: 'PUT',
                    //url: 'http://localhost:3000/api/user', 
                    url: myUrl+'/stay/'+stay._id,
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
                        name: stay.name,
                        maxNumber: stay.maxNumber,
                    }
                };

            return $http(req).then(function(data) {
                return true;
              
            }, function(data) {
                console.log(data.status+": "+data.data.msg);
                return false;
            });
            
        },

        addStay: function(stay){

            console.log(stay);

            var req = {
                    method: 'POST',
                    url: myUrl+'/stays',
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
                        name: stay.name,
                        maxNumber: stay.maxNumber
                    }
                };

            return $http(req).then(function(data) {
                return true;
              
            }, function(data) {
                console.log(data.status+": "+data.data.msg);
                return false;
            });
            
        },

        deleteStay: function(stayId){

            var req = {
                    method: 'DELETE',
                    url: myUrl+'/stay/'+stayId
                };

            return $http(req).then(function(data) {                 
                return true;
              
            }, function(data) {
                console.log(data.status+": "+data.data.msg);
                return false;
            });
        },

        initCategories: function(){
            var req = {
                    method: 'GET',
                    url: myUrl+'/categories',
                };

                return $http(req).then(function(data) {                 
                    categories = data.data;
                    return categories;
                  
                }, function(data) {
                    console.log(data.status+": "+data.data.msg);
                    return false;
                });
        },

        initSubcategories: function(){
            var req = {
                    method: 'GET',
                    url: myUrl+'/subcategories',
                };

                return $http(req).then(function(data) {                 
                    subcategories = data.data;
                    return subcategories;
                  
                }, function(data) {
                    console.log(data.status+": "+data.data.msg);
                    return false;
                });
        },

        initProducts: function(){
            var req = {
                    method: 'GET',
                    url: myUrl+'/products',
                };

                return $http(req).then(function(data) {                 
                    products = data.data;
                    return products;
                  
                }, function(data) {
                    console.log(data.status+": "+data.data.msg);
                    return false;
                });
        },

        updateCategory: function(category){

            var req = {
                    method: 'PUT',
                    url: myUrl+'/category/'+category._id,
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
                        name: category.name
                    }
                };

            return $http(req).then(function(data) {
                return true;
              
            }, function(data) {
                console.log(data.status+": "+data.data.msg);
                return false;
            });
            
        },

        addCategory: function(category){

            var req = {
                    method: 'POST',
                    url: myUrl+'/categories',
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
                        name: category
                    }
                };

            return $http(req).then(function(data) {
                return true;
              
            }, function(data) {
                console.log(data.status+": "+data.data.msg);
                return false;
            });
            
        },

        deleteCategory: function(categoryId){

            var req = {
                    method: 'DELETE',
                    url: myUrl+'/category/'+categoryId
                };

            return $http(req).then(function(data) {                 
                return true;
              
            }, function(data) {
                console.log(data.status+": "+data.data.msg);
                return false;
            });
        },


        updateSubcategory: function(subcategory, category){

            var req = {
                    method: 'PUT',
                    url: myUrl+'/subcategory/'+subcategory._id,
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
                        name: subcategory.name,
                        category: category
                    }
                };

            return $http(req).then(function(data) {
                return true;
              
            }, function(data) {
                console.log(data.status+": "+data.data.msg);
                return false;
            });
            
        },


        addSubcategory: function(subcategory, category){

            var req = {
                    method: 'POST',
                    url: myUrl+'/subcategories',
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
                        name: subcategory,
                        category: category
                    }
                };

            return $http(req).then(function(data) {
                return true;
              
            }, function(data) {
                console.log(data.status+": "+data.data.msg);
                return false;
            });
            
        },

        deleteSubcategory: function(subcategoryId){

            var req = {
                    method: 'DELETE',
                    url: myUrl+'/subcategory/'+subcategoryId
                };

            return $http(req).then(function(data) {                 
                return true;
              
            }, function(data) {
                console.log(data.status+": "+data.data.msg);
                return false;
            });
        },



        addProduct: function(product, category, subcategory){

            if(!product.limited)
                product.stock = -1;

            var req = {
                    method: 'POST',
                    url: myUrl+'/products',
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
                        name: product.name,
                        stock: product.stock,
                        price: product.price,
                        category: category,
                        subcategory: subcategory
                    }
                };

            return $http(req).then(function(data) {
                return true;
              
            }, function(data) {
                console.log(data.status+": "+data.data.msg);
                return false;
            });
            
        },

        deleteProduct: function(productId){

            var req = {
                    method: 'DELETE',
                    url: myUrl+'/product/'+productId
                };

            return $http(req).then(function(data) {                 
                return true;
              
            }, function(data) {
                console.log(data.status+": "+data.data.msg);
                return false;
            });
        },

        updateProduct: function(product, subcategory, category){

            var req = {
                    method: 'PUT',
                    url: myUrl+'/product/'+product._id,
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
                        name: product.name,
                        stock: product.stock,
                        price: product.price,
                        category: category,
                        subcategory: subcategory
                    }
                };

            return $http(req).then(function(data) {
                return true;
              
            }, function(data) {
                console.log(data.status+": "+data.data.msg);
                return false;
            });
            
        },

        initOrders: function(){
            var req = {
                    method: 'GET',
                    url: myUrl+'/orders',
                };

                return $http(req).then(function(data) {                 
                    orders = data.data;
                    //return true;
                  
                }, function(data) {
                    console.log(data.status+": "+data.data.msg);
                    return false;
                });
        },

        getOrders: function(){
            return orders;            
        },

        updateOrder: function(order, status){

            var req = {
                    method: 'PUT',
                    url: myUrl+'/order/'+order._id,
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
                        employee: order.employee,
                        stay: order.stay,
                        stayNumber: order.stayNumber,
                        //products: order.products,
                        status: status
                    }
                };

            return $http(req).then(function(data) {
                return true;
              
            }, function(data) {
                console.log(data.status+": "+data.data.msg);
                return false;
            });
            
        },

        cancelOrder: function(order){
            var req = {
                    method: 'DELETE',
                    url: myUrl+'/order/'+order._id,
                    headers: { 
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    }
                };

            return $http(req).then(function(data) {
                return true;
              
            }, function(data) {
                console.log(data.status+": "+data.data.msg);
                return false;
            });

        },

        getSocket: function(){
            return socket;
        }

	}

}]);
