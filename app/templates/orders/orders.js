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
    	//$('#print-area').innerHTML = '<div>order</div>';
    	$('#print-area').html('<div>order</div>');
    	//window.print();

    	var producsByCategory = [];

    	API.initCategories().then(function(data){
    		var categories = data;
    		API.initSubcategories().then(function(data){
    			var subcategories = data;
    			categories.forEach(function(category){
    				var newEntry = {
    					'category':category.name,
    					'products': []
    				};
    				for(var i=0; i<order.products.length; i++)
    					if(category._id == order.products[i].categoryId){
    						newEntry.products.push({
    							'name': order.products[i].name,
    							'note': order.products[i].note,
    							'order': order.products[i].order,
    							'price': order.products[i].price,
    							'total': order.products[i].total
    						});
    					}
  					producsByCategory.push(newEntry);
    			});
    			console.log(producsByCategory);
    		});
    	});

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


