// Count variable
let count = 0;


// Display the default plot
document.addEventListener("DOMContentLoaded", function() {
  d3.csv("AQI.csv").then(function(data) {
    // Extract the list of countries from the data
    let countries = data.map(d => d.Country);
    let category = data.map(d => d["AQI Category"])
    // Populate the dropdown menu with the list of countries
    let dropdownMenu = d3.select("#selDataset");
    dropdownMenu
      .selectAll("option")
      .data(countries)
      .enter()
      .append("option")
      .text(d => d);

    let defaultCountry = countries[0];
    let defaultCategory = category[0]; 
    updateChart(defaultCategory, defaultCountry);
  });
});

// call getData()
d3.select("#selDataset").on("change", getData);

function getData() {
  let dropdownMenu = d3.select("#selDataset");
  let dataset = dropdownMenu.property("value");
  d3.csv("AQI.csv").then(function(data) {
    data.sort((a, b) => a["Country"] - b["Country"]);
    let selectedData = data.find(d => d.Country === dataset);
    for (let i = 0; i < data.length; i++) {
      if (data[i]["Country"] === selectedData) {
          count++;
      }
    updateChart(selectedData);
};
})
}
function updateChart(selectedData) {
  let chartData = [
    {
      x: ["AQI Category"],
      y: [ count
   
      ],
      type: "bar"
    }
  ];

  let layout = {
      height: 600,
      width: 800,
      yaxis: {
        title: "Count"
      },
      xaxis: {
        title: "AQI Category",
        tickfont: {
          family: "Arial, sans-serif",
          size: 14,
          color: "black"
        }
      }
    };
  
    Plotly.newPlot("bar", chartData, layout);
  }

