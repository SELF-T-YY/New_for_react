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
        for(let key in datas)
        {
            var data = {};
            data['id'] = key;
            data['num'] = Math.log10(datas[key]);
            dataset.push(data);
        }
        dataset = dataset.sort(function(a,b){return b['num'] - a['num']})

        let rect_data = []
        for(var key in dataset){
            rect_data.push(dataset[key].num);
        }
        const rectWidth = 4;
        //画布周边的空白
        const padding = {left:30, right: 10, top:20, bottom:200};
        //定义一个数组
        // var dataset = [10, 20, 30, 40, 33, 24, 12, 5];
        var svg = d3.select('#Down_2_1')
                    .append('svg')
                    .attr('width',c_width)
                    .attr('height', c_height);
//V4版本-start
        var xScale = d3.scaleBand()
                .domain(d3.range(0,rect_data.length))
                .range([0,c_width-padding.left-padding.right]);
//V4版本-end
        var yScale = d3.scaleLinear()//V4版本
                .domain([0,d3.max(rect_data)])
                .range([c_height-padding.bottom-padding.top,0]);
        
        var rects_re = svg.selectAll('MyRect_re')
                        .data(rect_data)
                        .enter()
                        .append('rect')
                        .attr('class','MyRect_re')
                        .attr("transform","translate(" + padding.left + "," + padding.top + ")")
                        .attr('x',function(d,i){
                            return xScale(i) + rectWidth/2;
                        }).attr('y',function(d,i){
                            return yScale(d);
                        }).attr('width',xScale.bandwidth() - rectWidth)
                        .attr('height',function(d,i){
                            return c_height-padding.bottom-padding.top-yScale(d);
                        }).attr('fill','steelblue')
                        .style('opacity', 0.5)
                        .attr("class", "community_Distribution")


        var rects = svg.selectAll('MyRect')
                        .data(rect_data)
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
                            return "community_Distribution_" + dataset[i].id;
                        })
                        .attr("class", "community_Distribution")
                        .on("click",function(d,i){community_click_do(d, dataset[i].id)});
                

        svg.append('g')
                .attr('class','axis').attr("transform","translate(" + padding.left + "," + (c_height - padding.bottom) + ")").call(d3.axisBottom(xScale));//d3.axisBottom(xScale)  --V4版本
        svg.append('g')
                .attr('class','axis').attr("transform","translate(" + padding.left + "," + padding.top + ")").call(d3.axisLeft(yScale));//d3.axisLeft(yScale) --V4版本
    })
}
draw_bar_chart();


function draw_community_disribution_again(){
    force_file_name
    let community_num = {}
    d3.json(force_file_name,function(force_date){
        d3.json('/data/community_id.json', function do_data(datas){
            for(let key in datas){

            }
        }
    })
}