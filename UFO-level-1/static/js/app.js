// from data.js
var tableData = data;

// YOUR CODE HERE!
function searchDate(dateSearch){
    return dateSearch.datetime == d3.select("#datetime").property("value");
}


var button = d3.select("#filter-btn");


button.on("click", function(){
    console.log("value:", d3.select("#datetime").property("value"))
    
    var divTable = d3.select("#table-area");
    divTable.html("");
    var newTable = divTable.append("table").attr("class", "table table-striped table-hover").attr("id", "ufo-table2");
    var newtHead = newTable.append("thead");
    var theadrow = newtHead.append("tr");
    theadrow.append("th").attr("class", "table-head").text("Date");
    theadrow.append("th").attr("class", "table-head").text("City");
    theadrow.append("th").attr("class", "table-head").text("State");
    theadrow.append("th").attr("class", "table-head").text("Country");
    theadrow.append("th").attr("class", "table-head").text("Shape");
    theadrow.append("th").attr("class", "table-head").text("Duration");
    theadrow.append("th").attr("class", "table-head").text("Comments");
    var tbody = newTable.append("tbody");
    
    var filterDates = tableData.filter(searchDate);
    console.log(filterDates)

    filterDates.forEach(function(value){
        var row = tbody.append("tr")
        row.append("th").text(value.datetime)
        row.append("td").text(value.city)
        row.append("td").text(value.state)
        row.append("td").text(value.country)
        row.append("td").text(value.shape)
        row.append("td").text(value.durationMinutes)
        row.append("td").text(value.comments)
    })
    if (filterDates.length ==0){
        divTable.append("span").text("No results Found")
    }
})
