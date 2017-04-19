
d3.json("./WebScraper/gdp_2014.json", function(error, data) {
    console.log(data); // this will show the info it in firebug console

    data = data.filter(function(d){
        return d["Value"] >= data[0]["Value"];
      });
    data.sort(function(a, b) {
        return b["Value"] - a["Value"];
    })
    console.log(data); // this will show the info it in firebug console

    var svg = d3.select("#gdp-2014"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



      x.domain(data.map(function(d) {
         return d["Country Code"]; }));
      y.domain([0, d3.max(data, function(d) { return d["Value"]; })]);

      g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x)
          .tickFormat(function(d) {
            if (d != "USIM"){
              return d;
            }
            for (var country in data){

            if (data[country]["Country Code"] == d){
              return data[country]["Country Name"]
            }
          }return "" })
        );

      g.append("g")
          .attr("class", "axis axis--y")
          .call(d3.axisLeft(y).ticks(10).tickFormat(function(d) {
            var value = d/1000000000;
            return "$"+value+"B";}))
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Frequency");

      g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d["Country Code"]); })
          .attr("y", function(d) { return y(d["Value"]); })
          .attr("width", x.bandwidth())
          .attr("height", function(d) { return height - y(d["Value"]); });


      d3.selectAll(".bar").filter(function(d){
            return d["Country Code"] == "USIM";
          }).classed("selected",true);

      d3.selectAll(".selected").classed("bar",false);
});
/*

var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", function(d) {
  d.frequency = +d.frequency;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("y", function(d) { return y(d.frequency); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.frequency); });
});*/
