// Create a map object.
let myMap = L.map("map", {
  center: [34,0],
  zoom: 2.5
});
myMap.options.zoomDelta = 0.25;
myMap.options.zoomSnap = 0.25; 

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

function buildChloro() {
  // Load the GeoJSON data.
  let geoData = '/static/data/worldAQI.geojson';

  // Function to get color for each API category
  function getColor(d) {
    return d > 301 ? '#c71600' :
      d > 201 ? '#a66200' :
      d > 151 ? '#7b8600' :
      d > 101 ? '#4b9f48' :
      d > 51 ? '#00b18f' :
      '#00bdc7';
  }

  // Function to fill color depends on the 'med_api' value
  function style(feature) {
    return {
      fillColor: getColor(feature.properties.MED_API),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }

  d3.json(geoData).then(function (data) {
    L.geoJson(data, { style: style }).addTo(myMap);

    // Create a message box element
    var messageBox = document.createElement('div');
    messageBox.classList.add('message-box');
    document.body.appendChild(messageBox);

    // Add an interaction function
    function highlightFeature(e) {
      var layer = e.target;

      layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
      });

      layer.bringToFront();

      // Update the message box content
      var properties = layer.feature.properties;
      messageBox.innerHTML = (properties ? '<b>' + properties.COUNTRY + '</b><br />' +
          'Median AQI: ' + properties.MED_API + '</b><br />' + 'Click to Show Graphs!': 'Hover over a country');

      // Show the message box
      messageBox.style.display = 'block';
    }

    function resetHighlight(e) {
      geojson.resetStyle(e.target);

      // Hide the message box
      messageBox.style.display = 'none';
    }

    function zoomToFeature(e) {

      const dropdown = document.getElementById('countryDropdown');
      dropdown.value = e.target.feature.properties.COUNTRY;
      dropdown.dispatchEvent(new Event('change'));
    }

    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
      });
    }

    var geojson = L.geoJson(data, {
      style: style,
      onEachFeature: onEachFeature
    }).addTo(myMap);
  });
}

buildChloro();




function createGasBarChart(data) {
  const { med_co, med_ozone, med_no2 } = data;

  const chartData = [{
    x: ['Carbon<br>Monoxide', 'Ozone', 'Nitrogen<br>Dioxide'],
    y: [med_co, med_ozone, med_no2],
    type: 'bar',
    marker: {
      color: ['#de6e56', '#e14b31', '#c23728']
    }
  }];

  const layout = {
    title: {
      text: 'AQI of Gases',
      xref: 'paper',
      x: 0.5,
      y: 0.9
    },
    yaxis: {
      title: 'AQI (Median)'
    },
    width: 300,
    height: 290,
    margin: {
      l: 45,
      r: 50,
      t: 50,
      b: 50
    }
  };
  
  Plotly.newPlot('gas_chart', chartData, layout);
}

function createHazardBarChart(data) {
  const { good, mod, unhealthy, very_unhealthy, unhealthy_sens, hazard } = data;

  const chartData = [{
    x: ['Good', 'Moderate', 'Unhealthy', 'Very Unhealthy', 'Harmful', 'Hazardous'],
    y: [good, mod, unhealthy, very_unhealthy, unhealthy_sens, hazard],
    type: 'bar',
    marker: {
      color: ["#00bdc7", "#00b18f", "#4b9f48", "#7b8600", "#a66200", "#c71600"]
    }
  }];

  const layout = {
    title: {
      text: 'Distribution of AQI<br>Hazard Categories',
      xref: 'paper',
      x: 0.5,
      y: 0.9
    },
    yaxis: {
      title: 'Counts'
    },
    width: 300,
    height: 290,
    margin: {
      l: 50,
      r: 50,
      t: 70,
      b: 70
    }
  };
  

  Plotly.newPlot('hazard_chart', chartData, layout);
}

function createHazardScatterPlot(data) {
  const aqiArray = data.map(country => country.aqi);
  const pmArray = data.map(country => country.pm_aqi);
  const aqi_categoryArray = data.map(country => country.aqi_category);

  const scatterData = [{
    x: aqiArray,
    y: pmArray,
    mode: 'markers',
    marker: {
      color: aqi_categoryArray.map(category => getCategory(category)),
      size: 10,
      line: {
        width: 0.5,
        color: 'black'
      }
    }
  }];

  console.log(scatterData);

  const layout = {
    title: {
      text: 'AQI Value vs PM2.5 AQI Value<br>& Hazard Categories',
      xref: 'paper',
      x: 0.5,
      y: 0.9
    },
    xaxis: {
      title: {
        text: 'AQI Value',
        standoff: 10
      }
    },
    yaxis: {
      title: 'PM2.5 AQI Value'
    },
    width: 300,
    height: 290,
    margin: {
      l: 50,
      r: 50,
      t: 70,
      b: 50
    }
  };

  function getCategory(aqi_category) {
    var color = ["#00bdc7", "#00b18f", "#4b9f48", "#7b8600", "#a66200", "#c71600"];
    var categories = ['Good', 'Moderate', 'Unhealthy', 'Very Unhealthy', 'Unhealthy for Sensitive Groups', 'Hazardous'];
    var categoryIndex = categories.indexOf(aqi_category);
    if (categoryIndex !== -1) {
      return color[categoryIndex];
    }
    return color[color.length - 1];
  }

  Plotly.newPlot('hazard_scatter', scatterData, layout);

}


function populateCountryDropdown() {
  d3.json('/api/raw_aqi').then(function(rawAQIData) {
    d3.json('/api/median').then(function(medianData) {
      const dropdown = document.getElementById('countryDropdown');
      dropdown.style.width = '310px';
      medianData.forEach(country => {
        const option = document.createElement('option');
        option.text = country.country;
        option.value = country.country;
        dropdown.appendChild(option);
      });

      dropdown.selectedIndex = 166;

      dropdown.addEventListener('change', () => {
        const selectedCountry = dropdown.value;

        const filteredMedianData = medianData.find(country => country.country === selectedCountry);
        createGasBarChart(filteredMedianData);
        createHazardBarChart(filteredMedianData);

        const filteredRawAQIData = rawAQIData.filter(country => country.country === selectedCountry);
        createHazardScatterPlot(filteredRawAQIData);

        if(filteredMedianData) {
          const { lat, long } = filteredMedianData;
          map.setView([lat, long], 12);
        }
      });

      dropdown.dispatchEvent(new Event('change'));
    }).catch(function(error) {
      console.log('Error fetching median data:', error);
    });
  }).catch(function(error) {
    console.log('Error fetching raw AQI data:', error);
  });
}

populateCountryDropdown();
