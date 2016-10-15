'use strict';

refugeesWelcome.controller("IndexController" ,function ($scope, $http, $window) {
	$("#logout").click(function(){
	    Parse.User.logOut();
	    alert("You have logged out!");
		$window.location.href = "";
	});
});

refugeesWelcome.controller("HomeController" ,function ($scope, $http, $window, UtilSrvc) {
	$("#logout").show();
	$("#notLoggedHome").show();
	$("#notLoggedAccommodation").show();
	$("#notLoggedJobs").show();
	$("#notLoggedTransport").show();
	$("#notLoggedLogo").hide();
});

refugeesWelcome.controller("SignupController" ,function ($scope, $http, $window, UtilSrvc) {
	$scope.user = [];

	$scope.register = function() {
		var user = new Parse.User();
		user.set("username", $scope.user.username);
		user.set("password", $scope.user.password);
		user.set("email", $scope.user.email);

		user.signUp(null, {
		  success: function(user) {
		    alert("You are registered!");
			$window.location.href = "";
		  },
		  error: function(user, error) {
		    // Show the error message somewhere and let the user try again.
		    alert("Error: " + error.code + " " + error.message);
		  }
		});
	}
});

refugeesWelcome.controller("PomocController" ,function ($scope, $http, $window, UtilSrvc) {
	$scope.goTo = function() {
		$window.location.href="#/dodaj_hp";
	}
	var humanitarnePomoci = [];
	UtilSrvc.getObject('HumanitarnaPomoc')
	.then(function (data) {
		for(var i = 0; i < data.length; i++) {
			if(data[i].userID.objectId == Parse.User.current().id) {
				humanitarnePomoci.push(data[i]);
			}
		}
		$scope.humanitarnePomoci = humanitarnePomoci;
	});

	$scope.delete = function(objectId) {
		var Hpomoc = Parse.Object.extend("HumanitarnaPomoc");
		var hpomoc = new Parse.Query(Hpomoc);
		hpomoc.get(objectId, {
		  success: function(myObj) {
		    // The object was retrieved successfully.
		    myObj.destroy({});
			alert("Uspesno ste izbrisali smestaj");

			window.location.reload();

			//$window.reload(); //.href="#/accommodation";
		  },
		  error: function(object, error) {
		    // The object was not retrieved successfully.
		    // error is a Parse.Error with an error code and description.
		  }
		});
	}

});

refugeesWelcome.controller("PrevozController" ,function ($scope, $http, $window, UtilSrvc) {
	var prevozi = [];

	$scope.goTo = function() {
		$window.location.href="#/dodaj_prevoz";
	}
	UtilSrvc.getObject('Prevoz')
	.then(function (data) {
		for(var i = 0; i < data.length; i++) {
			if(data[i].userID.objectId == Parse.User.current().id) {
				prevozi.push(data[i]);
			}
		}
		$scope.prevozi = prevozi;
	});

	$scope.delete = function(objectId) {
		console.log(objectId);
		var Prevoz = Parse.Object.extend("Prevoz");
		var prevoz = new Parse.Query(Prevoz);
		prevoz.get(objectId, {
		  success: function(myObj) {
		    // The object was retrieved successfully.
		    myObj.destroy({});
			alert("Uspesno ste izbrisali smestaj");

			window.location.reload();

			//$window.reload(); //.href="#/accommodation";
		  },
		  error: function(object, error) {
		    // The object was not retrieved successfully.
		    // error is a Parse.Error with an error code and description.
		  }
		});
	}
});

refugeesWelcome.controller("LoginController",function ($scope, $http, $window) {
	$scope.getLoginData = function($event) {
		$event.preventDefault();
		var username = '';
		var password = '';

		username = $scope.user.username;
		password = $scope.user.password;
		$event.preventDefault();
		$scope.user = [];
		Parse.User.logIn(username, password, {
		    success: function(user) {
			  $window.location.href = "";
		    },
		    error: function(user, error) {
		    	console.log(error.message);
		    }
		 });
	}
});

