// Create objects to hold sample id's, sample demographics, and sample data. This allows the sample to be read just once.
var countries = {};
// var demogs = {};
var dataList = {};
var gdpList = {};

var sampleMetadata = [];
var sampleOne = [];
var sampleTwo = [];
var sampleThree = [];
var gdpOne = [];
var gdpTwo = [];
var gdpThree = [];

var country = "";

 
// Function to filter sample data by selected sample  
function selectData(samples) {
    return samples.country == country;
  };

// Loop through Country list and build drop down
function buildDropDown(countries) {
  var dropD = d3.select("select");

  for(let i = 0;i<countries.length;i++) {
      var newOption = dropD.append("option").text(countries[i]);
      newOption.attr("value", countries[i]);
    };
};


// Function to build Graph 1
function updateGraph1() {

    var yearArray = sampleOne[0].year;
    var fertilityArray = sampleOne[0].fertility;

    var trace1 = {
      type: 'line',
      x: yearArray,
      y: fertilityArray,
      name: sampleOne[0].country,
      width: .8
    };

  yearArray = sampleTwo[0].year;
  fertilityArray = sampleTwo[0].fertility;
  var trace2 = {
      type: 'line',
      x: yearArray,
      y: fertilityArray,
      name: sampleTwo[0].country,
      width: .8
    };

  yearArray = sampleThree[0].year;
  fertilityArray = sampleThree[0].fertility;  
  var trace3 = {
      type: 'line',
      x: yearArray,
      y: fertilityArray,
      name: sampleThree[0].country,
      width: .8
    };

  var data = [trace1, trace2, trace3]

    var layout = {
        height: 500,
        margin:{t:5},
        yaxis:{
            title: 'Births per Woman'
        },
        xaxis:{
          title: 'Year'
        }
      }; 
      
      Plotly.newPlot('graph1', data, layout);

}

// Function to build Graph 2
function updateGraph2() {

  var popArray = sampleOne[0].population;
  var fertilityArray = sampleOne[0].fertility;

  var trace1 = {
      type: 'scatter',
      mode: 'markers',
      x: popArray,
      y: fertilityArray,
      name: sampleOne[0].country,
      width: .8
    };

  popArray = sampleTwo[0].population;
  fertilityArray = sampleTwo[0].fertility;
  var trace2 = {
      type: 'scatter',
      mode: 'markers',
      x: popArray,
      y: fertilityArray,
      name: sampleTwo[0].country,
      width: .8
    };

  popArray = sampleThree[0].population;
  fertilityArray = sampleThree[0].fertility;  
  var trace3 = {
      type: 'scatter',
      mode: 'markers',
      x: popArray,
      y: fertilityArray,
      name: sampleThree[0].country,
      width: .8
    };

  var data = [trace1, trace2, trace3]

  var layout = {
      height: 500,
      margin:{t:15},
      yaxis:{
          title: 'Births per Woman'
      },
      xaxis:{
        title: 'Population'
      }
    }; 
    
    Plotly.newPlot('graph2', data, layout);

}

// Function to build Graph 3
function updateGraph3() {

  var laborArray = sampleOne[0].labor;
  var fertilityArray = sampleOne[0].fertility;

  var trace1 = {
      type: 'scatter',
      mode: 'markers',
      x: laborArray,
      y: fertilityArray,
      name: sampleOne[0].country,
      width: .8
    };

  laborArray = sampleTwo[0].labor;
  fertilityArray = sampleTwo[0].fertility;
  var trace2 = {
      type: 'scatter',
      mode: 'markers',
      x: laborArray,
      y: fertilityArray,
      name: sampleTwo[0].country,
      width: .8
    };

  laborArray = sampleThree[0].labor;
  fertilityArray = sampleThree[0].fertility;  
  var trace3 = {
      type: 'scatter',
      mode: 'markers',
      x: laborArray,
      y: fertilityArray,
      name: sampleThree[0].country,
      width: .8
    };

  var data = [trace1, trace2, trace3]

  var layout = {
      height: 500,
      margin:{t:15},
      yaxis:{
          title: 'Births per Woman'
      },
      xaxis:{
        title: '% of Women in Labor Force'
      }
    }; 
    
    Plotly.newPlot('graph3', data, layout);

}

// Function to build Graph 4
function updateGraph4() {

  var gdpArray = gdpOne[0].GDP;
  var fertilityArray = gdpOne[0].fertility;

  var trace1 = {
      type: 'scatter',
      mode: 'markers',
      x: gdpArray,
      y: fertilityArray,
      name: sampleOne[0].country,
      width: .8
    };

  gdpArray = gdpTwo[0].GDP;
  fertilityArray = gdpTwo[0].fertility;
  var trace2 = {
      type: 'scatter',
      mode: 'markers',
      x: gdpArray,
      y: fertilityArray,
      name: sampleTwo[0].country,
      width: .8
    };

  gdpArray = gdpThree[0].GDP;
  fertilityArray = gdpThree[0].fertility;  
  var trace3 = {
      type: 'scatter',
      mode: 'markers',
      x: gdpArray,
      y: fertilityArray,
      name: sampleThree[0].country,
      width: .8
    };

  var data = [trace1, trace2, trace3]

  var layout = {
      height: 500,
      margin:{t:15},
      yaxis:{
          title: 'Births per Woman'
      },
      xaxis:{
        title: 'Per Capita GDP'
      }
    }; 
    
    Plotly.newPlot('graph4', data, layout);

}

// Function called by DDM changes
function optionChanged(option) {
    
    console.log(option);
    console.log(dataList);
    console.log(gdpList);

    country = option;

    sampleOne = sampleTwo;
    sampleTwo = sampleThree;
    gdpOne = gdpTwo;
    gdpTwo = gdpThree;

    sampleThree = dataList.filter(selectData);
    gdpThree = gdpList.filter(selectData);

    updateGraph1();
    updateGraph2();
    updateGraph3();
    updateGraph4();



};

console.log("HERE");


d3.json("fertdata.json").then(function(data) { 

  countries = data.countries;
  dataList = data.data;
  gdpList = data.data2;

  console.log(data);

  console.log(countries);
  console.log(dataList);
  console.log(gdpList);

  buildDropDown(countries);

  country = countries[0];
  sampleOne = dataList.filter(selectData);
  gdpOne = gdpList.filter(selectData);

  country = countries[1];
  sampleTwo = dataList.filter(selectData);
  gdpTwo = gdpList.filter(selectData);

  country = countries[2];
  sampleThree = dataList.filter(selectData);
  gdpThree = gdpList.filter(selectData);

  updateGraph1();
  updateGraph2();
  updateGraph3();
  updateGraph4();

});

