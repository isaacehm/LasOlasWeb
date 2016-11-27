'use strict';
 
angular.module('myApp.reports', ['ngRoute'])
 
.controller('ReportsCtrl', ['$scope', '$rootScope', '$location', 'API', '$cookies', '$confirm', function($scope, $rootScope, $location, API, $cookies, $confirm) {

	if ($cookies.get('session') == undefined)
		$location.path('/login');

	$rootScope.reportType = undefined;
	$rootScope.reportOrders = undefined;

	var date = new Date();
	if((date.getMonth()+1) < 10){
		if(date.getDate() < 10){
			$rootScope.today = date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+date.getDate();
		}else{
			$rootScope.today = date.getFullYear()+"-0"+(date.getMonth()+1)+"-"+date.getDate();
		}
	}else{
		if(date.getDate() < 10){
			$rootScope.today = date.getFullYear()+"-"+(date.getMonth()+1)+"-0"+date.getDate();
		}else{
			$rootScope.today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
		}
	}

	$scope.type1 = function(date){
		console.log(date);
		if(date == undefined)
			date = new Date();

		if((date.getMonth()+1) < 10){
			if(date.getDate() < 10){
				var selectedDate = date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+date.getDate();
			}else{
				var selectedDate = date.getFullYear()+"-0"+(date.getMonth()+1)+"-"+date.getDate();
			}
		}else{
			if(date.getDate() < 10){
				var selectedDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-0"+date.getDate();
			}else{
				var selectedDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
			}
		}

		API.initOrders().then(function(data){

			var orders = API.getOrders();
			var order;
			var selectedOrders = [];
			var total = 0.0;

			console.log(orders);

			for (order in orders)
				if( orders[order].date.substring(0,10) == selectedDate){
					selectedOrders.push(orders[order]);
					total += parseFloat(orders[order].total);
				}

			if(selectedOrders.length > 0){
				$rootScope.reportOrders = selectedOrders;
				$rootScope.total = total;
			}else{
				$rootScope.reportOrders = null;
			}

			API.getUsers().then(function(data){
				$rootScope.employees = data;
			});
    });

		$rootScope.reportType = '1';
	}

	$scope.type2 = function(date){
		if(date == undefined)
			date = new Date();

		if((date.getMonth()+1) < 10){
			if(date.getDate() < 10){
				var selectedDate = date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+date.getDate();
			}else{
				var selectedDate = date.getFullYear()+"-0"+(date.getMonth()+1)+"-"+date.getDate();
			}
		}else{
			if(date.getDate() < 10){
				var selectedDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-0"+date.getDate();
			}else{
				var selectedDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
			}
		}
		
		API.initOrders().then(function(data){

			var orders = API.getOrders();
			var order;
			var selectedOrders = [];
			var total = 0.0;

			for (order in orders)
				if( orders[order].date.substring(0,10) == selectedDate && orders[order].status === 'Cobrada'){
					selectedOrders.push(orders[order]);
					total += parseFloat(orders[order].total);
				}

			if(selectedOrders.length > 0){
				$rootScope.reportOrders = selectedOrders;
				$rootScope.total = total;
			}else{
				$rootScope.reportOrders = null;
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
			var productsWithoutStock = [];
			var total = 0.0;

			for (product in products)
				if( products[product].stock != -1){
					productsWithStock.push(products[product]);
				}else{
					productsWithoutStock.push(products[product]);
				}

			$rootScope.productsWithStock = productsWithStock;
			$rootScope.productsWithoutStock = productsWithStock;
		});

		$rootScope.reportType = '4';
	}

	API.initOrders().then(function(data){
		$rootScope.reportOrders = API.getOrders();
  });



}]);

