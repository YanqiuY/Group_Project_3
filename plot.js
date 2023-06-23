// Create an array of each country's numbers
let Australia = Object.values(data.Australia);
let Brazil = Object.values(data.Brazil);
let Ukraine = Object.values(data.Ukraine);
let Mexico = Object.values(data.Mexico);
let Singapore = Object.values(data.Singapore);
let SouthAfrica = Object.values(data.SouthAfrica);

// Display the default plot
document.addEventListener("DOMContentLoaded", function() {
  let defaultCountry = "Australia";
  let defaultValues = Object.values(data[defaultCountry]);
  let labels = Object.keys(data.Australia);

  let chartData = [{
    x: labels,
    y: defaultValues,
    type: 'bar'
  }];

  let layout = {
    height: 600,
    width: 800
  };

  Plotly.newPlot('bar', chartData, layout);
});

// On change to the DOM, call getData()
d3.select("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.property("value");
  // Retrieve the selected country's data
  let selectedData = data[dataset];

  // Call function to update the chart
  updateChart(selectedData);
}

// Update the restyled plot's values
function updateChart(newData) {
  let values = Object.values(newData);
  let update = {
    y: [values]
  };
  Plotly.update('bar', update);
}
