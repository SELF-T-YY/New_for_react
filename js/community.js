var nodes = [];
var links = [];
var force_width = 300;
var force_height = 300;
var circle_Color = 0x3A435E;
var line_Color = 0xc6c6c6;
d3.json('/data/community_num.json', function populate(datas)
{
    var count = 0;
    for(var key in datas)
    {
        var node = {};
        node['id'] = key;
        node['num'] = datas[key];
        nodes.push(node);
        count++;
    }
    for(var i=0;i<count;i++)
    {
        for(var j=i+1;j<count;j++)
        {
            var link = {};
            link["source"] = nodes[i]['id'];
            link['target'] = nodes[j]['id'];
        }
    }

    var svg = d3.select("#community")
                .append('svg')
                .attr('width', width)
                .attr('height', height);
    
    var simulation = d3.forceSimulation(nodes)
                        .force('link', d3.forceLink(links).distance(100))
                        .force('charge', d3.forceManyBody())
                        .force('center', d3.forceCenter(width/2, height/2));

    simulation
            .nodes(nodes)
            .on('tick', ticked);
    
    simulation.force('link')
            .links(links);

    // 绘制
    var svg_links = svg.selectAll("line")
                        .data(links)
                        .enter()
                        .append("line")
                        .style("stroke","#ccc")
                        .style("stroke-width",3)
                        .call(d3.zoom()//创建缩放行为
                            .scaleExtent([-5, 2])//设置缩放范围
                        );

   var svg_nodes = svg.selectAll("circle")
                        .data(nodes)
                        .enter()
                        .append("circle")
                        .attr("cx", function(d) { return d.x; })
                        .attr("cy", function(d) { return d.y; })
                        .attr("r", '20')
                        .attr("fill", function(d,i){
                            return color(i);
                        }).call(d3.drag().on("start", dragstarted)//d3.drag() 创建一个拖曳行为
                            .on("drag", dragged)
                            .on("end", dragended));
                            console.log(nodes);
    //  //添加描述节点的文字
    //  var svg_texts = svg.selectAll("text")
    //                     .data(nodes)
    //                     .enter()
    //                     .append("text")
    //                     .style("fill", "black")
    //                     .attr("dx", 20)
    //                     .attr("dy", 8)
    //                     .text(function(d){
    //                         return d.name;
    //                     });
   function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();//设置目标α
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    function ticked() {
        svg_links.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        svg_nodes.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
         
        svg_texts.attr("x", function(d){ return d.x; })
           .attr("y", function(d){ return d.y; });
      }
})