//Create margin
const margin = {top: 100, right: 50, bottom: 150, left: 100};

//Add margin 
const width = 1250 - margin.left - margin.right
const height = 500 - margin.top - margin.bottom;

//Add tooltip
const div = d3.select("body")
.append("div")
.attr("id","tooltip")
.style("opacity", 0)

const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

//Month parse and format
const monthParse = d3.timeParse("%b");
const monthFormat = d3.timeFormat("%b");

//Year parse and format
const yearParse = d3.timeParse("%Y");
const yearFormat= d3.timeFormat("%Y");

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const revMonth = month.reverse();

//Apend Canvas
const svg = d3.select("body")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom);

//Create Chart Group
const chartGroup = svg.append('g')
                  .attr('transform',    `translate(${margin.left},${margin.top})`)

d3.json(url).then((data) => {
  const dataset = data.monthlyVariance;
  const baseTemp = data.baseTemperature;
  //Min. Max. Temperature
  const minVar = d3.min(dataset, d => d.variance);
  const maxVar = d3.max(dataset, d => d.variance);
  
  //Min.Max. Year
  const minYear = d3.min(dataset, d => d.year);
  const maxYear = d3.max(dataset, d=> d.year);
  const diffYear = maxYear - minYear;
  
const interpolatePlasma = d3.scaleSequential(d3.interpolatePlasma).domain([baseTemp + minVar, baseTemp + maxVar]);

  //color
const colorFn = d3.scaleSequential(d3.interpolateRdYlBu).domain([
   Math.floor(maxVar),
   Math.ceil(minVar)
 ])

//Thanks for
//https://github.com/d3/d3-scale-chromatic
//https://blog.risingstack.com/tutorial-d3-js-calendar-heatmap/

//set up X
  const xValue = (d) => yearParse(d.year);
  
  const xScale = d3.scaleTime()
                   .range([0, width])
                   .domain(d3.extent(dataset, (d) => yearParse(d.year)));
  
  const xMap = d => xScale(xValue(d));
  
  const xAxis = d3.axisBottom(xScale)
                  .ticks(26)
                  .tickFormat(d3.timeFormat("%Y"));

//Set up Y
  const yValue = (d) => d.month - 1;
  const yScale = d3.scaleLinear()
                   .range([0,height])
                   .domain([0,11])
  
  const yMap = d => yScale(yValue(d));
  const yAxis = d3.axisLeft(yScale)
                  .tickFormat((d,i)=> `${month[12 - (d + 1)]}`);

  //X-Axis
  chartGroup.append('g')
  .attr('class','x axis')
  .attr('id', 'x-axis')
  .attr('transform', `translate(0,${(height) + height/12})`)
  .call(xAxis);

  //Y-Axis
  chartGroup.append('g')
            .attr('transform', `translate(0,${(height / 12) / 2 })`)
            .attr('id', 'y-axis') 
            .call(yAxis);

//ADD BARS
  chartGroup.append('g')
            .selectAll('rect')
            .data(dataset)
            .enter().append('rect')
            .attr('class','cell')
            .attr('x', (d) => xMap(d))
            .attr('y', (d) => yMap(d))
            .attr('rx',1)
            .attr('ry',1)
            .attr('width', (width / diffYear) - .25)
            .attr('height', height / 12 + 2.25)
            .attr('data-month', d => d.month - 1)
            .attr('data-year', d => d.year)
            .attr('data-temp', d => baseTemp + d.variance)
            .style("fill", (d) => (colorFn(d['variance'])))
            //Tooltip
            .on("mouseover", function(d) {
            div.transition()
            .duration(200)
            .style("opacity", .9);
            //ADD Text
      div.html(d["year"] + "- " + month[d["month"]] +"<br>" + d["variance"] + "℃")
      .attr("data-year", d["year"])
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY) + "px")
      })
      .on("mouseout", function(d) {
      div.transition()
         .duration(500)
         .style("opacity", 0)
      })


  //Legend
let range = [-6,-5,-4,-3,-2,-1,0,1,2,3,4]

const zScale = d3.scaleLinear()
              .domain([-6, 5])
              .range([0, 300]);

const zAxis = d3.axisBottom()
              .scale(zScale)
              .ticks(12)
              .tickSize(-25)

chartGroup.append("g")
.attr("id","legend")
.attr('transform', `translate(${(width/3)},${(height) + 100})`)
.call(zAxis)
  
  
  chartGroup.append("g")
    .attr("id","legend")
    .attr("class","legend")
    .selectAll("rectLegend")
    .data(range)
    .enter()
    .append("rect")
    .attr("width", 300/11)
    .attr("height",25)
    .attr("x", (d)=>(zScale(d)+(width/3)))
    .attr("y", 325)
    .style("fill", (d) => (colorFn(d)))
  
  
})