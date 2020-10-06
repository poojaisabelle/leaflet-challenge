// Define variables for the three tile layers 

// Satellite layer 
var satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "satellite-v9",
  accessToken: API_KEY
});

// Grayscale layer 
var grayScaleMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

// Outdoors layer 
var outdoorsMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "outdoors-v11",
    accessToken: API_KEY
  });

// Create a baseMaps object 
var baseMaps = {
    "Satellite": satelliteMap,
    "Grayscale": grayScaleMap,
    "Outdoors": outdoorsMap
}

// Create two layer groups for the fault lines and earthquakes
var faultLines = new L.layerGroup();
var earthquakes = new L.layerGroup();

// Create an overlay object 
var overlayMaps = {
    "Fault Lines": faultLines,
    "Earthquakes": earthquakes
}

// Define the map object and pass in the various layers 
var myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 5,
    layers: [satelliteMap, faultLines, earthquakes]
});

// Pass the map layers into the layer control
L.control.layers(baseMaps, overlayMaps, {
    collapsed:false
}).addTo(myMap);

// Store the tectonic and earthquake API in URLs
var tectonicURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
var earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the tectonic URL
d3.json(tectonicURL, function(data) {

    // Get the features data that contains necessary info
    var features = data.features;

    // Loop through the features array and obtain the coordinates for 
    // the fault lines 
    for (var index = 0; index < features.length; index++) {

        // Save the coordinates in a new variable 
        var coords = features[index].geometry.coordinates;
        // console.log(coords);

        // Coordinates are not in correct format, they need to be flipped
        // Create new array to store the flipped coords
        var newCoords = [];

        // Push the changes to new array 
        newCoords.push(coords.map(c => [c[1], c[0]]));
        // console.log(newCoords);

        // Create the polyline using the new coords 
        var tectonicPlates = L.polyline(newCoords, {
            color: "#feb24c"
        }).addTo(faultLines);
    }
});

// Perform a GET request to the earthquake URL 
d3.json(earthquakeURL, function(data) {


    // Create function to obtain different colors according to magnitude of the earthquake 
    // Will be used as fillColor when circles are added to the map
    function getColor(d) {
        return d >= 5 ? '#54278f' :
               d >= 4 ? '#756bb1' :
               d >= 3 ? '#9e9ac8' :
               d >= 2 ? '#bcbddc' :
               d >= 1 ? '#dadaeb' :
                        '#f2f0f7' ;
        
    }

    // Get the features data that contains necessary info 
    var features = data.features;

    // Loop through the features array and create the circles 
    for (var index = 0; index < features.length; index++) {
        
        // Create new variables for the coordinates and magnitude 
        // of the earthquakes 
        var magnitude = features[index].properties.mag;
        var coords = features[index].geometry.coordinates;

        // Create circles and add them to the map 
        var markers = L.circle([coords[1], coords[0]], {
            fillOpacity: 0.75,
            fillColor: getColor(magnitude),
            color: "black",
            weight: 0.5,
            // for the radius, scale the magnitudes otherwise the circles will be too small
            radius: magnitude * 17000
        });
        
        // Add to the earthquake layer and bind a popup message when circle is clicked 
        markers.bindPopup("<h2>" + features[index].properties.place + "</h2><hr><h4>" + "Magnitude Level: " + magnitude + 
            "<br>" + new Date(features[index].properties.time) + "<br>" + 
            "Location: [" + coords[1] + ", " + coords[1] + "]" + "</h4>").addTo(earthquakes);
    }

    // Set up the legend 
    var legend = L.control({position: "bottomright"});
    legend.onAdd = function() {

        var div = L.DomUtil.create("div", "info legend"),
            magLevels = [0, 1, 2, 3, 4, 5],
            labels = [];

        // Loop through the various magnitudes and assign the colors 
        for (var i = 0; i < magLevels.length; i++) {

            div.innerHTML +=
                '<i style="background:' + getColor(magLevels[i] + 1) + '"></i> ' +
                magLevels[i] + (magLevels[i + 1] ? '&ndash;' + magLevels[i + 1] + '<br>' : '+');
        }
        return div;
    };

    legend.addTo(myMap)
});

