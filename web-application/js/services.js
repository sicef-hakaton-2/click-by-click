"use strict";

refugeesWelcome.value('version', '0.1');

refugeesWelcome.service("UtilSrvc", function ($http) {
    return {
        getObject: function(className) {
            return $http.get('https://api.parse.com/1/classes/' + className + '/', {
            headers: {
            'X-Parse-Application-Id':'VDgyb5fOkyegIrfOFI6BgBG30RJ5AYlzAcoAxDBe',
            'X-Parse-REST-API-Key':'pkMWODDNilI9Wf83CV9t79RsobBfF3kmjdUhmmgU'}
            })
            .then(function(response) {
            return response.data.results;
            });
        },
        helloWorld : function(name) {
        	var result = "Hum, Hello you, but your name is too weird...";
        	if (this.isAString(name)) {
        		result = "Hello, " + name;
        	}
        	return result;
        }
    }
});
