angular.module('starter.controllers', [])

.controller('ShopCtrl', function($scope, $http) {
  
  $http.get("http://giroud-bit.fr:3000/api/produits").success(function(data){
    $scope.products = data;
  })
})

.controller('CartCtrl', function($scope) {

})

.controller('ProductCtrl', function($scope) {

})

