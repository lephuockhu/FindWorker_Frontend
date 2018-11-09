(function () {
	'use strict';

	angular
		.module('app')
		.constant('seed', {
			LOCALHOST: "http://18.217.245.123",
			// LOCALHOST: "http://localhost:3000",
			LIMIT: 10,
			PAGE: 1,
			GEOLOCATION: { LAT: 10.9555, LONG: 106.8014, ZOOM: 13 },
			KEY_ID_GOOGLE_MAPS: "AIzaSyAZsYFGOWjueUxBA2us0nRjQ6cOqyJHmHg",
			GOOGLE_MAPS_URL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAZsYFGOWjueUxBA2us0nRjQ6cOqyJHmHg"
		});

})();