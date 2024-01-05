// Read in URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Promise pending
const dataPromise = d3.json(url);
    console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then((data) => {
    console.log(data.names[1]);


// Create DDL from names list
let ddl = d3.select('select');
data.names.forEach(nameId => ddl.append('option').attr('value',nameId).text(nameId));

// user selects a test subject ID from DDL.
let dropdown = d3.select("#selDataset"); 
dropdown.on("change", function() {
    selectId = this.value;
    console.log(selectId);
    const idIndex = (element) => element == selectId
    console.log(idIndex);
    nameIndex = data.names.findIndex(idIndex);
    console.log(nameIndex);
    d3.select('.panel-body').html("");
    demData(nameIndex);
    barChart(nameIndex);
    bubbleChart(nameIndex);
});

// Set default to 0
var nameIndex=(typeof nameIndex === 'undefined')? 0:nameIndex;
console.log(nameIndex);

//  Displays the id, gender, age, location, wash frequency, and the bellybutton type for selected Test Subject ID
function demData(nameIndex) {
    let demoData = data.metadata[nameIndex];
    console.log(demoData)
    Object.entries(demoData).forEach(([key,value])=> {
        let addDemoData = d3.select('.panel-body').append('h5');
        addDemoData.text('${key}:  ${value}')
    })};
    demData(nameIndex);

    // Bar Chart
    // Plots top ten otu
    function barChart(nameIndex) {
        let barx = data.samples[nameIndex].sample_values.slice(0,10).reverse();
        let bary = data.samples[nameIndex].otu_ids.slice(0,10).reverse();
        let barystr = []
        bary.forEach(pear => barystr.push(`OTU_${pear}`));
        let barz = data.samples[nameIndex].otu_labels.slice(0,10).reverse();
        console.log(barx)
        console.log(bary)
        console.log(barz)
        
        let colorlist = [ 'red','orangered','orange', 'yellow','yellowgreen', 'green','blue','mediumblue','rebeccapurple','indigo'];
    let colorlist2 = ['#f0f921','#fdca26','#fb9f3a','#ed7953','#d8576b','#bd3786','#9c179e','#7201a8','#46039f','#0d0887']
        
        let trace1 = {
            x: barx,
            y: barystr,
            text: barz,
            type: 'bar',
            orientation: 'h',
            marker:{color: colorlist}
        };
        let data1 = [trace1];

        let layout1 = {
            showlegend: false,
            height: 350
        };
        Plotly.newPlot("bar", data1,layout1)};
    barChart(nameIndex);

    // BubblePlot
    function bubbleChart(nameIndex) {
        let bubblex = [data.samples[nameIndex].otu_ids];
        console.log(bubblex)
        let bubbley = [data.samples[nameIndex].sample_values];
        console.log(bubbley)
        let bubblez = [data.samples[nameIndex].otu_labels];
        console.log(bubblez)

        let trace2 = {
            x: bubblex[0],
            y: bubbley[0],
            xlimit: 4000,
            text: bubblez[0],
            mode: 'markers',
            marker: {
              size: bubbley[0],
              color: bubblex[0],
              colorscale: 'Earth'
            }
          };
          let data2 = [trace2];
      
          let layout2 = {
            title: {text: `ID_${data.names[nameIndex]} OTU ID`,font: { size: 24 } },
            showlegend: false,
     
            margin: { t: 75, r: 25, l: 50, b: 35 },
            paper_bgcolor: "aliceblue",
            font: { color: "darkblue", family: "Arial" },
            xaxis: {title:"OTU_ID"},
            yaxis: {title: "OTU count"}
          };
        };
    });