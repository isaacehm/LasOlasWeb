'use strict';
 
angular.module('myApp.reports', ['ngRoute'])
 
.controller('ReportsCtrl', ['$scope', '$rootScope', '$location', 'API', '$cookies', '$confirm', function($scope, $rootScope, $location, API, $cookies, $confirm) {

	if ($cookies.get('session') == undefined)
		$location.path('/login');

	var date = new Date();
	if(date.getDate() < 10){
		$rootScope.today = date.getFullYear()+"-"+(date.getMonth()+1)+"-0"+date.getDate()
	}else{
		$rootScope.today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
	}


	$scope.type1 = function(){ 

		$rootScope.reportType = '1';
	}

	$scope.type2 = function(date){
		if(date == undefined)
			date = new Date();

		if(date.getDate() < 10){
			var selectedDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-0"+date.getDate()
		}else{
			var selectedDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
		}
		
		API.initOrders().then(function(data){

			var orders = API.getOrders();
			var order;
			var selectedOrders = [];
			var total = 0.0;

			for (order in orders)
				if( orders[order].date.substring(0,10) == selectedDate){
					selectedOrders.push(orders[order]);
					total += parseFloat(orders[order].total);
				}

			if(selectedOrders.length > 0){
				$rootScope.orders = selectedOrders;
				$rootScope.total = total;
			}else{
				$rootScope.orders = null;
			}			
	    });

		$rootScope.reportType = '2';
	}

	$scope.type3 = function(){ 

		$rootScope.reportType = '3';
	}

	$scope.type4 = function(){ 

		API.initProducts().then(function(data){

			var products = data;
			var product;
			var productsWithStock = [];
			var total = 0.0;

			for (product in products)
				if( products[product].stock != -1)
					productsWithStock.push(products[product]);

			$rootScope.orders = productsWithStock;
			console.log(productsWithStock);

		});

		$rootScope.reportType = '4';
	}




	API.initOrders().then(function(data){
		$rootScope.orders = API.getOrders();
    });



}]);

