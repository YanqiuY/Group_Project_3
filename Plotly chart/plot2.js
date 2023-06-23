// Display the default plot
document.addEventListener("DOMContentLoaded", function() {
    d3.csv("AQI_values.csv").then(function(data) {
      // Extract the list of countries from the data
      let countries = data.map(d => d.Country);
      // Populate the dropdown menu with the list of countries
      let dropdownMenu = d3.select("#selDataset");
      dropdownMenu
        .selectAll("option")
        .data(countries)
        .enter()
        .append("option")
        .text(d => d);
  
      let defaultCountry = countries[0]; 
      updateChart(data, defaultCountry);
    });
  });
  
  // call getData()
  d3.select("#selDataset").on("change", getData);
  
  function getData() {
    let dropdownMenu = d3.select("#selDataset");
    let dataset = dropdownMenu.property("value");
    d3.csv("AQI_values.csv").then(function(data) {
      let selectedData = data.find(d => d.Country === dataset);
      updateChart(selectedData);
    });
  }
  
  function updateChart(selectedData) {
    let chartData = [
      {
        x: ["CO AQI", "Ozone AQI", "NO2 AQI"],
        y: [
          +selectedData["CO AQI Value"],
          +selectedData["Ozone AQI Value"],
          +selectedData["NO2 AQI Value"]
        ],
        type: "bar"
      }
    ];
  
    let layout = {
        height: 600,
        width: 800,
        yaxis: {
          title: "Value"
        },
        xaxis: {
          title: "Pollutant",
          tickfont: {
            family: "Arial, sans-serif",
            size: 14,
            color: "black"
          }
        }
      };
    
      Plotly.newPlot("bar", chartData, layout);
    }
  
  