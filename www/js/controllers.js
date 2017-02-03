angular.module('starter.controllers', [])

.controller('ShopCtrl', function($scope, $http, basketService, $ionicPopup, $rootScope) {

  $http.get("http://giroud-bit.fr:3000/api/produits").success(function(data){
    $scope.products = data;
  })

  $scope.addToBasket = function(product) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Ajouter au panier',
      template: 'Êtes-vous sûr de vouloir ajouter cet article à votre panier ?',
      cancelText: 'Annuler',
      okText: 'Oui'
    });

    confirmPopup.then(function(res) {
      if(res) {
        basketService.basketProducts.push(product);
        $rootScope.$broadcast('update');
        var alertPopup = $ionicPopup.alert({
          title: 'Ajouté',
          template: 'Produit ajouté au panier'
        });
      }
    });
  }
})

.controller('CartCtrl', function($scope, basketService, $rootScope, $ionicPopup, $location) {
  $scope.amountBasket = function() {
    var total = 0;
    $scope.products().forEach(function(product) {
      total += product.price;
    })
    return Math.round(total*100)/100;
  }

  $scope.products = function() {
    return basketService.basketProducts;
  }

  $scope.deleteFromBasket = function(index) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Supprimer',
      template: 'Êtes-vous sûr de vouloir supprimer cet article à votre panier ?',
      cancelText: 'Annuler',
      okText: 'Oui'
    });

    confirmPopup.then(function(res) {
      if(res) {
        $scope.products().splice(index,1);
        $rootScope.$broadcast('update');
      }
    });
  }
})

.controller('ProductCtrl', function($scope, $stateParams, $http) {
  $http.get("http://giroud-bit.fr:3000/api/produits/"+$stateParams['productID']).success(function(data) {
    $scope.product = data;
  })
})

.controller('TabCtrl', function($scope, basketService) {
  $scope.$on('update',function(){
    $scope.data = {
      badge : basketService.basketProducts.length
    };
  })
})

.controller('CheckoutCtrl', function($scope, $location) {
  
})

