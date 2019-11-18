const connected_width = 326.55;
const connected_height = 210;
console.log(connected_height)
var padding = {left:30, right: 10, top:20, bottom:10};
var svg = d3.select("#community")
            .append('svg')
            .attr('width', connected_width)
            .attr('height', connected_height)
            // .style("padding-left", padding.left)
            // .style("padding-right", padding.right)
            // .style("padding-top", padding.top)
            // .style("padding-bottom", padding.bottom)

const connected_color = 'steelblue';

d3.json('/data/community_num.json', function(jsonData){
    var count = 0;
    var community_data = [];
    for(var key in jsonData){
        var data = {};
        data['id'] = key;
        data['num'] = jsonData[key];
        community_data.push(data);
    }
    // community_data = community_data.sort(function(a,b){return a['num']-b['num']});

    // 准备一个pie布局器，此布局可根据原始数据计算出一段弧的开始和结束角度
    let pie = d3.pie()
                .value(d => d.num)
                .sort(function(a,b){return b['num']-a['num'];})
                .padAngle(0.01);
    // 将原始数据经过布局转换
    let drawData = pie(community_data);
    console.log(drawData)
    // 根据画布大小算一个合适的半径吧
    let radius = Math.min(connected_width, connected_height) * 0.8 / 2;
    // 准备一个弧生成器，用于根据角度生产弧路径
    let arc = d3.arc().innerRadius(0).outerRadius(radius);

    let pathParent = svg.append("g")
                        .selectAll("path")
                        .data(drawData)
                        .enter()
                        .append("path")
                        .attr('class', 'connected')
                        .attr('id', function(d,i){return 'connected_' + i})
                        .attr("d", oneData => arc(oneData))// 调用弧生成器得到路径
                        .attr("transform", `translate(${connected_width / 2}, ${connected_height / 2})`)
                        .attr('fill', 'steelblue')
                        .on('click', function(d,i){community_click_do(d, i)});
})
