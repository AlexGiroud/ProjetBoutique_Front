angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabCtrl'
  })

  .state('tab.shop', {
    url: '/shop',
    views: {
      'shopView': {
        templateUrl: 'templates/shop.html',
        controller: 'ShopCtrl'
      }
    }
  })

  .state('tab.product', {
    url: '/product/:productID',
    views: {
      'shopView': {
        templateUrl: 'templates/product.html',
        controller: 'ProductCtrl'
      }
    }
  })

  .state('tab.cart', {
    url: '/cart',
    views: {
      'cartView': {
        templateUrl: 'templates/cart.html',
        controller: 'CartCtrl'
      }
    }
  })

  .state('tab.checkout', {
    url: '/checkout',
    views: {
      'cartView': {
        templateUrl: 'templates/checkout.html',
        controller: 'CheckoutCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/shop');
});


