'use strict';
 
angular.module('myApp.admin.menu', ['ngRoute'])
 
.controller('MenuCtrl', ['$scope', '$rootScope', '$location', 'API', '$cookies', '$confirm', function($scope, $rootScope, $location, API, $cookies, $confirm) {

	if ($cookies.get('session') == undefined)
		$location.path('/login');

	API.initCategories().then(function(data){
		$rootScope.categories = data;
	});
	API.initSubcategories().then(function(data){
		$rootScope.subcategories = data;
	});
	API.initProducts().then(function(data){
		$rootScope.products = data;
	});

	$scope.createCategory = function(){
		$confirm({}, { templateUrl: 'templates/admin/menu/category/create.html' });
	}

	$scope.updateCategory = function(category){
		$confirm({category: category}, { templateUrl: 'templates/admin/menu/category/update.html' });
	}

	$scope.deleteCategory = function(categoryId, name){ 
		
		$confirm({text: '¿Desea eliminar la categoría, '+name+'?', title: 'Eliminar categoria', ok: 'Si', cancel: 'No'})
			.then(function() {
				if(API.deleteCategory(categoryId)){
					$location.path('/admin');
				}else{
					console.log("Error deleting category.");
				}
				
			});
	}

	$scope.createSubcategory = function(category){
		$confirm({category: category}, { templateUrl: 'templates/admin/menu/subcategory/create.html' });
	}

	$scope.updateSubcategory = function(subcategory, category){
		$confirm({subcategory: subcategory, category: category}, { templateUrl: 'templates/admin/menu/subcategory/update.html' });
	}

	$scope.deleteSubcategory = function(subcategoryId, name){ 
		
		$confirm({text: '¿Desea eliminar la subcategoría, '+name+'?', title: 'Eliminar subcategoria', ok: 'Si', cancel: 'No'})
			.then(function() {
				if(API.deleteSubcategory(subcategoryId)){
					$location.path('/admin');
				}else{
					console.log("Error deleting subcatery.");
				}
				
			});

	}

	$scope.createProduct = function(category, subcategory){
		$confirm({category: category, subcategory: subcategory}, { templateUrl: 'templates/admin/menu/product/create.html' });
	}

	$scope.updateProduct = function(product, category, subcategory){
		$confirm({product: product, subcategory: subcategory, category: category}, { templateUrl: 'templates/admin/menu/product/update.html' });
	}

	$scope.deleteProduct = function(productId, name){ 
		
		$confirm({text: '¿Desea eliminar el producto, '+name+'?', title: 'Eliminar producto', ok: 'Si', cancel: 'No'})
			.then(function() {
				if(API.deleteProduct(productId)){
					$location.path('/admin');
				}else{
					console.log("Error deleting product.");
				}
				
			});

	}

}]) ;


