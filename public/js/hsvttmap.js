HSV_TT.map = {};

var map = null;

// this needs to go in JSON file... ------------
var routeNames = [['Downtown','green']];
//                need to coordinate route color scheme with city transit scheme....   
//                ['Blue Coreloop','blue'],['Red Coreloop','red'],['Route 3',someColor],
//                ['Route 4',someColor],['Route 5',someColor],['Route 6',someColor],
//                ['Route 7',someColor],['Route 8',someColor],['Route 9',someColor],
//                ['UAH',someColor];
//----------------------------------------------

var routeLayers = [];
var stopLocationCircle = null;
var nextStopMark = null;
				  
var trolleyHomeLocation = {latlng: {lat: 34.73689, lng: -86.59192} };
var locationOfQuery = null;
var fireIcon = L.Icon.Default.extend({
	options: {
	  iconUrl: '/images/firetruck.png',
      iconSize: [25, 25],
	  iconAnchor: [12, 30],
	  popupAnchor: [1, -30]  
	}
  });
var emtIcon = L.Icon.Default.extend({
	options: {
	  iconUrl: '/images/ambulance_160.png',
      iconSize: [15, 10],
	  iconAnchor: [7, 20],
	  popupAnchor: [1, -20]  
	}
  });
var policeIcon = L.Icon.Default.extend({
	options: {
	  iconUrl: '/images/policecar_160.png',
      iconSize: [15, 10],
	  iconAnchor: [12, 30],
	  popupAnchor: [1, -30]  
	}
  });
  
var destCoordinates = [ 34.730150630342, -86.5860092639923 ];

HSV_TT.map.init = function() { 
  map = L.map('transitMap').setView( destCoordinates, 15);
  var stopIcon = L.Icon.Default.extend({
	options: {
	  iconUrl: '/images/stopIcon4.png',
      iconSize: [13, 15],
	    iconAnchor: [6, 15],
	    popupAnchor: [0, -15],
      shadowSize: [0,0]	  
	}
	
  });
  
  var marker = L.circle( destCoordinates, 50, {
      "color" : "red",
      "fill" : "#F03",
      "fillOpacity": 0.3
  } ).on("click", function() {
      // open in new tab
      var tab = window.open("pano_view/index.html", '_blank');
      tab.focus();
  }).addTo(map);
  
  
  
  //marker.bindPopup("<b>DESTINATION:</b><br>AL.com Office").openPopup();
  
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'hsvtransit.cigx5tx9c0u474mm3jqvacywa',
    accessToken: 'pk.eyJ1IjoiaHN2dHJhbnNpdCIsImEiOiJjaWd4NXR5bDcwdWdiNjVtMHJqajByZ2FwIn0.MGnCx-SYksm4Ia8-4CoWMg'
  }).addTo(map);

  //var overlayMaps = HSV_TT.map.createRouteLayers(routeNames);
  // TODO this is ackward - change at some point ------
  //overlayMaps['Downtown'].bindPopup("<b>Entertainment Trolley Route</b>" +
  //                   "<br><b>Hours of Operation:</b> 5pm to 12am Fridays and Saturdays");
  //---------------------------------------------------
  /*
  var stops = L.geoJson(HSV_TT.ui.getStops('Downtown'), {    
    pointToLayer: function( feature, latlng ) {
      return L.marker(latlng, {icon: new stopIcon()});
	},
   	onEachFeature: function (feature, layer) {
	  layer.bindPopup("<b>Stop:</b> " + feature.properties.Stop_Sequence + 
		              "<br><b>Scheduled Time:</b> " + feature.properties.Time_ +
					  "<br><b>Location:</b> " + feature.properties.Stop_Location );
	}  
   });
   stops.addTo(map);
   map.addLayer(overlayMaps['Downtown']); // will work with an array of route names
   L.control.locate().addTo(map);
   */
   //HSV_TT.map.nextStopMark([34.73146324046631,-86.58602399965186]);
   
   // Full sytem  ---  TODO
   /*
   
   THIS ALL works... will implement w/ full system
   L.control.layers(null, overlayMaps).addTo(map); // check box control for turning on route maps
   
   // experiment ---  TODO

   map.locate();
   
   map.on('locationfound', function(e) {
     for(var k in e) {
       console.log(k + " = " + e[k] + "\n");
	 }
	 locationOfQuery = e.latlng;
	 console.log("location of query = " + locationOfQuery.lat + ", " + locationOfQuery.lng);
	 // TODO when we have sessions set up save this location with the session ID.
   });
   */
   // Record clicks-----------------------
      map.on('click', HSV_TT.map.onMapClick);
   //----------------------------------end   
}

HSV_TT.map.onMapClick = function(e) {
   console.log("[" + e.latlng.lat + "," + e.latlng.lng + "]");
}

