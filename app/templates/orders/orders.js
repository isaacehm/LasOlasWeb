'use strict';
 
angular.module('myApp.orders', ['ngRoute'])
 
.controller('OrdersCtrl', ['$scope', '$rootScope', '$location', 'API', '$cookies', '$confirm', function($scope, $rootScope, $location, API, $cookies, $confirm) {

	if ($cookies.get('session') == undefined)
		$location.path('/login');

	var socket = API.getSocket();

	socket.on('new order', function(order){

		$confirm({order: order}, { templateUrl: 'templates/orders/new.html' });

		API.initOrders().then(function(data){
			var date = new Date();
			if((date.getMonth()+1) < 10){
				if(date.getDate() < 10){
					var today = date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+date.getDate()
				}else{
					var today = date.getFullYear()+"-0"+(date.getMonth()+1)+"-"+date.getDate()
				}
			}else{
				if(date.getDate() < 10){
					var today = date.getFullYear()+"-"+(date.getMonth()+1)+"-0"+date.getDate()
				}else{
					var today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
				}
			}

			var orders = API.getOrders();
			var order;
			var actualOrders = [];

			console.log(today);
			console.log(orders);

			for (order in orders)
				if( orders[order].date.substring(0,10) == today)
					actualOrders.push(orders[order]);

			if(actualOrders.length > 0){
				$rootScope.orders = actualOrders;
			}else{
				$rootScope.orders = null;
			}
	    });	

	});

	API.initOrders().then(function(data){
		var date = new Date();
		if((date.getMonth()+1) < 10){
			if(date.getDate() < 10){
				var today = date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+date.getDate()
			}else{
				var today = date.getFullYear()+"-0"+(date.getMonth()+1)+"-"+date.getDate()
			}
		}else{
			if(date.getDate() < 10){
				var today = date.getFullYear()+"-"+(date.getMonth()+1)+"-0"+date.getDate()
			}else{
				var today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
			}
		}

		var orders = API.getOrders();
		var order;
		var actualOrders = [];

		console.log(today);
		console.log(orders);

		for (order in orders)
			if( orders[order].date.substring(0,10) == today)
				actualOrders.push(orders[order]);

		if(actualOrders.length > 0){
			$rootScope.orders = actualOrders;
		}else{
			$rootScope.orders = null;
		}
    });

    $scope.printOrder = function(order){
    	console.log(order.status);

    	API.updateOrder(order, 'Procesada').then(function(data){

    		API.initOrders().then(function(data){
				var date = new Date();
				if(date.getDate() < 10){
					var today = date.getFullYear()+"-"+(date.getMonth()+1)+"-0"+date.getDate()
				}else{
					var today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
				}

				//console.log(today);

				var orders = API.getOrders();
				var order;
				var actualOrders = [];
				for (order in orders){
					//console.log('fecha orden: '+orders[order].date.substring(0,10));
					//console.log('fecha servidor: '+today)
					if( orders[order].date.substring(0,10) == today)
						actualOrders.push(orders[order]);
				}

				if(actualOrders.length > 0){
					$rootScope.orders = actualOrders;
				}else{
					$rootScope.orders = null;
				}
		    });
    	});
	}

	$scope.chargeOrder = function(order){
    	console.log(order.status);

    	API.updateOrder(order, 'Cobrada').then(function(data){

    		API.initOrders().then(function(data){
				var date = new Date();
				if(date.getDate() < 10){
					var today = date.getFullYear()+"-"+(date.getMonth()+1)+"-0"+date.getDate()
				}else{
					var today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
				}

				//console.log(today);

				var orders = API.getOrders();
				var order;
				var actualOrders = [];
				for (order in orders){
					//console.log('fecha orden: '+orders[order].date.substring(0,10));
					//console.log('fecha servidor: '+today)
					if( orders[order].date.substring(0,10) == today)
						actualOrders.push(orders[order]);
				}

				if(actualOrders.length > 0){
					$rootScope.orders = actualOrders;
				}else{
					$rootScope.orders = null;
				}
		    });
    	});
	}

}]);


