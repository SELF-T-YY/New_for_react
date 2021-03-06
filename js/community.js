let nodes = [];
let links = [];
const force_community_width = 326.55;
const force_community_height = 210;
const force_community_circle_Color = 0x3A435E;
const line_Color = 0xc6c6c6;

function draw_community(datas){
    d3.json('/data/community_num.json', function (datas)
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
                links.push(link)
            }
        }

        var svg = d3.select("#community")
                    .append('svg')
                    .attr('width', force_community_width)
                    .attr('height', force_community_height);
        
        var simulation = d3.forceSimulation(nodes)
                            .force('link', d3.forceLink(links).distance(100))
                            .force('charge', d3.forceManyBody())
                            .force('center', d3.forceCenter(force_community_width/2-10, force_community_width/2-55));

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
                            .style("stroke-width",0.5)
                            .call(d3.zoom()//创建缩放行为
                                .scaleExtent([-5, 10])//设置缩放范围
                            );

        var svg_nodes = svg.selectAll("circle")
                                .data(nodes)
                                .enter()
                                .append("circle")
                                .attr("cx", d => (d.x))
                                .attr("cy", d => (d.y))
                                // .attr('fill', d =>(d['color']))
                                .attr("r", d =>(Math.log(d.num)))
                                .attr("class", "community")
                                .attr('id', function(d,i){
                                    return 'community_' + i;
                                })
                                .attr("fill", 'steelblue')
                                .on("click",community_click_do);

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
        }
    })
}


draw_community();