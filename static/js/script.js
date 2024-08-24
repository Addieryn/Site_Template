//Seting up starting with base
//planned on using this kind of map as a base to plot fairball locations and info
let geo_url = "../../data/nature_json/fireball.json"

d3.json(geo_url).then(function (data) {
    createFeatures(data.features)
})
//creating function for object data
function createFeatures(earthquake_data) {
    function feature_func(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${feature.properties.mag}</p><p>${new Date(feature.properties.time)}</p>`) 
    }
//
    let earthquakes = L.geoJSON(earthquake_data, {
        onEachFeature: feature_func,
        pointToLayer: function (feature, latlng) {
            let fillColor = colorChange(feature.geometry.coordinates[2]);

            return L.circleMarker(latlng, {
                radius: feature.properties.mag * 5,
                fillColor: fillColor,
                color: "black",
                weight: 1,
                fillOpacity: 0.6
            })
        }
    })   
    createMap(earthquakes)

}
//creating function for color change
function colorChange(d) {
    return d >= 90  ? '#fd5137' :
           d >= 70  ? '#fda037' :
           d >= 50  ? '#fdb137' :
           d >= 30  ? '#ffd42e' :
           d >= 10  ? '#e3ff41' :
           d >= -10 ? '#31e736' :
                      '#f7fcf5';
    }
// create map   
function createMap(earthquakes) {
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
    //adding topographical option  
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
    let baseMaps = {
        "Street Map": street,
        "Topographic Map": topo
    };
      
    let overlayMaps = {
        Earthquakes: earthquakes
    };
    //default map info
    let myMap = L.map("map", {
        center: [
          37.09, -95.71
        ],
        zoom: 5,
        layers: [street, earthquakes]
      });
    
      L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
  
    let legend = L.control({position: 'bottomright'});
    //adding legend
    legend.onAdd = function (map) {
        let div = L.DomUtil.create('div', 'info legend')
            let grades = [-10, 10, 30, 50, 70, 90];
            labels = [];

        for (let i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colorChange(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return div;
    }
     legend.addTo(myMap);
}
