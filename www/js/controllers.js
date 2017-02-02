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

.controller('CartCtrl', function($scope, basketService) {
  $scope.products = basketService.basketProducts;

  $scope.amountBasket = function() {
    var amount = 0;
    for(product in $scope.products) {
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

.controller('TabCtrl', function($scope, basketService) {
  $scope.$on('update',function(){
    $scope.data = {
      badge : basketService.basketProducts.length
    };
  })
})