refugeesWelcome.controller("DodajSmestajController" ,function ($scope, $window) {
	$scope.radioButton = 'VkwqWVjBvH';
	$scope.address = '';
	$scope.name = '';
	$scope.description = '';
	$scope.phoneNumber = '';
	$scope.add = function() {
		var address = '';
		var name = '';
		var description = '';
		var phoneNumber = '';

		if($scope.address !== ' ') {
			address = $scope.address;
		}
		if($scope.name !== ' ') {
			name = $scope.name;
		}
		if($scope.description !== ' ') {
			description = $scope.description;
		}
		if($scope.phoneNumber !== ' ') {
			phoneNumber = $scope.phoneNumber;
		}

		var Smestaj = Parse.Object.extend("Smestaj");
		var smestaj = new Smestaj();
		var currentUser = Parse.User.current();
		var pointer = $scope.radioButton;
		smestaj.set("adresa", address);
		smestaj.set("naziv", name);
		smestaj.set("opis", description);
		smestaj.set("telefon", phoneNumber);
		smestaj.set("userID",  currentUser);
		smestaj.set("tipID", {"__type":"Pointer","className":"Tip","objectId":""+ pointer +""});

		smestaj.save(null, {
		  success: function(smestaj) {
		    alert('You just posted accommodation');
			$window.location.href="#/accommodation";
		  },
		  error: function(smestaj, error) {
		    alert('Failed to post accommodation: ' + error.message);
		  }
		});
	}

});

refugeesWelcome.controller("AccommodationController" ,function ($scope, $window, UtilSrvc, $http) {
	var smestaji = [];
	$scope.goTo = function() {
		$window.location.href="#/dodaj_smestaj";
	}

	$scope.delete = function(objectId) {
		console.log(objectId);
		var Smestaj = Parse.Object.extend("Smestaj");
		var smestaj = new Parse.Query(Smestaj);
		smestaj.get(objectId, {
		  success: function(myObj) {
		    // The object was retrieved successfully.
		    myObj.destroy({});
			alert("Uspesno ste izbrisali smestaj");

			window.location.reload();

			//$window.reload(); //.href="#/accommodation";
		  },
		  error: function(object, error) {
		    // The object was not retrieved successfully.
		    // error is a Parse.Error with an error code and description.
		  }
		});
	}

	UtilSrvc.getObject('Smestaj')
	.then(function (data) {
		for(var i = 0; i < data.length; i++) {
			if(data[i].userID.objectId == Parse.User.current().id) {
				smestaji.push(data[i]);
			}
		}
		$scope.smestaji = smestaji;
	});
});

refugeesWelcome.controller("ListaPoslovaController" ,function ($scope, $window, UtilSrvc, $http) {
	var poslovi = [];
	$scope.goTo = function() {
		$window.location.href="#/dodaj_posao";
	}

	$scope.delete = function(objectId) {
		console.log(objectId);
		var Poslovi = Parse.Object.extend("Poslovi");
		var posao = new Parse.Query(Poslovi);
		posao.get(objectId, {
		  success: function(myObj) {
		    // The object was retrieved successfully.
		    myObj.destroy({});
			alert("Uspesno ste izbrisali posao");
			window.location.reload();
		  },
		  error: function(object, error) {
		    // The object was not retrieved successfully.
		    // error is a Parse.Error with an error code and description.
		  }
		});
	}

	UtilSrvc.getObject('Poslovi')
	.then(function (data) {
		for(var i = 0; i < data.length; i++) {
			if(data[i].userID.objectId == Parse.User.current().id) {
				poslovi.push(data[i]);
			}
		}
		$scope.poslovi = poslovi;
	});
});

