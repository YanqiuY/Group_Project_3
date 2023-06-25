console.log("dashboard.js");

aqi_select = d3.select("#aqi")

aqi_select
    .append("option")
    .text("Pick one")
    .property("value", 0);

for (i = 7; i < 501; i++) {
    aqi_select
        .append("option")
        .text(i)
        .property("value", i);
}

const tbody = d3.select("tbody");

d3.json("http://127.0.0.1:5000/api/aqi").then(function (data) {
    console.log("AQI table")
    console.log(data)

    tbody.html("");

    const tbl_header = tbody.append("tr");
    let header = tbl_header.append("th");
    header.text("AQI");
    header = tbl_header.append("th");
    header.text("Count");

    data.forEach((row) => {
        // Create tr for each row of the table
        const tbl_data = tbody.append("tr");

        // console.log("row")
        // console.log(row)

        // Create multiple td cells for each row
        Object.values(row).forEach((value) => {
            let cell = tbl_data.append("td");
            cell.text(value);
        });
    });
})

function optionChanged(index) {

    var aqi = document.getElementById("aqi").value;
    console.log("aql= " + aqi)

    d3.json("http://127.0.0.1:5000/api/dashboard").then(function (data) {
        // console.log("optionChanged")
        // console.log(data)

        let resultArray = data.filter(aqiObj => aqiObj.aqi == index);
        console.log("resultArray")
        console.log(resultArray)

        tbody.html("");

        const tbl_header = tbody.append("tr");
        let header = tbl_header.append("th");
        header.text("agi");
        header = tbl_header.append("th");
        header.text("aqi_category");
        header = tbl_header.append("th");
        header.text("city");
        header = tbl_header.append("th");
        header.text("co_aqi");
        header = tbl_header.append("th");
        header.text("co_aqi_category");
        header = tbl_header.append("th");
        header.text("country");
        header = tbl_header.append("th");
        header.text("id");
        header = tbl_header.append("th");
        header.text("no2_aqi");
        header = tbl_header.append("th");
        header.text("no2_aqi_category");
        header = tbl_header.append("th");
        header.text("ozone_aqi");
        header = tbl_header.append("th");
        header.text("ozone_aqi_category");

        resultArray.forEach((row) => {
            console.log("row")
            console.log(row) 

            const tbl_data = tbody.append("tr");

            Object.values(row).forEach((value) => {
                let cell = tbl_data.append("td");
                cell.text(value);
              });
            // let header = tbl_header.append("th");
            // header.text("key");
        });

       



    })
}

d3.json("http://127.0.0.1:5000/api/dashboard").then(function (data) {
    console.log(data)

})    
