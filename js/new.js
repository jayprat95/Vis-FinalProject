function gridData() {
    var data = new Array();
    var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
    var ypos = 1;
    var width = 50;
    var height = 50;

    // iterate for rows 
    for (var row = 0; row < 10; row++) {
        data.push( new Array() );

        // iterate for cells/columns inside rows
        for (var column = 0; column < 10; column++) {
            if(row==0 || row ==1 && column < 4){
				data[row].push({
                x: xpos,
                y: ypos,
                width: width,
				height:height,
				image:"images/green.svg"
			})
			}else{
				data[row].push({
                x: xpos,
                y: ypos,
                width: width,
				height:height,
				image:"images/black.svg"				
            })}
            // increment the x position. I.e. move it over by 50 (width variable)
            xpos += width;
        }
        // reset the x position after a row is complete
        xpos = 1;
        // increment the y position for the next row. Move it down 50 (height variable)
        ypos += height; 
    }
    return data;
}

console.log(gridData);

var gridData = gridData();    
// I like to log the data to the console for quick debugging
console.log(gridData);

var grid = d3.select("#grid")
    .append("svg")
    .attr("width","510px")
    .attr("height","510px");

var row = grid.selectAll(".row")
    .data(gridData)
    .enter().append("g")
    .attr("class", "row");

var column = row.selectAll(".men")
    .data(function(d) { return d; })
    .enter().append("svg:image")
    .attr("class","men")
	.attr("xlink:href", function(d){return d.image;})
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; })
    .attr("width", function(d) { return d.width; })
	.attr("height", function(d) { return d.height; });
