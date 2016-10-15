angular.module('starter')

.factory('RefugeesFactory', function($http, $window, $compile, $ionicLoading) {
    var RefugeesFactory = {};

	RefugeesFactory.getObject = function(className) {
    return $http.get('https://api.parse.com/1/classes/' + className + '/', {
      headers: {
        'X-Parse-Application-Id':'VDgyb5fOkyegIrfOFI6BgBG30RJ5AYlzAcoAxDBe',
        'X-Parse-REST-API-Key':'pkMWODDNilI9Wf83CV9t79RsobBfF3kmjdUhmmgU'}
      })
      .then(function(response) {
        return response.data.results;
      });
  };

  RefugeesFactory.getLocation = function(lokacija, $scope) {
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
      var address = lokacija;
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
  }
    //returning function
    return RefugeesFactory;
})
