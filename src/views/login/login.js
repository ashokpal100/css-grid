/**
 * @ngdoc function
 * @name adminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the adminApp
 */
 
(function(){
  angular.module('adminApp')
  .controller('LoginCtrl',['$scope','Notification', function($scope,Notification) {
    console.log("came here LoginCtrl");
  }]);
})();