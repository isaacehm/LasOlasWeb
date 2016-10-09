/*
 * angular-confirm
 * https://github.com/Schlogen/angular-confirm
 * @version v1.2.1 - 2015-11-18
 * @license Apache
 */
angular.module('angular-confirm', ['ui.bootstrap.modal'])
  .controller('ConfirmModalController', function ($scope, $uibModalInstance, $location, data, API) {
    $scope.data = angular.copy(data);

    $scope.ok = function () {
      $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.updateUser = function (user) {
      API.updateUser(user);
      $uibModalInstance.close();
      $location.path('/admin');
    };

    $scope.addUser = function(user){
      API.addUser(user);
      $uibModalInstance.close();
      $location.path('/admin');
    };

    $scope.updateStay = function (stay) {
      API.updateStay(stay);
      $uibModalInstance.close();
      $location.path('/admin');
    };

    $scope.addStay = function(stay){
      API.addStay(stay);
      $uibModalInstance.close();
      $location.path('/admin');
    };

    $scope.updateCategory = function (category) {
      API.updateCategory(category);
      $uibModalInstance.close();
      $location.path('/admin');
    };

    $scope.addCategory = function(category){
      API.addCategory(category);
      $uibModalInstance.close();
      $location.path('/admin');
    };

    $scope.updateSubcategory = function (subcategory, category) {
      API.updateSubcategory(subcategory, category);
      $uibModalInstance.close();
      $location.path('/admin');
    };

    $scope.addSubcategory = function(subcategory, categoryId){
      API.addSubcategory(subcategory, categoryId);
      $uibModalInstance.close();
      $location.path('/admin');
    };


    $scope.updateProduct = function(product, category, subcategory){
      API.updateProduct(product, category, subcategory);
      $uibModalInstance.close();
      $location.path('/admin');
    };

    $scope.addProduct = function(product, category, subcategory){
      API.addProduct(product, category, subcategory);
      $uibModalInstance.close();
      $location.path('/admin');
    };


  })
  .value('$confirmModalDefaults', {
    template: '<div class="modal-header"><h3 class="modal-title">{{data.title}}</h3></div>' +
    '<div class="modal-body">{{data.text}}</div>' +
    '<div class="modal-footer">' +
    '<button class="btn btn-primary" ng-click="ok()">{{data.ok}}</button>' +
    '<button class="btn btn-default" ng-click="cancel()">{{data.cancel}}</button>' +
    '</div>',
    controller: 'ConfirmModalController',
    defaultLabels: {
      title: 'Confirm',
      ok: 'OK',
      cancel: 'Cancel'
    }
  })
  .factory('$confirm', function ($uibModal, $confirmModalDefaults) {
    return function (data, settings) {
      var defaults = angular.copy($confirmModalDefaults);
      settings = angular.extend(defaults, (settings || {}));
      
      data = angular.extend({}, settings.defaultLabels, data || {});

      if ('templateUrl' in settings && 'template' in settings) {
        delete settings.template;
      }

      settings.resolve = {
        data: function () {
          return data;
        }
      };

      return $uibModal.open(settings).result;
    };
  })
  .directive('confirm', function ($confirm) {
    return {
      priority: 1,
      restrict: 'A',
      scope: {
        confirmIf: "=",
        ngClick: '&',
        confirm: '@',
        confirmSettings: "=",
        confirmTitle: '@',
        confirmOk: '@',
        confirmCancel: '@'
      },
      link: function (scope, element, attrs) {

        element.unbind("click").bind("click", function ($event) {

          $event.preventDefault();

          if (angular.isUndefined(scope.confirmIf) || scope.confirmIf) {

            var data = {text: scope.confirm};
            if (scope.confirmTitle) {
              data.title = scope.confirmTitle;
            }
            if (scope.confirmOk) {
              data.ok = scope.confirmOk;
            }
            if (scope.confirmCancel) {
              data.cancel = scope.confirmCancel;
            }
            $confirm(data, scope.confirmSettings || {}).then(scope.ngClick);
          } else {

            scope.$apply(scope.ngClick);
          }
        });

      }
    }
  });
