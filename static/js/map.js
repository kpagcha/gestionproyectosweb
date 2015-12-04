function initialize() {
	var mapCanvas = document.getElementById('map');
    var mapOptions = {
      center: new google.maps.LatLng(36.53949, -6.20214),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);