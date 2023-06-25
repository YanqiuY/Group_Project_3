// Create a map object.
let myMap = L.map("map", {
  center: [34,0],
  zoom: 2.5
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load the GeoJSON data.
let geoData = {
  "type": "FeatureCollection",
  "name": "AQI_-test",
  "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  "features": [
  { "type": "Feature", "properties": { "Country": "France", "City": "Raismes", "AQI_Value": "59", "AQI_Category": "Moderate", "CO AQI Value": "1", "CO AQI Category": "Good", "Ozone AQI Value": "30", "Ozone AQI Category": "Good", "NO2 AQI Value": "4", "NO2 AQI Category": "Good", "PM2.5 AQI Value": "59", "PM2.5 AQI Category": "Moderate", "lat": 50.3892, "lng": 3.4858 }, "geometry": { "type": "Point", "coordinates": [ 3.4858, 50.3892 ] } },
  { "type": "Feature", "properties": { "Country": "France", "City": "Pontarlier", "AQI_Value": "56", "AQI_Category": "Moderate", "CO AQI Value": "1", "CO AQI Category": "Good", "Ozone AQI Value": "35", "Ozone AQI Category": "Good", "NO2 AQI Value": "0", "NO2 AQI Category": "Good", "PM2.5 AQI Value": "56", "PM2.5 AQI Category": "Moderate", "lat": 46.9061, "lng": 6.3547 }, "geometry": { "type": "Point", "coordinates": [ 6.3547, 46.9061 ] } },
  { "type": "Feature", "properties": { "Country": "France", "City": "Haubourdin", "AQI_Value": "48", "AQI_Category": "Good", "CO AQI Value": "1", "CO AQI Category": "Good", "Ozone AQI Value": "28", "Ozone AQI Category": "Good", "NO2 AQI Value": "4", "NO2 AQI Category": "Good", "PM2.5 AQI Value": "48", "PM2.5 AQI Category": "Good", "lat": 50.6092, "lng": 2.9869 }, "geometry": { "type": "Point", "coordinates": [ 2.9869, 50.6092 ] } },
  { "type": "Feature", "properties": { "Country": "France", "City": "Beaune", "AQI_Value": "39", "AQI_Category": "Good", "CO AQI Value": "1", "CO AQI Category": "Good", "Ozone AQI Value": "26", "Ozone AQI Category": "Good", "NO2 AQI Value": "1", "NO2 AQI Category": "Good", "PM2.5 AQI Value": "39", "PM2.5 AQI Category": "Good", "lat": 47.025, "lng": 4.8397 }, "geometry": { "type": "Point", "coordinates": [ 4.8397, 47.025 ] } },
  { "type": "Feature", "properties": { "Country": "France", "City": "Paita", "AQI_Value": "27", "AQI_Category": "Good", "CO AQI Value": "0", "CO AQI Category": "Good", "Ozone AQI Value": "27", "Ozone AQI Category": "Good", "NO2 AQI Value": "0", "NO2 AQI Category": "Good", "PM2.5 AQI Value": "10", "PM2.5 AQI Category": "Good", "lat": -5.0911, "lng": -81.1064 }, "geometry": { "type": "Point", "coordinates": [ -81.1064, -5.0911 ] } },
  { "type": "Feature", "properties": { "Country": "France", "City": "Riom", "AQI_Value": "40", "AQI_Category": "Good", "CO AQI Value": "1", "CO AQI Category": "Good", "Ozone AQI Value": "30", "Ozone AQI Category": "Good", "NO2 AQI Value": "1", "NO2 AQI Category": "Good", "PM2.5 AQI Value": "40", "PM2.5 AQI Category": "Good", "lat": 45.8936, "lng": 3.1125 }, "geometry": { "type": "Point", "coordinates": [ 3.1125, 45.8936 ] } },
  { "type": "Feature", "properties": { "Country": "France", "City": "Rodez", "AQI_Value": "42", "AQI_Category": "Good", "CO AQI Value": "1", "CO AQI Category": "Good", "Ozone AQI Value": "31", "Ozone AQI Category": "Good", "NO2 AQI Value": "1", "NO2 AQI Category": "Good", "PM2.5 AQI Value": "42", "PM2.5 AQI Category": "Good", "lat": 44.3506, "lng": 2.575 }, "geometry": { "type": "Point", "coordinates": [ 2.575, 44.3506 ] } },
  { "type": "Feature", "properties": { "Country": "France", "City": "Guipavas", "AQI_Value": "34", "AQI_Category": "Good", "CO AQI Value": "1", "CO AQI Category": "Good", "Ozone AQI Value": "26", "Ozone AQI Category": "Good", "NO2 AQI Value": "9", "NO2 AQI Category": "Good", "PM2.5 AQI Value": "34", "PM2.5 AQI Category": "Good", "lat": 48.4336, "lng": -4.4008 }, "geometry": { "type": "Point", "coordinates": [ -4.4008, 48.4336 ] } },
  { "type": "Feature", "properties": { "Country": "France", "City": "Fosses", "AQI_Value": "29", "AQI_Category": "Good", "CO AQI Value": "0", "CO AQI Category": "Good", "Ozone AQI Value": "28", "Ozone AQI Category": "Good", "NO2 AQI Value": "2", "NO2 AQI Category": "Good", "PM2.5 AQI Value": "29", "PM2.5 AQI Category": "Good", "lat": 49.0981, "lng": 2.5067 }, "geometry": { "type": "Point", "coordinates": [ 2.5067, 49.0981 ] } },
  { "type": "Feature", "properties": { "Country": "France", "City": "Libourne", "AQI_Value": "46", "AQI_Category": "Good", "CO AQI Value": "1", "CO AQI Category": "Good", "Ozone AQI Value": "26", "Ozone AQI Category": "Good", "NO2 AQI Value": "2", "NO2 AQI Category": "Good", "PM2.5 AQI Value": "46", "PM2.5 AQI Category": "Good", "lat": 44.92, "lng": -0.24 }, "geometry": { "type": "Point", "coordinates": [ -0.24, 44.92 ] } }
  ]
  };

// console.log(geoData);
  // // d3.json(geoData).then(function(response) {

  //   // console.log(response);
  //   // features = response.features;
  
    let heatArray = [];
  
    for (let i = 0; i < geoData.features.length; i++) {
      let location = geoData.features[i].geometry;
      if (location) {
    //     console.log(location);
    //   }
    // } 
        heatArray.push([location.coordinates[1], location.coordinates[0]]);
      }
    }
  
    let heat = L.heatLayer(heatArray, {
      radius: 50,
      blur: 5
    }).addTo(myMap);
  
  // });