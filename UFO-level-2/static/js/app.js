// from data.js
var tableData = data;
var states=["- Select One -"];
var countries=["- Select One -"];
var shapes=["- Select One -"];

// YOUR CODE HERE!
function searchDate(lookup){
    var checker = "no_compare";

    //If user has inputted a date to check
    if (d3.select("#datetime").property("value")){
        if (checker =="no_compare"){checker = lookup.datetime == d3.select("#datetime").property("value");}
        else{checker = checker && lookup.datetime == d3.select("#datetime").property("value");}
    }

    //If user has inputted a city to check
    if (d3.select("#cityname").property("value")){
        if (checker =="no_compare"){checker = lookup.city.includes(d3.select("#cityname").property("value"));}
        else{checker = checker && lookup.city.includes(d3.select("#cityname").property("value"));}
    }

    //If user has inputted a state to check
    if (d3.select("#StateList").property("value") != "- Select One -"){
        if (checker =="no_compare"){checker = lookup.state.includes(d3.select("#StateList").property("value"));}
        else{checker = checker && lookup.state.includes(d3.select("#StateList").property("value"));}
    }

    //If user has inputted a country to check
    if (d3.select("#CountryList").property("value") != "- Select One -"){
        if (checker =="no_compare"){checker = lookup.country.includes(d3.select("#CountryList").property("value"));}
        else{checker = checker && lookup.country.includes(d3.select("#CountryList").property("value"));}
    }

    //If user has inputted a shape to check
    if (d3.select("#ShapeList").property("value") != "- Select One -"){
        if (checker =="no_compare"){checker = lookup.shape.includes(d3.select("#ShapeList").property("value"));}
        else{checker = checker && lookup.shape.includes(d3.select("#ShapeList").property("value"));}
    }

    if(checker == "no_compare"){checker = false}

    return (checker);
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

/****************************
***   City Search Field   ***
****************************/

var formUL = d3.select("#filters")
var formCityLI = formUL.append("li").attr("class", "filter list-group-item")
formCityLI.append("label").attr("for", "city").text("Select a City")
formCityLI.append("input").attr("class", "form-control")
    .attr("id", "cityname")
    .attr("type", "text")
    .attr("placeholder", "New York City")

/***************************
***   State Drop Downs   ***
***************************/

function newState(s)
{
    if(states.includes(s)){return false;}
    else{states.push(s);return true;}
}

var formStateLI = formUL.append("li").attr("class", "filter list-group-item")
formStateLI.append("label").attr("for", "state").text("Select a State")
var TmpArr = tableData.map(tablestate => tablestate.state);
TmpArr.map(newState)
states.sort()
var select = formStateLI
  .append('select')
      .attr('class','dropdown')
      .attr('id', 'StateList')
    .selectAll('option')
        .data(states).enter()
        .append('option')
            .text(function (d) { return d; });
            
/*****************************
***   Country Drop Downs   ***
*****************************/

function newCountry(c)
{
    if(countries.includes(c)){return false;}
    else{countries.push(c);return true;}
}

var formCountryLI = formUL.append("li").attr("class", "filter list-group-item")
formCountryLI.append("label").attr("for", "country").text("Select a Country")
TmpArr = tableData.map(tablecountry => tablecountry.country);
TmpArr.map(newCountry)
countries.sort()
var select = formCountryLI
  .append('select')
      .attr('class','dropdown')
      .attr('id', 'CountryList')
    .selectAll('option')
        .data(countries).enter()
        .append('option')
            .text(function (d) { return d; });
            
/****************************
***   Shapes Drop Downs   ***
****************************/

function newShape(s)
{
    if(shapes.includes(s)){return false;}
    else{shapes.push(s);return true;}
}

var formShapeLI = formUL.append("li").attr("class", "filter list-group-item")
formShapeLI.append("label").attr("for", "shape").text("Select a Shape")
TmpArr = tableData.map(tableshape => tableshape.shape);
TmpArr.map(newShape)
shapes.sort()
var select = formShapeLI
    .append('select')
        .attr('class','dropdown')
        .attr('id', 'ShapeList')
    .selectAll('option')
        .data(shapes).enter()
        .append('option')
            .text(function (d) { return d; });