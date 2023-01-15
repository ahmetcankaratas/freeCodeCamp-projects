//Setting
const width = 960;
const height = 600;


//Shorten
const svg = d3.select("svg")
            .attr("width", width)
            .attr("height", height)

const path = d3.geoPath();

const scale = d3.scaleLinear()
                .domain([1, 10])

const color = d3.scaleThreshold()
                .domain([1, 10, 20, 30, 40, 50, 60])
                .range(d3.schemeGreens[8]);

const legend = svg.append('g') 
    .attr('id', 'legend')
    .attr('transform',`translate(${width - 380}, 20)`);

let tooltip = d3.select("body")
                .append("div")
                .style("opacity", 0)
                .attr("class", "tooltip")
                .attr("id", "tooltip");                  

const educationData = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';

const countiesData = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';

  d3.queue()
  .defer(d3.json, educationData)
  .defer(d3.json, countiesData)
  .await(makeMyMap)

function makeMyMap(error, data, map){

const counties = topojson.feature(map, map.objects.counties).features;
    
    svg.append("g")
     .selectAll("path")
     .data(counties) 
     .enter()
     .append("path")
     .attr("class", "county")
     .attr("d", path)
     .attr("data-fips", (d) => d.id)
     .attr("data-education", (d) => {
      const temp = data.filter((x) => x.fips == d.id)
      return temp[0].bachelorsOrHigher
    })
     .style("fill", (d) => {
      const temp = data.filter((x) => x.fips == d.id)
      return color(temp[0].bachelorsOrHigher)
    })
     .on("mouseover", (d) => {
          tooltip.style("opacity", 0.8)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 30) + "px")
                .attr("data-education", () => {
      const temp = data.filter((x) => x.fips == d.id)
      return temp[0].bachelorsOrHigher
    })
                .html(() => {
      const temp = data.filter((x) => x.fips == d.id)
      return temp[0].area_name + ", " + temp[0].state + ": " + temp[0].bachelorsOrHigher + "%"
    })   
                  
       })
       .on("mouseout", function(d) {
           tooltip.style("opacity", 0)
       });
    
  legend.selectAll('rect')
    .data(color.range())
    .enter()
    .append('rect')
    .style("fill", (d) => d)
    .attr('width', 36)
    .attr('height', 9)
    .attr('x', (d, i) => (36 * i) + i);
 
  legend.selectAll('g')
    .data(color.range())
    .enter()
    .append('g')
    .attr('transform', (d, i) => `translate(${(36 * i) + i-.5 })`)
    .append('line')
    .attr('stroke', '#000')
    .attr('y1', 15);
  
  const legendData = [3,12,21,30,39,48,57,66];
  
  legend.selectAll('g')
    .append('text')
    .attr('x', -10)
    .attr('y', 25)
    .text((d, i) => {return legendData[i] + "%"
                            })
    .style('font-size', 12)  
  }