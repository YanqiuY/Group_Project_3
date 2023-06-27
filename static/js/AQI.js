var map = L.map('map').setView([37.0902, -95.7129], 8);
map.options.zoomDelta = 0.25;
map.options.zoomSnap = 0.25; 
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 5
  }).addTo(map);
  
function buildPlot() {
  var url = '/api/locations';
  d3.json(url).then(function(data) {
    L.geoJSON(data, {
      pointToLayer: function(feature, latlng) {
        var AQIValue = feature.properties.AQI;
        var radius = 10;
        var markerOptions = {
          radius: radius,
          fillColor: getColor(AQIValue),
          color: '#000',
          weight: 0,
          opacity: 1,
          fillOpacity: getOpacity(AQIValue)
        };
        markerOptions.className = 'blur-effect';
        return L.circleMarker(latlng, markerOptions);
      }
    }).addTo(map);
  }).catch(function(error) {
    console.log('Error loading GeoJSON data:', error);
  });
}

function getColor(AQIValue) {
  var colors = ["#9ee8ff", "#70dce1", "#59ceb5", "#63bc80", "#7aa648", "#938d0e", "#ab6c00", "#bd4000", "#c71600"];
  var breakpoints = [0, 50, 100, 150, 200, 250, 300, 400, 500];
  for (var i = 0; i < breakpoints.length; i++) {
    if (AQIValue <= breakpoints[i]) {
      return colors[i];
    }
  }
  return colors[colors.length - 1];
}

function getOpacity(AQIValue) {
  var opacity = [0.3, 0.33, 0.36, 0.39, 0.42, 0.45, 0.48, 0.51, 0.54, 0.57];
  var breakpoints = [0, 40, 80, 120, 160, 200, 240, 280, 320, 360, 400];
  for (var i = 0; i < breakpoints.length; i++) {
    if (AQIValue <= breakpoints[i]) {
      return opacity[i];
    }
  }
  return opacity[opacity.length - 1];
}

buildPlot();


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

