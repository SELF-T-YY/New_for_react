/*
 * @Author: ChenShan 
 * @Date: 2019-09-29 19:47:58 
 * @Last Modified by: ChenShan
 * @Last Modified time: 2019-09-30 21:55:24
 */

var heatmap_filename = "../data/oregonf_heatmap.csv";
var heatmap_draw_id = "#Right_1_canvas";
var heatmap_height = 350;
var heatmap_width = 400;

function drawheatmap(filename,draw_id){
    d3.csv(filename,function(error,data){
        var heatmapData = []
        Data = data;    
        for(var i=0;i<Data.length;i++){
            heatmapData.push({
                id:parseInt(Data[i].id),
                x:parseFloat(Data[i].x),
                y:parseFloat(Data[i].y),
                value:parseFloat(Data[i].kde)
            });
        }
        var x_max = d3.max(heatmapData,function(d){return d.x;})
        var x_min = d3.min(heatmapData,function(d){return d.x;})
        var y_max = d3.max(heatmapData,function(d){return d.y;})
        var y_min = d3.min(heatmapData,function(d){return d.y;})
        var xScale = d3.scaleLinear()
                        .domain([x_min,x_max])
                        .range([10,heatmap_width]);
        var yScale = d3.scaleLinear()
                        .domain([y_min,y_max])
                        .range([30,heatmap_height]);
        for(var i = 0 ; i < heatmapData.length; i++){
            heatmapData[i].x = parseInt(xScale(heatmapData[i].x));
            heatmapData[i].y = parseInt(yScale(heatmapData[i].y));
        }
        var point ={};
        var heatmapInstance = h337.create({
            container: document.querySelector(draw_id),
            radius: 9.5,
            maxOpacity: .9,
            blur: 1
        });
        var data = { 
            max: 0,
            data: point
        };
        heatmapInstance.setData(data);
        var currentData = heatmapInstance.getData();
        for(var i = 0; i < heatmapData.length; i++){
            var dataPoint = {
                x:heatmapData[i].x,
                y:heatmapData[i].y,
                value:heatmapData[i].value
            };
            heatmapInstance.addData(dataPoint);
        }  
    })
}

// drawheatmap(heatmap_filename,heatmap_draw_id);

// function change_node_heatmap()
// {
//     console.log('yes');
//     d3.select("#tsneNodes").remove();
//     drawheatmap(heatmap_filename,heatmap_draw_id);    
// }
