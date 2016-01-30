$( document ).ready(function() {

	// Intialize GMaps
    var map = new GMaps({
        el: '#map',
        lat: 33.7863164,
        lng: -84.3837829,
        zoomControl : true,
        zoomControlOpt: {
            style : 'SMALL',
            position: 'TOP_LEFT'
        },
        panControl : false,
        streetViewControl : false,
        mapTypeControl: false,
        overviewMapControl: false,
        scrollwheel: false
    });
    
    map.addMarker({
		lat: 33.7863164,
		lng: -84.3837829,
		title: 'Our Office'
	});

});