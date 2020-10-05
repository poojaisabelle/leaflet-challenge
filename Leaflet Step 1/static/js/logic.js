// Creating map object
var myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 8
});

// Adding the tile layer for the background of the map 
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
}).addTo(myMap);

// Store the API in a queryURL 
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the query URL 
d3.json(queryURL).then(function(data) {

    // Get the features data 
    var features = data.features;

    // Create function to obtain different colors according to magnitude
    // of the earthquake 
    function getColor(d) {
        return d >= 5 ? '#54278f' :
               d >= 4 ? '#756bb1' :
               d >= 3 ? '#9e9ac8' :
               d >= 2 ? '#bcbddc' :
               d >= 1 ? '#dadaeb' :
                        '#f2f0f7' ;
        
    }


    // Set up the legend 
    var legend = L.control({position: "bottomright"});
    legend.onAdd = function() {

        var div = L.DomUtil.create("div", "info legend"),
            magnitudes = [0, 1, 2, 3, 4, 5],
            labels = [];

        // Loop through the various magnitudes and assign the colors 
        for (var index = 0; i < magnitudes.length; index++) {

            div.innerHTML +=
                '<i style="background:' + getColor(magnitudes[i] + 1) + '"></i> ' +
                magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+');
        }

        return div;
    }

    legend.addTo(myMap)




});
