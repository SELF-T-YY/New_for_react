let dataset = [];
const filter_color = 0x123123;
const rest_color = 0x354985;
const choose_color = 0xff00ff;

const c_width = 540;
const c_height = 350;


function draw_bar_chart(data)
{
    d3.json('/data/community_num.json', function do_data(datas)
    {
        let count = 0
        for(let key in datas)
        {
            dataset.push(Math.log10(datas[key]));
            count += 1;
        }

        const rectWidth = 4;
        //画布周边的空白
        const padding = {left:30, right: 10, top:20, bottom:200};
        //定义一个数组
        // var dataset = [10, 20, 30, 40, 33, 24, 12, 5];
        var svg = d3.select('#Down_2_1').append('svg').attr('width',c_width).attr('height', c_height);
//V4版本-start
        var xScale = d3.scaleBand()
                .domain(d3.range(0,dataset.length))
                .range([0,c_width-padding.left-padding.right]);
//V4版本-end
        var yScale = d3.scaleLinear()//V4版本
                .domain([0,d3.max(dataset)])
                .range([c_height-padding.bottom-padding.top,0]);
        var rects = svg.selectAll('MyRect')
                        .data(dataset)
                        .enter()
                        .append('rect')
                        .attr('class','MyRect')
                        .attr("transform","translate(" + padding.left + "," + padding.top + ")")
                        .attr('x',function(d,i){
                            return xScale(i) + rectWidth/2;
                        }).attr('y',function(d,i){
                            return yScale(d);
                        }).attr('width',xScale.bandwidth() - rectWidth)
                        .attr('height',function(d,i){
                            return c_height-padding.bottom-padding.top-yScale(d);
                        }).attr('fill','steelblue')
                        .attr("id",function(d, i){
                            return "community_Distribution_" + i;
                        })
                        .attr("class", "community_Distribution")
                        .on("click",community_click_do);
                

        svg.append('g')
                .attr('class','axis').attr("transform","translate(" + padding.left + "," + (c_height - padding.bottom) + ")").call(d3.axisBottom(xScale));//d3.axisBottom(xScale)  --V4版本
        svg.append('g')
                .attr('class','axis').attr("transform","translate(" + padding.left + "," + padding.top + ")").call(d3.axisLeft(yScale));//d3.axisLeft(yScale) --V4版本
    })
}
draw_bar_chart();

// function community_Distribution_click_do(d,i){
//     force_change_color(i);
//     community_Distribution_change_color(i);
//     sankey_change_color(i);
// }

