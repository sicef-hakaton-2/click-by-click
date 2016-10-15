angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.backButton.text('');
  $ionicConfigProvider.backButton.previousTitleText(false);

  $stateProvider
  .state('pocetna', {
    url: '/pocetna',
    templateUrl: 'templates/pocetna.html',
    controller: 'PocetnaCtrl'
  })
  .state('embassy', {
    url: '/embassy',
    templateUrl: 'templates/embassy.html',
    controller: 'EmbassyCtrl'
  })
  .state('exchange-rate', {
    url: '/exchange-rate',
    templateUrl: 'templates/exchange-rate.html',
    controller: 'ExchangeRateCtrl'
  })
  .state('important-phone-numbers', {
    url: '/important-phone-numbers',
    templateUrl: 'templates/important-phone-numbers.html',
    controller: 'ImportantPhoneNumbersCtrl'
  })
  .state('useful-links', {
    url: '/useful-links',
    templateUrl: 'templates/useful-links.html',
    controller: 'UsefulLinksCtrl'
  })
	.state('accommodation', {
		url: '/accommodation',
		templateUrl: 'templates/accommodation.html',
		controller: 'AccommodationCtrl'
	})
  .state('accommodation-single-view', {
		url: '/accommodation-single-view/:accommodationId/',
		templateUrl: 'templates/accommodation-single-view.html',
		controller: 'AccommodationSingleViewCtrl'
	})
  .state('humanitarian-aid', {
		url: '/humanitarian-aid',
		templateUrl: 'templates/humanitarian-aid.html',
		controller: 'HumanitarianAidCtrl'
	})
  .state('humanitarian-aid-single', {
		url: '/humanitarian-aid-single/:humanitarianAidId/',
		templateUrl: 'templates/humanitarian-aid-single.html',
		controller: 'HumanitarianAidSingleCtrl'
	})
  .state('transport', {
		url: '/transport',
		templateUrl: 'templates/transport.html',
		controller: 'TransportCtrl'
	})
  .state('get-a-job', {
		url: '/get-a-job',
		templateUrl: 'templates/get-a-job.html',
		controller: 'GetAJobCtrl'
	})
  .state('get-a-job-single-view', {
		url: '/get-a-job-single-view/:jobId/',
		templateUrl: 'templates/get-a-job-single-view.html',
		controller: 'GetAJobSingleViewCtrl'
	})


  $urlRouterProvider.otherwise('/pocetna');
});
