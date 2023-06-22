function buildPlot() {
  /* data route */
  const url = "/api/locations";
  d3.json(url).then(function(response) {

    let myMap = L.map("map").setView([-32.8, 117.9], 7);
    
    // Adding the tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
  
    // Define a function to calculate marker color on a gradient scale
    function getMarkerColor(propertyValue) {
      var minValue = 0; // Minimum value of the property
      var maxValue = 100; // Maximum value of the property
    
      // Calculate the normalized value between 0 and 1
      var normalizedValue = (propertyValue - minValue) / (maxValue - minValue);
    
      // Calculate the color on the gradient scale
      var blue = Math.round(255 * (1 - normalizedValue));
      var red = Math.round(255 * normalizedValue);
      var green = 0;
    
      // Convert RGB values to HEX format
      var markerColor = "#" + red.toString(16) + blue.toString(16) + green.toString(16);
    
      return markerColor;
    }
    
    // Create a GeoJSON layer and set the style based on the property
    L.geoJSON(response, {
      style: function (feature) {
        var propertyValue = feature.properties.AQI; // Replace 'yourProperty' with the actual property name from GeoJSON
        var markerColor = getMarkerColor(propertyValue);
        return { color: markerColor };
      }
    }).addTo(myMap);

    // Update map size on window resize using transform property
    window.addEventListener('resize', function () {
      myMap.invalidateSize();
    });
  });
}

buildPlot();