HSV_TT.map.recenterMap = function(lngLat) {
	//DEBUG console.log('long: ' + lngLat[0] + ' lat: ' + lngLat[1]);
	map.panTo(new L.LatLng(lngLat[1], lngLat[0]));
	HSV_TT.map.stopLocateMark(lngLat);
}
/*
HSV_TT.map.stopLocateMark = function(lngLat) {
  if (stopLocationCircle) {
    map.removeLayer(stopLocationCircle);
  }
  stopLocationCircle = L.circle([lngLat[1], lngLat[0]], 15, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.8
  }).addTo(map);
}
*/
/*
HSV_TT.map.nextStopMark = function(lngLat) {
  if (nextStopMark) {
    map.removeLayer(nextStopMark);
  }
  nextStopMark = L.polygon(getStopBounds(lngLat), {
    color: 'blue',
    fillColor: '#0aa',
    fillOpacity: 0.8
  }).addTo(map);
}
*/
/*
function getStopBounds(pnt){
	return rtnBounds = [ [pnt[1]+.00018,pnt[0]-.00018],[pnt[1]+.00018,pnt[0]+.00018],
	                     [pnt[1]-.00018,pnt[0]+.00018],[pnt[1]-.00018,pnt[0]-.00018] ]
};
*/
HSV_TT.map.updateLocationMarker = function (vid, latlng) {
	//console.log("Bus number: " + vid + " has new location: " + latlng.lat +", " + latlng.lng);
	var mm = HSV_TT.getBusMapMarker(vid); 
	if (mm) {
	  //console.log("Have marker object");
	  mm.setLatLng(latlng).update();
	} else {
	  if (vid === "0") {
      console.log(vid);
		var mm = L.marker([latlng.lat,latlng.lng], {icon: new fireIcon()}).addTo(map);
		mm.bindPopup("Station 1 Truck 01");
	  } else if (vid === "999") {
      console.log(vid);
		var mm = L.marker([latlng.lat,latlng.lng], {icon: new emtIcon()}).addTo(map);
		mm.bindPopup("HSV Hospital EMT = " + vid);
	  } else {
      console.log(vid);
		var mm = L.marker([latlng.lat,latlng.lng], {icon: new policeIcon()}).addTo(map);
		mm.bindPopup("Car " + vid);
	  }
	  HSV_TT.putBusMapMarker(vid, mm); 	  
	}	
}

HSV_TT.map.removeLocationMarker = function(vid) {
	var mm = HSV_TT.getBusMapMarker(vid); 
	if (mm) {
	  //mm.clearLayers();
	  map.removeLayer(mm);
	}
}

HSV_TT.map.between = function(point, floor, ceiling ) {
	var ret = false;
	if (point >= floor && point <= ceiling) {
		ret = true;
	}
	return ret;
} 

HSV_TT.map.contains = function(point, bounds) {      //upper left, lower right coordinate
	var ret = (between(point[0], bounds.se[0],bounds.nw[0]) && between(point[1], bounds.nw[1],bounds.se[1]) );
	return ret;
}

//HSV_TT.map.setStopBounds function(seq){
//	return rtnBounds = {"nw" : [(geoConst.dtStopArray[seq][0])+.00018,(geoConst.dtStopArray[seq][1])-.00018], 
//                        "se" : [(geoConst.dtStopArray[seq][0])-.00018,(geoConst.dtStopArray[seq][1])+.00018]} 
//};
/*
HSV_TT.map.createRouteLayers = function(routeNames) {
	var obj = {};
	for (var i = 0; i < routeNames.length; i++) {
	  //DEBUG console.log('layer: ' + routeNames[i][0]);
	  
	  var rnom = routeNames[i][0];
	  //obj[rnom] = L.geoJson(HSV_TT.ui.getRoutes(routeNames[i][0]),{ 
	  obj[rnom] = L.geoJson(HSV_TT.ui.getRoutes(rnom),{
	    style: {
	             //weight: 2,
                 opacity: .6,
                 color: routeNames[i][1]
                 //dashArray: '3',
                 //fillOpacity: 0.3,
                 //fillColor: '#ff0000'
			   }
	  })
	}	
	//DEBUG console.log('layers: ' + obj.length);;
	return obj;
}
*/
/*
// this function does not order the routes correctly don't use
HSV_TT.map.getRouteNames = function() {
  var flags = [], output = [], l = allRoutes.features.length, i;
    for( i=0; i<l; i++) {
      if( flags[allRoutes.features[i].properties.routename]) continue;
      flags[allRoutes.features[i].properties.routename] = true;
      output.push(allRoutes.features[i].properties.routename);
  }
  console.log('Names: ' + output);
}
*/