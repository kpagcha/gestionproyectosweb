$(document).ready(function() {
	context = $("#chart").get(0).getContext("2d");
	var data = [
	    {
	        value: 11,
	        color: "#46BFBD",
	        highlight: "#5AD3D1",
	        label: "Domótica"
	    },
		{
	        value: 3,
	        color:"#F7464A",
	        highlight: "#FF5A5E",
	        label: "Salud"
	    },
	    {
	        value: 4,
	        color: "#FED750",
	        highlight: "#FEE36B",
	        label: "Turismo"
	    }
	];

	var chart = new Chart(context).Pie(data);
});