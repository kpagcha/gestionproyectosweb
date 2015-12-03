$(document).ready(function() {
	context = $("#chart").get(0).getContext("2d");
	var data = [
	    {
	        value: 6,
	        color: "#F7464A",
	        highlight: "#FF5A5E",
	        label: "Ángel Pérez Gómez"
	    },
		{
	        value: 3,
	        color:"#46BFBD",
	        highlight: "#5AD3D1",
	        label: "Isabel Matías Robles"
	    },
	    {
	        value: 7,
	        color: "#FDB45C",
	        highlight: "#FFC870",
	        label: "Laura López Torres"
	    }
	];

	var chart = new Chart(context).PolarArea(data);
});