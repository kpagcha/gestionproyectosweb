var app = angular.module('GestionProyectos', []);

app.controller('IndexCtrl', function($scope, ws) {

	ws.getAllEstudiantes().then(function (data) {
		var count = 0;
		var limit = 6;
		var projects = [];
		$.each(data, function(key, student) {
			projects.push({
				"studentName": (student.nombre + " " + student.primerApellido + " " + student.segundoApellido).trim(),
				"title": student.tituloProyecto
			});

			count++;
			return count < limit;
		});

		$scope.projects = projects;
	});

});

app.controller('ProjectsCtrl', function($scope, ws) {

	ws.getAllEstudiantes().then(function (data) {
		var projects = [];

		var topics = {
			"Domótica": {
				"count": 0,
				"path": "domotica_?.png",
				"alt": "Imagen icónica representativa de la domótica"
			},
			"Salud": {
				"count": 0,
				"path": "salud_?.png",
				"alt": "Imagen icónica representativa de la sulud"
			},
			"Turismo": {
				"count": 0,
				"path": "turismo_?.png",
				"alt": "Imagen icónica representativa del turismo"
			}
		}
		var keys = Object.keys(topics);

		$.each(data, function(key, student) {
			var topic = keys[randomInt(0, keys.length-1)];

			topics[topic]["count"]++;

			projects.push({
				"studentName": (student.nombre + " " + student.primerApellido + " " + student.segundoApellido).trim(),
				"title": student.tituloProyecto,
				"tutor": student.tutor1,
				"cotutor": student.tutor2,
				"state": student.estadoProyecto.charAt(0).toUpperCase() + student.estadoProyecto.slice(1),
				"date": student.fechaPresentacionProyecto,
				"mark": student.calificacionProyecto,
				"topic": topic,
				"img": topics[topic]["path"].replace("?", randomInt(1, keys.length)),
				"imgDescription": topics[topic]["alt"]
			});
		});

		$scope.homeAutomation = topics["Domótica"]["count"];
		$scope.health = topics["Salud"]["count"];
		$scope.tourism = topics["Turismo"]["count"];

		$scope.projects = projects;

		context = $("#chart").get(0).getContext("2d");
		var data = [
		    {
		        value: topics["Domótica"]["count"],
		        color: "#46BFBD",
		        highlight: "#5AD3D1",
		        label: "Domótica"
		    },
			{
		        value: topics["Salud"]["count"],
		        color:"#F7464A",
		        highlight: "#FF5A5E",
		        label: "Salud"
		    },
		    {
		        value: topics["Turismo"]["count"],
		        color: "#FED750",
		        highlight: "#FEE36B",
		        label: "Turismo"
		    }
		];

		var chart = new Chart(context).Pie(data);
	});

});

app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

app.factory('ws', function($http, $q) {
	var host = "http://localhost";
	var port = "8080";
	var name = "GestionProyectos";
	var service_path = "api/estudiantes";
	var full_path = host + ":" + port + "/" + name + "/" + service_path;

	var get_all_estudiantes_path = "/";
	var get_estudiante_path = "/buscar";
	var create_estudiante_path = "/crear";
	var update_estudiante_path = "/actualizar";
	var delete_estudiante_path = "/eliminar";

	return {
		getAllEstudiantes: function() {
			var url = full_path + get_all_estudiantes_path;
			return $http.get(url).then(function(response) {
				return response.data;
			});
		}
	}
});

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}