var app = angular.module('GestionProyectos', []);

app.controller('IndexCtrl', function($scope, ws) {

	ws.getAllStudents().then(function (data) {
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

	ws.getAllStudents().then(function (data) {
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
				"img": topics[topic]["path"].replace("?", randomInt(1, 3)),
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

app.controller('ProfessorsCtrl', function($scope, ws) {

	ws.getAllStudents().then(function (data) {
		var professorsTmp = [];

		$.each(data, function(key, student) {
			professorsTmp.push(student.tutor1);
			if (student.tutor2 && student.tutor2.len !== 0)
				professorsTmp.push(student.tutor2);
		});

		var professors = {};
		var profiles = [];

		var positions = [
			"Catedrático",
			"Titular",
			"Contratado doctor",
			"Ayudante doctor",
			"Sustituto interino"
		];

		$.each(professorsTmp, function(key, professor) {
			if (professor in professors)
				professors[professor]["count"] = professors[professor]["count"] + 1;
			else {
				var d1 = randomInt(0, 9).toString();
				var d2 = randomInt(0, 9).toString();

				professors[professor] = {};

				professors[professor] = {
					"name": professor,
					"position": positions[randomInt(0, positions.length-1)],
					"phoneFormat": "956 90 80 " + d1.toString() + d2.toString(),
					"phone": "9569080" + d1 + d2,
					"email": buildEmail(professor),
					"count": 1
				};

				var avatar = "avatar-?.png";
				var rnd = randomInt(1, 14);
				if (rnd < 10) avatar = avatar.replace("?", "0" + rnd);
				else avatar = avatar.replace("?", rnd);

				profiles.push({
					"name": professor,
					"img": avatar,
					"description": "Foto de " + professor
				});
			}
		});

		var projectParticipation = new Array();

		$.each(professors, function(key, professor) {
			projectParticipation.push({
				name: professor["name"],
				projectCount: professor["count"]
			});
		});

		projectParticipation = projectParticipation.sort(function (a, b) {
			a = a.projectCount;
			b = b.projectCount;
			return a > b ? -1 : (a < b ? 1 : 0);
		});

		var ranking = [];
		for (i = 0; i < 3; i++) {
			ranking.push({
				"name": projectParticipation[i].name,
				"projectCount": projectParticipation[i].projectCount
			});
		}

		$scope.professors = professors;
		$scope.profiles = profiles;
		$scope.ranking = ranking;

		context = $("#chart").get(0).getContext("2d");
		var data = [
		    {
		        value: ranking[0].projectCount,
		        color: "#F7464A",
		        highlight: "#FF5A5E",
		        label: ranking[0].name
		    },
			{
		        value: ranking[1].projectCount,
		        color:"#46BFBD",
		        highlight: "#5AD3D1",
		        label: ranking[1].name
		    },
		    {
		        value: ranking[2].projectCount,
		        color: "#FDB45C",
		        highlight: "#FFC870",
		        label: ranking[2].name
		    }
		];

		var chart = new Chart(context).PolarArea(data);
	});

});

app.controller('AdminCtrl', function($scope, ws) {

	$scope.project = {
		state: "presentado",
		topic: "Domótica"
	};

	$scope.today = new Date();

	$scope.submitCreateForm = function(form) {
		var project = $scope.project;
		var params = {
			"nombre": project.name,
			"primerApellido": project.firstLastName,
			"segundoApellido": project.secondLastName,
			"tituloProyecto": project.title,
			"tutor1": project.tutor,
			"tutor2": project.cotutor,
			"estadoProyecto": project.state,
			"fechaPresentacionProyecto": project.date ? dateFormat(project.date, "dd-mm-yyyy") : "",
			"calificacionProyecto": project.mark
		};

		if (form.$valid) {
			ws.postCreateStudent(params).then(function(data) {
				if (!data || data.length === 0) {
					$scope.error = "Ha habido un problema en el servidor";
				} else {
					$scope.success = "Se ha creado el proyecto con éxito";
					$scope.reset($scope.create);

					$scope.resultProject = {};
					$scope.resultProject = {
						"studentName": (data.nombre + " " + data.primerApellido + " " + data.segundoApellido).trim(),
						"title": data.tituloProyecto,
						"tutor": data.tutor1,
						"cotutor": data.tutor2,
						"state": data.estadoProyecto.charAt(0).toUpperCase() + data.estadoProyecto.slice(1),
						"date": data.fechaPresentacionProyecto,
						"mark": data.calificacionProyecto
					};
				}
			});
		}
	};

	$scope.submitUpdateForm = function(form) {
		var project = $scope.project;
		var key = project.key;
		var params = {
			"tituloProyecto": project.title,
			"estadoProyecto": project.state,
			"fechaPresentacionProyecto": project.date ? dateFormat(project.date, "dd-mm-yyyy") : "",
			"calificacionProyecto": project.mark
		};

		if (form.$valid) {
			ws.putUpdateStudent(key, params).then(function(data) {
				if (!data || data.length === 0) {
					$scope.error = "Ha habido un problema en el servidor";
				} else {
					$scope.success = "Se ha actualizado el proyecto con éxito";
					$scope.reset($scope.update);

					$scope.resultProject = {};
					$scope.resultProject = {
						"studentName": (data.nombre + " " + data.primerApellido + " " + data.segundoApellido).trim(),
						"title": data.tituloProyecto,
						"tutor": data.tutor1,
						"cotutor": data.tutor2,
						"state": data.estadoProyecto.charAt(0).toUpperCase() + data.estadoProyecto.slice(1),
						"date": data.fechaPresentacionProyecto,
						"mark": data.calificacionProyecto
					};
				}
			});
		}
	}

	$scope.reset = function(form) {
		$scope.project = {
			name: "",
			firstLastName: "",
			secondLastName: "",
			email: "",
			title: "",
			topic: "Domótica",
			tutor: "",
			cotutor: "",
			state: "presentado",
			date: "",
			mark: ""
		};
		$scope.selectedState = $scope.project.state;
		form.$setPristine();
		form.$setUntouched();
	}

	$scope.resetFormState = function() {
		$scope.error = null;
		$scope.resultProject = null;
	}
		
	$scope.changeState = function(state) {
		$scope.selectedState = state;
	};
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
		getAllStudents: function() {
			var url = full_path + get_all_estudiantes_path;
			return $http.get(url).then(function(response) {
				return response.data;
			});
		},
		postCreateStudent: function(json) {
			var url = full_path + create_estudiante_path;
			var data = JSON.stringify(json);
			return $http.post(url, data).then(function(response) {
				return response.data;
			});
		},
		putUpdateStudent: function(key, json) {
			var url = full_path + update_estudiante_path + "/" + key;
			var data = JSON.stringify(json);
			return $http.put(url, data).then(function(response) {
				return response.data;
			});
		}
	}
});

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function buildEmail(name) {
	return name.latinise().toLowerCase().split(" ").join("") + "@uca.es";
}