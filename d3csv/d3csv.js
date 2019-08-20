
var compliance = function (data,columns) {
  var mainResults = d3.select('.compliance').append("div").attr("class","row").append("div").attr("class","col-large bordered")
  var mainHeader = mainResults.append("div").attr("class","row").append("div").attr("class","dark-header").text("Compliance")
  var mainBody = mainResults.append("div")

	var rows = mainBody.selectAll("div")
	    .data(data)
	    .enter()
	    .append("div").attr("class","row text-center")

	var cells = rows.selectAll('div')
	    .data(function(row) {
	    	return columns.map(function (column) {
	    		return { column: column, value: row[column] }
	      })
      })
      .enter()      
      .append("div").attr("class","col-large")

  cells.append("h2")
  .attr("class","blue-header")
  .html(function (d) { return d.value })          
  cells.append("span")  
  .text("All tests are conducted by a third party, accredited, ISO 19075:2015 laboratory with results audited and approved by Cura-Select Compliance")   

  return compliance;
}
var batch = function (data,columns) {
  var mainResults = d3.select('.batch').append("div").attr("class","row").append("div").attr("class","col-large")
  var mainBody = mainResults.append("div")

	var rows = mainBody.selectAll("div")
	    .data(data)
	    .enter()
	    .append("div").attr("class","row text-center")

	var cells = rows.selectAll('div')
	    .data(function(row) {
	    	return columns.map(function (column) {
	    		return { column: column, value: row[column] }
	      })
      })
      .enter()      
      .append("span")

  cells.append("h2")  
  .html(function (d) { 
  	if (d.value.includes("/")) {
  	  return "Report Date: "+d.value +" | " 
    }else if (d.value.includes("-")) {
  	  return " Lab ID: "+d.value
    } else {
  	  return " Product: "+d.value +" | " 
    }
  })

  return batch;
}
var mainResults = function (data,columns) {
  var mainResults = d3.select('.main-results').append("div").attr("class","row").append("div").attr("class","col-large bordered")
  var mainHeader = mainResults.append("div").attr("class","row").append("div").attr("class","dark-header").text("Product Test Results")
  var mainBody = mainResults.append("div")

	var rows = mainBody.selectAll("div")
	    .data(data)
	    .enter()
	    .append("div").attr("class","row text-center")

	var cells = rows.selectAll('div')
	    .data(function(row) {
	    	return columns.map(function (column) {
	    		return { column: column, value: row[column] }
	      })
      })
      .enter()      
      .append("div").attr("class","col-small")

  cells.append("h2")
  .attr("class","blue-header")
  .html(function (d) { return d.value })          
  cells.append("span")  
  .html(function (d) { return d.column })   

  return mainResults;
}
var detailedResults = function (data,columns) {
  var mainResults = d3.select('.analytes').append("div").attr("class","row").append("div").attr("class","col-large bordered")
  var mainHeader = mainResults.append("div").attr("class","row").append("div").attr("class","dark-header").text(data[0].Type)
  var mainBody = mainResults.append("div").attr("class","row")

	var rows = mainBody.selectAll("div")
	    .data(data)
	    .enter()
	    .append("div").attr("class","row col-small")

	var cells = rows.selectAll('div')
	    .data(function(row) {
	    	return columns.map(function (column) {
	    		return { column: column, value: row[column] }
	      })
      })
      .enter()      
      .append("div")

  cells.append("span")
  .html(function (d) { return d.value })          
  cells.append("i").attr("class","fas fa-check")

  return detailedResults;
}

var pdf_url = "https://cdn.shopify.com/s/files/1/1907/5119/files/19-008627.csv";

d3.csv(pdf_url,function (data) {
  var columns = ['Compliance']
  compliance([data[0]],columns)
});
d3.csv(pdf_url,function (data) {
  var columns = ['Report Date', 'Product', 'Pixis ID']
  batch([data[0]],columns)
});
d3.csv(pdf_url,function (data) {
  var columns = ['THC%','CBD%','Pesicides','Residual Solvents','Microscopy/Yeast/Mold/Mycotoxins','Heavy Metals']
  mainResults([data[0]],columns)
});
d3.csv(pdf_url,function (data) {
  var columns = ['Analyte']
	var arrayLength = data.length
	var newArray = []
	for (var i = 0; i < arrayLength; i++) {
		if (data[i].Type == "Pesticides") {
	    newArray.push(data[i]);
		}
	}
  detailedResults(newArray,columns)
});
d3.csv(pdf_url,function (data) {
  var columns = ['Analyte']
	var arrayLength = data.length
	var newArray = []
	for (var i = 0; i < arrayLength; i++) {
		if (data[i].Type == "Residual Solvents") {
	    newArray.push(data[i]);
		}
	}
  detailedResults(newArray,columns)
});
d3.csv(pdf_url,function (data) {
  var columns = ['Analyte']
	var arrayLength = data.length
	var newArray = []
	for (var i = 0; i < arrayLength; i++) {
		if (data[i].Type == "Potency") {
	    newArray.push(data[i]);
		}
	}
  detailedResults(newArray,columns)
});

<!-- 'Product','Compliance' -->