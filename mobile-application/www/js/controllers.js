angular.module('starter.controllers', [])

.controller("SideBarController", function ($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }
})

.controller('PocetnaCtrl', function($scope) {

})

.controller('EmbassyCtrl', function($scope, $ionicSideMenuDelegate, $ionicLoading, $compile, $window) {
  $ionicSideMenuDelegate.toggleLeft();
  function initialize() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: {lat: -34.397, lng: 150.644}
    });
    var geocoder = new google.maps.Geocoder();
    geocodeAddress(geocoder, map);
    $scope.map = map;
  }
  function geocodeAddress(geocoder, resultsMap) {
    var address = 'Aleksandra Stamboliskog, Belgrade';
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

      $window.initialize = initialize; // callback in global context

      function loadScript(src) {
          var script = document.createElement("script");
          script.type = "text/javascript";
          document.getElementsByTagName("head")[0].appendChild(script);
          script.src = src;
      }

      loadScript('http://www.google.com.mt/jsapi');
      loadScript('http://maps.googleapis.com/maps/api/js?key=&v=3&sensor=true&callback=initialize');



      $scope.centerOnMe = function () {
          if (!$scope.map) {
              return;
          }

          $scope.loading = $ionicLoading.show({
              content: 'Getting location',
              showBackdrop: false
          });

          navigator.geolocation.getCurrentPosition(function (pos) {
              $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
              $scope.loading.hide();
          }, function (error) {
              alert('Unable to get location: ' + error.message);
          });
      };

})

.controller('ExchangeRateCtrl', function($scope, $ionicSideMenuDelegate) {
  $ionicSideMenuDelegate.toggleLeft();
})

.controller('ImportantPhoneNumbersCtrl', function($scope, $ionicSideMenuDelegate, RefugeesFactory) {
  $ionicSideMenuDelegate.toggleLeft();

  RefugeesFactory.getObject('VazniBrojevi')
  .then(function (data) {
        $scope.numbers = data;
  })
  .catch(function (object, error) {
      console.log('error');
  });
})

.controller('UsefulLinksCtrl', function($scope, $ionicSideMenuDelegate, RefugeesFactory) {
  $ionicSideMenuDelegate.toggleLeft();

  RefugeesFactory.getObject('KorisniLinkovi')
  .then(function (data) {
        $scope.links = data;
  })
  .catch(function (object, error) {
      console.log('error');
  });
})

.controller('AccommodationCtrl', function($scope, $ionicSideMenuDelegate, $ionicScrollDelegate, RefugeesFactory) {

  $scope.getItems = function (accommodation) {

    RefugeesFactory.getObject('Tip')
    .then(function (data1) {
          RefugeesFactory.getObject('Smestaj')
          .then(function (data) {
            var acc = [];
            var prvAcc = [];

            for(var i = 0; i < data.length; i++) {
              if(data[i].tipID.objectId == data1[0].objectId) {
                prvAcc.push(data[i]);
              }
            }
            for(var i = 0; i < data.length; i++) {
              if(data[i].tipID.objectId == data1[1].objectId) {
                acc.push(data[i]);
              }
            }

            if(accommodation == 1) {
              $scope.accommodations = prvAcc;
            }
            if(accommodation == 2){
              $scope.accommodations = acc;
            }

          })
          .catch(function (object, error) {
              console.log('error');
          });

        })
        .catch(function (object, error) {
            console.log('error');
        });
      }

  $scope.selectedAccommodation = 1;
  $scope.checkAccommodation = function (accommodation) {
      if (accommodation == 1) {
          $scope.firstTab = 'tabActive active';
          $scope.secondTab = 'tabDeactive';
      } else {
          $scope.firstTab = 'tabDeactive';
          $scope.secondTab = 'tabActive active';
      }
  }
  $scope.$watch('selectedAccommodation', function (sd) {
      if (sd) {
          $scope.checkAccommodation(sd);
          $scope.getItems(sd);
          console.log('tab active:' + sd);
          $ionicScrollDelegate.scrollTop();
      }
  })

})

.controller('AccommodationSingleViewCtrl', function($scope, $ionicSideMenuDelegate, $stateParams, RefugeesFactory, $cordovaSocialSharing, $ionicLoading, $compile, $window) {
  $scope.listCanSwipe = true;
	$scope.refreshVal = false;

  var id = $stateParams.accommodationId;
  var naziv = "";
  var adresa = "";
  var telefon = "";
  RefugeesFactory.getObject('Smestaj')
  .then(function (data) {
    for(var i = 0; i < data.length; i++) {
      if(data[i].objectId == id) {
        $scope.accommodation = data[i];
        naziv = data[i].naziv;
        adresa = data[i].adresa;
        RefugeesFactory.getLocation(adresa, $scope);
        telefon = data[i].telefon;
        console.log("Name: " + data[i].naziv + ", " + "Adress: " + data[i].adresa + ", " + "Telephone: " + data[i].telefon);
        $scope.share = function() {
          $cordovaSocialSharing.share("Name: " + naziv + ", " + "Adress: " + adresa + ", " + "Telephone: " + telefon, "Refugees Welcome", null, null);
        }
      }
    }

  })
  .catch(function (object, error) {
      console.log('error');
  });
})

.controller('HumanitarianAidCtrl', function($scope, $ionicSideMenuDelegate, RefugeesFactory) {

  RefugeesFactory.getObject('HumanitarnaPomoc')
  .then(function (data) {
        $scope.humanitarianAids = data;
  })
  .catch(function (object, error) {
      console.log('error');
  });
})

.controller('HumanitarianAidSingleCtrl', function($scope, $ionicSideMenuDelegate, $stateParams, RefugeesFactory, $cordovaSocialSharing, $ionicLoading, $compile, $window) {

  var id = $stateParams.humanitarianAidId;

  RefugeesFactory.getObject('HumanitarnaPomoc')
  .then(function (data) {
    for(var i = 0; i < data.length; i++)
      if(data[i].objectId == id) {
        $scope.humanitarianAid = data[i];
        naziv = data[i].naziv;
        adresa = data[i].adresa;
        RefugeesFactory.getLocation(adresa, $scope);
        telefon = data[i].telefon;
        $scope.share = function() {
          $cordovaSocialSharing.share("Name: " + naziv + ", " + "Adress: " + adresa + ", " + "Telephone: " + telefon, "Refugees Welcome", null, null);
        }
      }
  })
  .catch(function (object, error) {
      console.log('error');
  });
})

.controller('TransportCtrl', function($scope, $ionicSideMenuDelegate, RefugeesFactory) {

  RefugeesFactory.getObject('Prevoz')
  .then(function (data) {
        $scope.transports = data;
  })
  .catch(function (object, error) {
      console.log('error');
  });
})

.controller('GetAJobCtrl', function($scope, $ionicSideMenuDelegate, RefugeesFactory) {

  RefugeesFactory.getObject('Poslovi')
  .then(function (data) {
        $scope.jobs = data;
  })
  .catch(function (object, error) {
      console.log('error');
  });
})

.controller('GetAJobSingleViewCtrl', function($scope, $ionicSideMenuDelegate, $stateParams, RefugeesFactory, $rootScope, $ionicLoading, $compile, $window) {

  var id = $stateParams.jobId;

  RefugeesFactory.getObject('Poslovi')
  .then(function (data) {
    var adresa = "";
    for(var i = 0; i < data.length; i++) {
      if(data[i].objectId == id) {
        $scope.job = data[i];
        adresa = data[i].adresa;
        RefugeesFactory.getLocation(adresa, $scope);
      }
    }

  })
  .catch(function (object, error) {
      console.log('error');
  });
})
