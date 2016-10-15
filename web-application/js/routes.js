'use strict';

var refugeesWelcome = angular.module('myApp', []);
Parse.initialize("VDgyb5fOkyegIrfOFI6BgBG30RJ5AYlzAcoAxDBe", "OFpil3idLXl94deNBbELNjQie6PD3RFAnfjP8H33");
refugeesWelcome.config(function($routeProvider) {
    $routeProvider.when(
        '/home',
        {
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
        });
    $routeProvider.when(
    	'/accommodation',
    	{
    		templateUrl: 'templates/accommodation.html',
    		controller: 'AccommodationController'
    	});
    $routeProvider.when(
      '/dodaj_smestaj',
      {
        templateUrl: 'templates/dodaj_smestaj.html',
        controller: 'DodajSmestajController'
      });
		$routeProvider.when(
      '/dodaj_prevoz',
      {
        templateUrl: 'templates/dodaj_prevoz.html',
        controller: 'DodajPrevozController'
      });
    $routeProvider.when(
      '/dodaj_hp',
      {
        templateUrl: 'templates/dodaj_hp.html',
        controller: 'DodajHPController'
      });
    $routeProvider.when(
    	'/login',
    	{
    		templateUrl: 'templates/login.html',
    		controller: 'LoginController'
    	});
    $routeProvider.when(
      '/signup',
      {
        templateUrl: 'templates/signup.html',
        controller: 'SignupController'
      });
    $routeProvider.when(
      '/prevoz',
      {
        templateUrl: 'templates/prevoz_lista.html',
        controller: 'PrevozController'
      });
    $routeProvider.when(
      '/pomoc',
      {
        templateUrl: 'templates/lista_hp.html',
        controller: 'PomocController'
      });
       $routeProvider.when(
      '/poslovi',
      {
        templateUrl: 'templates/lista_poslova.html',
        controller: 'ListaPoslovaController'
      });
      $routeProvider.when(
        '/dodaj_posao',
        {
          templateUrl: 'templates/dodaj_posao.html',
          controller: 'DodajPosaoController'
        });
        // Parse user check
    if(Parse.User.current()) {
      $routeProvider.otherwise(
          {
              redirectTo: '/pomoc'
          });
  } else {
    $("#logout").hide();
    $("#notLoggedHome").hide();
    $("#notLoggedJobs").hide();
    $("#notLoggedAccommodation").hide();
    $("#notLoggedTransport").hide();
    $('#notLoggedLogo').show();
      $routeProvider.otherwise(
          {
              redirectTo: '/login'
          });
  }

});
