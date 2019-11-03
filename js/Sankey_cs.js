const sankey_width = 400;
const sankey_height = 400;
const sankey_color = 0x3A435E;

// 节点和连接数据
var data = {
    'nodes': [
    {id: "0"},
    {id: "1"},
    {id: "2"},
    {id: "3"},
    {id: "4"},
    {id: "5"},
    {id: "6"},
    {id: "7"},
    {id: "8"}
    ],
    'links': [
    {source: 0, target: 3, value: 10},
    {source: 1, target: 4, value: 10},
    {source: 2, target: 4, value: 5},
    {source: 1, target: 5, value: 5},
    {source: 3, target: 6, value: 5},
    {source: 3, target: 7, value: 5},
    {source: 4, target: 7, value: 10},
    {source: 4, target: 8, value: 5},
    {source: 5, target: 8, value: 5}
    ]
};


var svg = d3.select("body")
    .append("svg")
    .attr("width", sankey_width)
    .attr("height", sankey_height);


// 定义桑基布局
var sankey = d3.sankey()
                .nodeWidth(80) 
                .nodePadding(40) 
                .size([sankey_width, sankey_height]) 
                .nodes(data.nodes)  
                .links(data.links)
                .linkSort(3);


// 路径数据生成器
// var path = sankey.linkSort();

// 绘制连接数据
var links = svg.append("g")
                .attr("fill", "none")
                .attr("stroke", "#000")
                .attr("stroke-opacity", 0.2)
                .selectAll("path")
                .data(data.links)
                .join("path")
                .attr("d", d3.sankeyLinkHorizontal())
                .attr("stroke-width", function(d) { return d.width; });
// var links = svg.append("g").selectAll("path")
//             .data(data.links)
//             .enter()

// 绑定节点数据
var nodes = svg.append("g").selectAll(".node")
                .data(data.nodes)
                .enter();
                
console.log(nodes);
// 绘制连接线
links.append("path")
    .attr({
    fill: "none",   //填充色
            stroke: function(d,i){ return color(i); },  //描边色
        "stroke-opacity": 0.5,  //描边透明度
        d: path,  //路径数据
        id: function(d,i){ return 'link' +i }  //ID
    })
    .attr("stroke-width", function (d) {  //连线的宽度
        return Math.max(1, d.dy);
    });

// 绘制圆形节点   
nodes.append("circle")
    .attr("transform",function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    })
        .attr("r", function(d) { return d.dy / 2; })
        .attr("cx", function(d) { return d.dx/2; })
        .attr("cy", function(d) { return d.dy / 2; })
        .style("fill", "tomato")
        .style("stroke", "gray");

// 绘制节点文本
nodes.append("text")
        .attr({
            x: function (d) { return d.x+sankey.nodeWidth() / 2; },
            y: function (d) { return d.y+d.dy / 2; }
        })
        .text(function (d) { return d.name; }); 


// 绘制连接文本
links.append('text')
        .append('textPath')
        .attr('xlink:href', function (d,i) { return '#link' + i; })
        .attr('startOffset','50%')
        .text(function (d) { return '流量:' + d.value; })
// var svg = d3.select("body")
//             .append("svg")
//             .attr("width", sankey_width)
//             .attr("height", sankey_height);

// var sankey = d3.sankey()
//                 .nodeWidth(50)
//                 .nodePadding(30)
//                 .size([sankey_width, sankey_height])
//                 .nodeId((d)=>d.id);

// var {nodes, links} = sankey({
//                         nodes:data.nodes,
//                         links: data.links
//                     });

// const rects = svg.append('g')
//                     .attr('class', 'rects')
//                     .selectAll('.node')
//                     .data(nodes)
//                     .enter()
// rects.append('g')
//     .attr('class', 'node')
//     .attr('index', (d)=> d.name)
