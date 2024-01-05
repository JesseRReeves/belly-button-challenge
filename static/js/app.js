// Set up URL for data
const url =
  "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and store it for later use
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetching JSON data and logging it
d3.json(url).then(function (data) {
  console.log(data);
});

let samples; // Variable to hold sample data
let meta_data; // Variable to hold metadata

// Fetching JSON data and setting up charts using promises
d3.json(url).then(function (data) {
  let selector = d3.select("#selDataset");
  meta_data = data.metadata;
  samples = data.samples;

  // Adding sample IDs to the dropdown menu
  data.names.forEach((id) => {
    selector.append("option").text(id).property("value", id);
  });

  // Initializing charts with initial sample and metadata
  metaData(meta_data[0]);
  hbarChart(samples[0]);
  bubbleChart(samples[0]);
});

// Function to handle dropdown change
function optionChanged(value) {
  const selectedId = samples.find((item) => item.id === value);
  const demographicInfo = meta_data.find((item) => item.id == value);

  // Inserting Demographic Data
  metaData(demographicInfo);

  // Update Bar Chart
  hbarChart(selectedId);

  // Update Bubble Chart
  bubbleChart(selectedId);
}

// Function to update metadata information
function metaData(demographicInfo) {
  let demoSelect = d3.select("#sample-metadata");

  // Displaying metadata info in HTML
  demoSelect.html(
    `id: ${demographicInfo.id} <br> 
      ethnicity: ${demographicInfo.ethnicity} <br>
    gender: ${demographicInfo.gender} <br>
    age: ${demographicInfo.age} <br>
    location: ${demographicInfo.location} <br>
    bbtype: ${demographicInfo.bbtype} <br>
    wfreq: ${demographicInfo.wfreq}`
  );
}

// Function to create or update the horizontal bar chart
function hbarChart(selectedId) {
  let x_axis = selectedId.sample_values.slice(0, 10).reverse();
  let y_axis = selectedId.otu_ids
    .slice(0, 10)
    .reverse()
    .map((item) => `OTU ${item}`);
  let text = selectedId.otu_labels.slice(0, 10).reverse();

  let barChart = {
    x: x_axis,
    y: y_axis,
    text: text,
    type: "bar",
    orientation: "h",
  };

  let chart = [barChart];

  let layout = {
    margin: { l: 100, r: 100, t: 0, b: 100 },
    height: 500,
    width: 600,
  };

  Plotly.newPlot("bar", chart, layout);
}

// Function to create or update the bubble chart
function bubbleChart(selectedId) {
  let x_axis = selectedId.otu_ids;
  let y_axis = selectedId.sample_values;
  let marker_size = selectedId.sample_values;
  let color = selectedId.otu_ids;
  let text = selectedId.otu_labels;

  let bubble = {
    x: x_axis,
    y: y_axis,
    text: text,
    mode: "markers",
    marker: {
      color: color,
      colorscale: "Electric",
      size: marker_size,
    },
    type: "scatter",
  };

  let chart = [bubble];

  let layout = {
    xaxis: {
      title: { text: "OTU ID" },
    },
  };

  Plotly.newPlot("bubble", chart, layout);
}