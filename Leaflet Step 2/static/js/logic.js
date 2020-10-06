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

// Create an overlay object 
var overlayMaps = {
    "Fault Lines": new L.layerGroup(),
    "Earthquakes": new L.layerGroup()
}

























// // Creating map object and passing in US coordinates 
// var myMap = L.map("map", {
//     center: [37.0902, -95.7129],
//     zoom: 5
// });

// // Adding the (light) tile layer for the background of the map 
// L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "light-v10",
//     accessToken: API_KEY
// }).addTo(myMap);


// // Store the API in a queryURL 
// var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// // Perform a GET request to the query URL 
// d3.json(queryURL, function(data) {


//     // Create function to obtain different colors according to magnitude of the earthquake 
//     // Will be used as fillColor when circles are added to the map
//     function getColor(d) {
//         return d >= 5 ? '#54278f' :
//                d >= 4 ? '#756bb1' :
//                d >= 3 ? '#9e9ac8' :
//                d >= 2 ? '#bcbddc' :
//                d >= 1 ? '#dadaeb' :
//                         '#f2f0f7' ;
        
//     }

//     // Get the features data that contains necessary info 
//     var features = data.features;

//     // Loop through the features array and create the circles 
//     for (var index = 0; index < features.length; index++) {
        
//         // Create new variables for the coordinates and magnitude 
//         // of the earthquakes 
//         var magnitude = features[index].properties.mag;
//         var coords = features[index].geometry.coordinates;

//         // Create circles and add them to the map 
//         L.circle([coords[1], coords[0]], {
//             fillOpacity: 0.75,
//             fillColor: getColor(magnitude),
//             color: "black",
//             weight: 0.5,

//             // for the radius, scale the magnitudes otherwise the circles will be too small
//             radius: magnitude * 17000
        
//         // Add a popup message when circle is clicked 
//         }).bindPopup("<h2>" + features[index].properties.place + "</h2><hr><h4>" + "Magnitude Level: " + magnitude + 
//             "<br>" + new Date(features[index].properties.time) + "<br>" + 
//             "Location: [" + coords[1] + ", " + coords[1] + "]" + "</h4>").addTo(myMap);

//     }

//     // Set up the legend 
//     var legend = L.control({position: "bottomright"});
//     legend.onAdd = function() {

//         var div = L.DomUtil.create("div", "info legend"),
//             magLevels = [0, 1, 2, 3, 4, 5],
//             labels = [];

//         // Loop through the various magnitudes and assign the colors 
//         for (var i = 0; i < magLevels.length; i++) {

//             div.innerHTML +=
//                 '<i style="background:' + getColor(magLevels[i] + 1) + '"></i> ' +
//                 magLevels[i] + (magLevels[i + 1] ? '&ndash;' + magLevels[i + 1] + '<br>' : '+');
//         }
//         return div;
//     };

//     legend.addTo(myMap)
// });
