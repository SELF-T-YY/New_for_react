/*
 * @Author: ChenShan 
 * @Date: 2019-09-27 21:07:57 
 * @Last Modified by: ChenShan
 * @Last Modified time: 2019-09-27 21:23:28
 */
tsne_filename = "data/oregonf_tsne_5000.csv";
tsne_draw_id = "#Right_1";

function darwtsnenodes(filename,draw_id){
    d3.csv(filename,function(error,data){
        {
        tsneData = data;
        for(var i = 0 ;i < data.length ; i++){
            tsneData[i].x = parseFloat(data[i].x);
            tsneData[i].y = parseFloat(data[i].y);
            tsneData[i].id = parseInt(data[i].id);
        }
        }

        {
        var x_max = d3.max(tsneData,function(d){
            return d.x;
        })
        var x_min = d3.min(tsneData,function(d){
            return d.x;
        })
        var y_max = d3.max(tsneData,function(d){
            return d.y;
        })
        var y_min = d3.min(tsneData,function(d){
            return d.y;
        })
        var xScale = d3.scaleLinear()
                        .domain([x_min,x_max])
                        .range([10,450]);
        var yScale = d3.scaleLinear()
                        .domain([y_min,y_max])
                        .range([10,350]);
        }
        var tsne_height = 350;
        var tsne_width = 450;

        var tsne_svg = d3.select(draw_id)
                            .append("svg")
                            .attr("id","tsneNodes")
                            .style("position","absolute")
                            .attr("height",tsne_height)
                            .attr("width",tsne_width);
        {
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
                        return d.id;
                    })
                    .attr("r",1.2)
                    .attr("fill","rgb(23, 37, 90,0.6)");
        }
    })
}

darwtsnenodes(tsne_filename,tsne_draw_id);