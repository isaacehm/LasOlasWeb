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
					var today = date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+date.getDate();
				}else{
					var today = date.getFullYear()+"-0"+(date.getMonth()+1)+"-"+date.getDate();
				}
			}else{
				if(date.getDate() < 10){
					var today = date.getFullYear()+"-"+(date.getMonth()+1)+"-0"+date.getDate();
				}else{
					var today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
				}
			}

			var orders = API.getOrders();
			var order;
			var actualOrders = [];

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
				var today = date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+date.getDate();
			}else{
				var today = date.getFullYear()+"-0"+(date.getMonth()+1)+"-"+date.getDate();
			}
		}else{
			if(date.getDate() < 10){
				var today = date.getFullYear()+"-"+(date.getMonth()+1)+"-0"+date.getDate();
			}else{
				var today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
			}
		}

		var orders = API.getOrders();
		var order;
		var actualOrders = [];

		for (order in orders)
			if( orders[order].date.substring(0,10) == today)
				actualOrders.push(orders[order]);

		if(actualOrders.length > 0){
			$rootScope.orders = actualOrders;
		}else{
			$rootScope.orders = null;
		}

		$rootScope.date = date;
		$rootScope.today = today;
    });

    $scope.printOrder = function(order){

    	console.log(order);
    	console.log($('#print-area').innerHTML);

    	/*API.updateOrder(order, 'Procesada').then(function(data){

    		API.initOrders().then(function(data){
				var date = new Date();
				if((date.getMonth()+1) < 10){
					if(date.getDate() < 10){
						var today = date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+date.getDate();
					}else{
						var today = date.getFullYear()+"-0"+(date.getMonth()+1)+"-"+date.getDate();
					}
				}else{
					if(date.getDate() < 10){
						var today = date.getFullYear()+"-"+(date.getMonth()+1)+"-0"+date.getDate();
					}else{
						var today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
					}
				}

				var orders = API.getOrders();
				var order;
				var actualOrders = [];
				for (order in orders){
					if( orders[order].date.substring(0,10) == today)
						actualOrders.push(orders[order]);
				}

				if(actualOrders.length > 0){
					$rootScope.orders = actualOrders;
				}else{
					$rootScope.orders = null;
				}
		    });
    	});*/
	}

	$scope.chargeOrder = function(order){

    	API.updateOrder(order, 'Cobrada').then(function(data){

    		API.initOrders().then(function(data){
					var date = new Date();
					if((date.getMonth()+1) < 10){
						if(date.getDate() < 10){
							var today = date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+date.getDate();
						}else{
							var today = date.getFullYear()+"-0"+(date.getMonth()+1)+"-"+date.getDate();
						}
					}else{
						if(date.getDate() < 10){
							var today = date.getFullYear()+"-"+(date.getMonth()+1)+"-0"+date.getDate();
						}else{
							var today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
						}
					}

					var orders = API.getOrders();
					var order;
					var actualOrders = [];
					for (order in orders){
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

	$scope.cancelOrder = function(order){
		API.cancelOrder(order).then(function(data){
			API.initOrders().then(function(data){
				var date = new Date();
				if((date.getMonth()+1) < 10){
					if(date.getDate() < 10){
						var today = date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+date.getDate();
					}else{
						var today = date.getFullYear()+"-0"+(date.getMonth()+1)+"-"+date.getDate();
					}
				}else{
					if(date.getDate() < 10){
						var today = date.getFullYear()+"-"+(date.getMonth()+1)+"-0"+date.getDate();
					}else{
						var today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
					}
				}

				var orders = API.getOrders();
				var order;
				var actualOrders = [];
				for (order in orders){
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


