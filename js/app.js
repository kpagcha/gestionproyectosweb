var app = angular.module('GestionProyectos', []);

app.controller('EstudiantesCtrl', function($scope, ws) {
	ws.getAllEstudiantes().then(function (data) {
		$scope.estudiantes = data;
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