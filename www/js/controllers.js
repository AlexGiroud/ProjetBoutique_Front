angular.module('starter.controllers', [])

.controller('ShopCtrl', function($scope, $http, basketService, ) {

  $http.get("http://giroud-bit.fr:3000/api/produits").success(function(data){
    $scope.products = data;
  })

  $scope.addToBasket = function(product) {
    basketService.basketProducts.push(product);
  }
  
})

.controller('CartCtrl', function($scope, basketService) {
  $scope.products = basketService.basketProducts;

  $scope.amountBasket = function() {
    var amount = 0;
    for(product in $basket.products) {
      amount += product.price;
    }
    return amount;
  }
})

.controller('ProductCtrl', function($scope, $stateParams, $http) {
  $http.get("http://giroud-bit.fr:3000/api/produits/"+$stateParams['productID']).success(function(data) {
    $scope.product = data;
  })
})

