var tsne_filename = "../data/oregonf_tsne_5000.csv";
var tsne_draw_id = "#Right_1_1";
var tsne_selected_color = "rgb(255,0,0,1.0)"
var tsne_unselected_color = "rgb(23, 37, 90,0.6)"
var tsne_height = 350;
var tsne_width = 410;
var tsne_svg = d3.select(tsne_draw_id)
                            .append("svg")
                            .attr("id","tsneNodes")
                            .style("position","absolute")
                            .attr("height",tsne_height)
                            .attr("width",tsne_width);
function darwtsnenodes(filename,draw_id){
    d3.csv(filename,function(error,data){
        tsneData = data;
        for(var i = 0 ;i < data.length ; i++){
            tsneData[i].x = parseFloat(data[i].x);
            tsneData[i].y = parseFloat(data[i].y);
            tsneData[i].id = parseInt(data[i].id);
        }
        var x_max = d3.max(tsneData,function(d){return d.x;})
        var x_min = d3.min(tsneData,function(d){return d.x;})
        var y_max = d3.max(tsneData,function(d){return d.y;})
        var y_min = d3.min(tsneData,function(d){return d.y;})
        var xScale = d3.scaleLinear()
                        .domain([x_min,x_max])
                        .range([5,tsne_width]);
        var yScale = d3.scaleLinear()
                        .domain([y_min,y_max])
                        .range([5,tsne_height]);
        tsne_svg.append("g")
                    .selectAll("circle")
                    .data(tsneData)
                    .enter()
                    .append("circle")
                    .attr("class","tsne_node")
                    .attr("cx",function(d){
                        return xScale(d.x);
                    })
                    .attr("cy",function(d){
                        return yScale(d.y);
                    })
                    .attr("id",function(d){
                        return "tsne_node_"+d.id;
                    })
                    .attr("r",1.2)
                    .attr("fill",tsne_unselected_color)
                    .on("click",function(d)
                    {
                        clearSelectPoint();  
                    });
        function tsne_point_click(id)
        {
            d3.select("#tsne_node_"+id).style("fill",tsne_selected_color);
        }
        
        function tsne_change_color(nodes,svg)
        {
            svg.selectAll("circle").style("opacity",0.6);
            for(var i = 0;i < data.length;i++)
            {
                d3.selectAll("#tsne_node_"+data[i]).style("fill",tsne_selected_color);
            }
        }
        

        
        function brush_tsne(selectpoints){
            for( var i = 0;i<selectpoints.length;i++){
                d3.select("#tsne_node_"+selectpoints[i].id).style("fill",selectedColor);
            }
        }
        function clearSelectPoint(){
            d3.selectAll("circle").style("fill",tsne_unselected_color);
        }
        var brush = d3.brush();
        function brushed(){}
        function brushend(){
            d3.selectAll("circle").style("fill",tsne_unselected_color);
            var event = d3.event.selection;
            var x1=event[0][0], y1=event[0][1], x2=event[1][0], y2=event[1][1];
            var x_max=d3.max([x1,x2]), y_max=d3.max([y1,y2]), x_min=d3.min([x1,x2]), y_min=d3.min([y1,y2]);
            var selectpoints=[];
            for(var i=0;i<tsneData.length;i++){
                var x=parseFloat($("#tsne_node_"+tsneData[i].id)[0].attributes.cx.value);
                var y=parseFloat($("#tsne_node_"+tsneData[i].id)[0].attributes.cy.value);
                if(x>=x_min&&x<=x_max&&y>=y_min&&y<=y_max){
                    selectpoints.push(tsneData[i].id);
                    tsne_point_click(tsneData[i].id);
                    d3.select("#tsne_node_"+tsneData[i].id).style("fill",tsne_selected_color);
                }
            }
        brush_tsne_force(selectpoints);
        }
        tsne_svg.append("g")
                .attr("class","brush")
                .call(brush.on("start brush",brushed).on("end",brushend));
        brushed();
    })
}
darwtsnenodes(tsne_filename,tsne_draw_id);
function change_heatmap_node()
{
    var v=d3.select('#node_heatmap_select').attr('vlaue');
    console.log(v);
    if(v=='Nodes')
    {
        d3.select(".heatmap-canvas").remove();
        darwtsnenodes(tsne_filename,tsne_draw_id);   
    }
    else
    {
        d3.select("#tsneNodes").remove();
        drawheatmap(heatmap_filename,heatmap_draw_id);        
    }
    console.log('yes');
}


function tmep_fuction(text)
{
    if(text.innerHTML=="Heatmap"){
        d3.select("#tsneNodes").remove();
        drawheatmap(heatmap_filename,heatmap_draw_id);
        text.innerHTML="Nodes"
    }
    else {
        text.innerHTML="Heatmap"
        var t = d3.select(".heatmap-canvas");
        t.remove();
        darwtsnenodes(tsne_filename,tsne_draw_id);
    }
}



function brush_tsne_force(selectpoints)
{
    var circles_change_color = 0xff00ff;
    choosed_point_data = data_community[i];
    circles_choose.clear();
    circles_choose_change_color.clear();
    for(let node in  selectpoints)
    {
        const now_x = (datas[choosed_point_data[node]].x);
        const now_y = (datas[choosed_point_data[node]].y);
        circles_choose_change_color.beginFill(circles_change_color);
        circles_choose_change_color.drawCircle(now_x,now_y,5);
        circles_choose_change_color.endFill();
    }
    app.stage.addChild(circles_choose_change_color);
}