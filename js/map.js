var map = L.map('phillymap').setView([39.9526, -75.1652], 12);
var basemaplayer = new L.StamenTileLayer("toner-lite");
map.addLayer(basemaplayer);

var litterlayer = L.geoJSON(litterdata, {
    style: function(feature) {
    	if (feature.properties.division_score <1.5) {
    		return {color: "transparent",
    				fillColor: "#8ad16e",
    				fillOpacity: 0.5};
    	} else if (feature.properties.division_score >=1.5 && feature.properties.division_score <2){
    		return {color: "transparent",
    				fillColor: "yellow",
    				fillOpacity: 0.5};
    	} else if (feature.properties.division_score >=2 && feature.properties.division_score <2.5){
    		return {color: "transparent",
    				fillColor: "orange",
    				fillOpacity: 0.5};
    	} else if (feature.properties.division_score >=2.5) {
    		return {color: "transparent",
    				fillColor: "red",
    				fillOpacity: 0.5};
    	} else {
    		console.log(error);
    	}
    	// return { 
    	// 	weight: "0"
    	// };
    }
}).addTo(map);

var markers = [];


// var litterlayer = L.geoJSON(litterdata).addTo(map);
var litter = L.layerGroup(litterlayer);
map.addLayer(litter);

var eventsLayerGroup = L.layerGroup();
map.addLayer(eventsLayerGroup);


var baseMaps = {
    "Map": basemaplayer
};

var overlayMaps = {
    "Litter Index": litterlayer,
    "Events": eventsLayerGroup
};


L.control.layers(baseMaps, overlayMaps).addTo(map);

// AJAX Calls
$(document).ready(function() {
       // $('#clickMe').click(function() {
            $.ajax({
                url: "event.json",
                method: "GET",
                dataType: 'json',
                contentType: "application/json",
                success: function(result){
				makemarker(result);
				$(function() {
					$.each(result, function(index, value) {
						$('<tr>').append(
							$('<td>').text(value.name),
							$('<td>').text(value.event_type),
							$('<td>').text(value.address)
						).appendTo('#events_table');
					});
				});
				},
                error:function(req, status, err) {
                    console.log(req);
                    console.log(status);
                    console.log(err);
                }
            });
       // });
	});

function makemarker(result) {
    result.forEach((item) => {
        markers[item.id] = L.marker([item.latitude, item.longitude]);
        markers[item.id]._leaflet_id = item.id;
        eventsLayerGroup.addLayer(markers[item.id]);
        var popuptext = "<h3>" + item.name + "</h3><p>" + item.address + "</p><p>" + item.start_time + " - " + item.end_time + "</p>";
        console.log(item);
        markers[item.id].bindPopup(popuptext);
    //     var divtitle = '<td><a class="triggerpopup" href="#' + markers[item.id] + '" id="' markers[item.id] + '">' + markers[item.name] + '</a></td>';
    //     // console.log(item.id);
    //     $('<tr>').append(
    //                         $('<td>').text(divtitle),
    //                         $('<td>').text(value.event_type),
    //                         $('<td>').text(value.url)
    //                     ).appendTo('#events_table');
    }); 
}



  var x = document.getElementsByClassName("triggerpopup"); // get column 1 cells
  for (i = 0; i < markers.length; i++) {
    var mID = x[i].id; // remove the extra underscore
    clicky(mID, i);
  };

  function clicky(mID, i) { // locate corresponding marker and activate popup
      x[i].onclick = function(){
        map._layers[mID].fire('click');
        map.setView([markers[id].latitude, markers[i].longitude]);
      };
  }