refugeesWelcome.controller("DodajPrevozController" ,function ($scope, $window, UtilSrvc, $http) {
	$scope.address = '';
	$scope.startGR = '';
	$scope.addressStart = '';
	$scope.endGR = '';
	$scope.timeStart = '';
	$scope.passangersLeft = '';
	$scope.maxPassangers = '';
	$scope.add = function($event) {
		$event.preventDefault();
		var address = '';
		var startGR = '';
		var addressStart = '';
		var endGR = '';
		var timeStart = '';
		var passangersLeft = '';
		var maxPassangers = '';

		if($scope.address !== ' ') {
			address = $scope.address;
		}
		if($scope.startGR !== ' ') {
			startGR = $scope.startGR;
		}
		if($scope.addressStart !== ' ') {
			addressStart = $scope.addressStart;
		}
		if($scope.endGR !== ' ') {
			endGR = $scope.endGR;
		}
		if($scope.timeStart !== ' ') {
			timeStart = $scope.timeStart;
		}
		if($scope.passangersLeft !== ' ') {
			passangersLeft = $scope.passangersLeft;
		}
		if($scope.maxPassangers !== ' ') {
			maxPassangers = $scope.maxPassangers;
		}

		var Prevoz = Parse.Object.extend("Prevoz");
		var prevoz = new Prevoz();
		var currentUser = Parse.User.current();
		prevoz.set("broj_putnika", maxPassangers);
		prevoz.set("ime_odredisnog_gp", endGR);
		prevoz.set("ime_polaznog_gp", startGR);
		prevoz.set("odredisna_adresa", address);
		prevoz.set("polazna_adresa",  addressStart);
		prevoz.set("preostali_broj_putnika", passangersLeft);
		prevoz.set("vreme_polaska",  timeStart);
		prevoz.set("userID", currentUser);

		prevoz.save(null, {
		  success: function(smestaj) {
		    alert('Uspesno ste dodali prevoznika');
			$window.location.href="#/prevoz";
		  },
		  error: function(smestaj, error) {
		    alert('Failed to post prevoz: ' + error.message);
		  }
		});
	}
});

refugeesWelcome.controller("DodajHPController" ,function ($scope, $window, UtilSrvc, $http) {
	$scope.address = '';
	$scope.name = '';
	$scope.description = '';
	$scope.phoneNumber = '';
	$scope.add = function() {
		var address = '';
		var name = '';
		var description = '';
		var phoneNumber = '';

		if($scope.address !== ' ') {
			address = $scope.address;
		}
		if($scope.name !== ' ') {
			name = $scope.name;
		}
		if($scope.description !== ' ') {
			description = $scope.description;
		}
		if($scope.phoneNumber !== ' ') {
			phoneNumber = $scope.phoneNumber;
		}

		var HumanitarnaPomoc = Parse.Object.extend("HumanitarnaPomoc");
		var hp = new HumanitarnaPomoc();
		var currentUser = Parse.User.current();
		hp.set("adresa", address);
		hp.set("naziv", name);
		hp.set("opis", description);
		hp.set("telefon", phoneNumber);
		hp.set("userID",  currentUser);

		hp.save(null, {
		  success: function(hp) {
		    alert('Dodali ste Humanitarnu organizaciju');
			$window.location.href="#/pomoc";
		  },
		  error: function(hp, error) {
		    alert('Failed to post pomoc: ' + error.message);
		  }
		});
	}

});

refugeesWelcome.controller("DodajPosaoController" ,function ($scope, $window, UtilSrvc, $http) {
	$scope.address = '';
	$scope.name = '';
	$scope.description = '';
	$scope.phoneNumber = '';
	$scope.add = function() {
		var address = '';
		var name = '';
		var description = '';
		var phoneNumber = '';

		if($scope.address !== ' ') {
			address = $scope.address;
		}
		if($scope.name !== ' ') {
			name = $scope.name;
		}
		if($scope.description !== ' ') {
			description = $scope.description;
		}
		if($scope.phoneNumber !== ' ') {
			phoneNumber = $scope.phoneNumber;
		}

		var Poslovi = Parse.Object.extend("Poslovi");
		var posao = new Poslovi();
		var currentUser = Parse.User.current();
		posao.set("adresa", address);
		posao.set("naziv", name);
		posao.set("opis", description);
		posao.set("telefon", phoneNumber);
		posao.set("userID",  currentUser);

		posao.save(null, {
		  success: function(posao) {
		    alert('Dodali ste posao');
			$window.location.href="#/poslovi";
		  },
		  error: function(posao, error) {
		    alert('Failed to post accommodation: ' + error.message);
		  }
		});
	}

});
