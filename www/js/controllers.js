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

.controller('CheckoutCtrl', function($scope, basketService, $ionicPopup) {
  $scope.amountBasket = function() {
    var total = 0;
    basketService.basketProducts.forEach(function(product) {
      total += product.price;
    })
    return Math.round(total*100)/100;
  }

  $scope.validateCheckout = function(cardNumber, cryptoNumber) {
    if (!cardNumberCheck(cardNumber)) {
      var alertPopup = $ionicPopup.alert({
        title: 'Erreur',
        template: "Votre numéro de carte bleue n'est pas valide"
      });
    } else if (!cryptoCheck(cryptoNumber)) {
      var alertPopup = $ionicPopup.alert({
        title: 'Erreur',
        template: "Votre crypto n'est pas au bon format"
      });
    } else {
      var alertPopup = $ionicPopup.alert({
        title: 'Succès',
        template: 'Votre paiement a bien été effectué'
      });
    }
  }

  function cardNumberCheck(inputTxt) {
    // Hardcore regex parce que j'en avais marre de pas trouver une qui marche
    var re = new RegExp("^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$");
    if (re.test(inputTxt)) {
      return true;
    } else {
      return false;
    }
  }

  function cryptoCheck(inputTxt) {
    var re = new RegExp("^[0-9]{3}$");
    if (re.test(inputTxt)) {
      return true;
    } else {
      return false;
    }
  }
})

