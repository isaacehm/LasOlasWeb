'use strict';
 
angular.module('myApp.orders', ['ngRoute'])
 
.controller('OrdersCtrl', ['$scope', '$rootScope', '$location', 'API', '$cookies', '$confirm', function($scope, $rootScope, $location, API, $cookies, $confirm) {

	if ($cookies.get('session') == undefined)
		$location.path('/login');

	var socket = API.getSocket();

	socket.on('new order', function(order){
		$confirm({order: order}, { templateUrl: 'templates/orders/new.html' });

		console.log(order);

		$rootScope.orders.push(order);

		/*API.initOrders().then(function(data){
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
	    });*/

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
			$rootScope.orders = [];
		}

		$rootScope.date = date;
		$rootScope.today = today;
  });		

		$scope.reprintOrder = function(order){
			$scope.printOrder(order);
		}

    $scope.printOrder = function(order){

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
  					if(newEntry.products.length > 0)
  						producsByCategory.push(newEntry);
    			});
    			console.log(producsByCategory);
    			var template = '<table width="100%"><tr><th>Nombre</th><th>Cantidad</th><th>Nota</th><th>Importe</th><th>Total</th></tr>';
    			producsByCategory.forEach(function(entry){
    				template += '<tr><td colspan="5" style="text-align:left;border-bottom:1px solid black;"><b>'+entry.category+'</b></td></tr>';
    				entry.products.forEach(function(product){
    					template += '<tr>';
    					template += '<td>'+product.name+'</td>';
    					template += '<td>'+product.order+'</td>';
    					template += '<td>'+product.note+'</td>';
    					template += '<td>$'+product.price+'</td>';
    					template += '<td>$'+product.total+'</td>';
    					template += '</tr>';    					
    				});    				
    			});
    			template += '<tr><td colspan="5" style="text-align:right;border-top:1px solid black;"><b>TOTAL: $'+order.total+'</b></td></tr>';
    			template += '</table>';
    			$('#print-area').html(template);
    			window.print();
    		});
    	});
    }

    $scope.processOrder = function(order){

    	$scope.printOrder(order);

    	API.updateOrder(order, 'Procesada').then(function(data){
    		order.status = 'Procesada';

    		/*API.initOrders().then(function(data){
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
		    });*/
    	});
	}

	$scope.chargeOrder = function(order){

    	API.updateOrder(order, 'Cobrada').then(function(data){

    		order.status = 'Cobrada';

    		/*API.initOrders().then(function(data){
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
		    });*/
    	});
	}

	$scope.cancelOrder = function(order){
		API.cancelOrder(order).then(function(data){
			for(var i=0; i<$rootScope.orders.length; i++)
				if(order._id == $rootScope.orders[i]._id){
					$rootScope.orders.splice(i, 1);
					break;
				}
			/*API.initOrders().then(function(data){
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
	    });*/
		});
	}

}]);


