function loadData() {
    d3.csv("AQI_values.csv").then(function(data) {
      let countries = data.map(d => d.Country);
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
  }
  
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
    let chartData = {
      labels: ["CO AQI", "Ozone AQI", "NO2 AQI"],
      datasets: [
        {
          label: "AQI Values",
          data: [
            +selectedData["CO AQI Value"],
            +selectedData["Ozone AQI Value"],
            +selectedData["NO2 AQI Value"]
          ],
          backgroundColor: ["rgba(300, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)", "rgba(75, 192, 192, 0.5)"]
        }
      ]
    };
  
    let ctx = document.getElementById("bar").getContext("2d");
    if (window.myChart) {
      window.myChart.data = chartData;
      window.myChart.update();
    } else {
      window.myChart = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
          responsive: true,
          scales: {
            y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Value",
                  font: {
                    size: 18
                  }
                }
              },
              x: {
                title: {
                  display: true,
                  text: "Pollutant",
                  font: {
                    size: 18
                  }
                },
              ticks: {
                font: {
                  family: "Arial, sans-serif",
                  size: 14,
                  weight: "bold"
                },
                color: "black"
              }
            }
          }
        }
      });
    }
  }
  
  
  
  