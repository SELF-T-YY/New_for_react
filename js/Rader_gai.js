

function draw_Rader_gai(){
    var Rader_width = 400;
    var Rader_height = 400;
    var margin = { top: 10, right: 10, bottom: 10, left: 10 };
    
    var svg = d3.select('#container1')
                .append('svg')
                .attr('width', Rader_width)
                .attr('height', Rader_height)
                .append('g')
                .attr('transform', 'translate(200,150)');
                // .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var dataset = {
        fieldNames: ['语文','数学','外语','物理','化学','生物','政治','历史'],
        values: [
            [10,20,30,40,50,60,70,80]
        ]
    };
    
    
    // 设定一些方便计算的常量
    var radius = 100,
    // 指标的个数，即fieldNames的长度
    total = 8,
    // 需要将网轴分成几级，即网轴上从小到大有多少个正多边形
    level = 4,
    // 网轴的范围，类似坐标轴
    rangeMin = 0,
    rangeMax = 100,
    arc = 2 * Math.PI;
    // 每项指标所在的角度
    var onePiece = arc/total;
    // 计算网轴的正多边形的坐标
    var polygons = {
        webs: [],
        webPoints: []
    };
    for(var k=level;k>0;k--) {
        var webs = '',
                webPoints = [];
        var r = radius/level * k;
        for(var i=0;i<total;i++) {
            var x = r * Math.sin(i * onePiece),
                y = r * Math.cos(i * onePiece);
            webs += x + ',' + y + ' ';
            webPoints.push({
                x: x,
                y: y
            });
        }
        polygons.webs.push(webs);
        polygons.webPoints.push(webPoints);
    } 
    
    

    // 绘制网轴
    var webs = svg.append('g')
                    .classed('webs', true);
    webs.selectAll('polygon')
        .data(polygons.webs)
        .enter()
        .append('polygon')
        .attr('points', function(d) {
            return d;
        });


    // 添加纵轴
    var lines = svg.append('g')
                    .classed('lines', true);
    lines.selectAll('line')
            .data(polygons.webPoints[0])
            .enter()
            .append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', function(d) {
                return d.x;
            })
            .attr('y2', function(d) {
                return d.y;
            });


    // 计算雷达图表的坐标
    var areasData = [];
    var values = dataset.values;
    for(var i=0;i<values.length;i++) {
        var value = values[i],
                area = '',
                points = [];
        for(var k=0;k<total;k++) {
            var r = radius * (value[k] - rangeMin)/(rangeMax - rangeMin);
            var x = r * Math.sin(k * onePiece),
                y = r * Math.cos(k * onePiece);
            area += x + ',' + y + ' ';
            points.push({
                x: x,
                y: y
            })
        }
        areasData.push({
            polygon: area,
            points: points
        });
    }


    // 添加g分组包含所有雷达图区域
    var areas = svg.append('g')
                    .classed('areas', true);
    // 添加g分组用来包含一个雷达图区域下的多边形以及圆点 
    areas.selectAll('g')
            .data(areasData)
            .enter()
            .append('g')
            .attr('class',function(d, i) {
                return 'area' + (i+1);
            });
    for(var i=0;i<areasData.length;i++) {
    // 依次循环每个雷达图区域
    var area = areas.select('.area' + (i+1)),
        areaData = areasData[i];
        // 绘制雷达图区域下的多边形
        area.append('polygon')
                .attr('points', areaData.polygon)
                .attr('stroke', function(d, index) {
                    return getColor(i);
                })
                .attr('fill', function(d, index) {
                    return getColor(i);
                });
        // 绘制雷达图区域下的点    
        var circles = area.append('g')
                .classed('circles', true);
        circles.selectAll('circle')
                .data(areaData.points)
                .enter()
                .append('circle')
                .attr('cx', function(d) {
                    return d.x;
                })
                .attr('cy', function(d) {
                    return d.y;
                })
                .attr('r', 3)
                .attr('stroke', function(d, index) {
                    return getColor(i);
                });  
    }
    function getColor(i){
        return 'red';
    }
}

draw_Rader_gai()