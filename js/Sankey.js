var Sankey_height = document.getElementById('Down_1').offsetHeight;
var Sankey_width = document.getElementById('Down_1').offsetWidth;
const margin = {top: 10, right: 5, bottom: 10, left: 10};
const padding_width = 2;
const padding_height = 20;
const top_y = 10;
const bottom_y = Sankey_height - 80;
const scaleX = 25;
var community_num_all = 33;
var sankey_color_file_name = NaN;

var colorArr=[
    "#a50026",
    "#d73027",
    "#f46d43",
    "#fdae61",
    "#fee090",
    "#ffffbf",
    "#e0f3f8",
    "#abd9e9",
    "#74add1",
    "#4575b4"]

var sankey_file_name = NaN
var sankey_width_will_be = NaN

function draw_sankey(){
    d3.json('/data/sankey_data_gai.json', function(datas){

        let community_num_count = 0;
        let node_top = datas['nodes']['top_community'];
        node_top_dataset = []
        for(let key in node_top){
            community_num_count ++
            node_top_dataset.push(node_top[key]['community_node_num']);
        }
        community_num_all = community_num_count;

        let node_bottom = datas['nodes']['bottom_community'];
        let node_bottom_dataset = [];
        for(let key in node_bottom){
            node_bottom_dataset.push(node_bottom[key]['community_node_num']);
        }

        let links_dataset = []
        for(let key in datas['links']){
            links_dataset.push(datas['links'][key])
        }

        let last_width = 0;
        rect_top = []
        for(let i in node_top_dataset){
            rect_top.push({'x': last_width, 'width': node_top_dataset[i]/scaleX})
            last_width += (node_top_dataset[i]/scaleX + padding_width);
        }

        sankey_width_will_be = last_width;

        last_width = 0;
        let rect_bottom = []
        for(let i in node_bottom_dataset){
            rect_bottom.push({'x':last_width, 'width': node_bottom_dataset[i]/scaleX})
            last_width += (node_bottom_dataset[i]/scaleX + padding_width);
            // last_width *= sankey_scaleX;
        }

        var svg = d3.select('#Down_1_1')
                .append('svg')
                .attr('id', 'sankey_svg')
                .attr('width', Sankey_width)
                .attr('height', Sankey_height)
                .attr('transform', 'translate(' + margin.top  + ',' + margin.left + ')')            

        var top_nodes = svg.selectAll('sankey_top_node')
                        .data(node_top_dataset)
                        .enter()
                        .append('rect')
                        .attr('class', 'sankey_top_node')
                        .attr('id',function(d, i){
                            return 'sankey_community_top_' + String(i);
                        })
                        .attr('x', function(d, i){
                            return rect_top[i]['x'];
                        })
                        .attr('y', top_y)
                        .attr('width',  function(d){return d/scaleX})
                        .attr('height', padding_height)
                        .attr('fill', 'steelblue')
                        .on("click",community_click_do);
                        

        var bottom_nodes = svg.selectAll('sankey_bottom_node')
                            .data(node_bottom_dataset)
                            .enter()
                            .append('rect')
                            .attr('class', 'sankey_bottom_node')
                            .attr('id',function(d, i){
                                return 'sankey_community_bottom_' + i;
                            })
                            .attr('x', function(d, i){
                                return rect_bottom[i]['x'];
                            })
                            .attr('y', bottom_y)
                            .attr('width',  function(d){return d/scaleX})
                            .attr('height', padding_height)
                            .attr('fill', 'steelblue')
                            .on("click",community_click_do);


        var links = svg.selectAll('sankey_link')
                        .data(links_dataset)
                        .enter()
                        .append('path')
                        .attr('class', 'sankey_community_path')
                        .attr('id', function(d,i){
                            return 'sankey_community_path_' + i;
                        })
                        .attr('d', straightLine)
                        .style('fill', 'steelblue')
                        .style('opacity', 0.5)
                        .on("click",community_click_do);
        


        function straightLine(d,i) {
            let dy = (bottom_y - top_y)/2;
            let x1 = rect_top[parseInt(d['source'])]['x'];
            let y1 = top_y + padding_height;
            let x2 = rect_bottom[parseInt(d['target'])]['x'];
            let y2 = bottom_y;
            var rect_width = rect_top[i]['width'];
            return 'M' + x1 + ',' + y1 +
                    'C' + x1 + ',' + dy + ',' + x2 + ',' + dy + ',' + x2 + ',' + y2 +
                    'h' + rect_width +
                    'C' + (x2 + rect_width) + ',' + dy + ',' + (x1 + rect_width) + ',' + dy + ',' + (x1 + rect_width) + ',' + y1
        }
    })

}


//===============================================================================
function draw_sankey_again(){

    d3.selectAll('.sankey_bottom_node').remove();
    d3.selectAll('.sankey_community_path').remove();
    d3.selectAll('.sankey_top_node_sample').remove();
    d3.selectAll('.sankey_bottom_sample').remove();
    // d3.selectAll('.sankey_top_node').style('opacity', 0.5);
    d3.selectAll('.sankey_top_node').remove();
    // sankey_file_name = '/data/oregonf/all_oregonf_rate_community_num_for_sankey/oregonf_sample_tsne_FF_5_community_num_for_sankey.json'
    d3.json(sankey_file_name, function(sankey_data){
        d3.json(sankey_color_file_name, function(sankey_color){
            
            for(let i in sankey_color){
                if(sankey_color[i]/2 < 0.1) rect_top[i]['color'] = colorArr[0];
                else if(sankey_color[i]/2 < 0.2) rect_top[i]['color'] = colorArr[1];
                else if(sankey_color[i]/2 < 0.3) rect_top[i]['color'] = colorArr[2];
                else if(sankey_color[i]/2 < 0.4) rect_top[i]['color'] = colorArr[3];
                else if(sankey_color[i]/2 < 0.5) rect_top[i]['color'] = colorArr[4];
                else if(sankey_color[i]/2 < 0.6) rect_top[i]['color'] = colorArr[5];
                else if(sankey_color[i]/2 < 0.7) rect_top[i]['color'] = colorArr[6];
                else if(sankey_color[i]/2 < 0.8) rect_top[i]['color'] = colorArr[7];
                else if(sankey_color[i]/2 < 0.9) rect_top[i]['color'] = colorArr[8];
                else rect_top[i]['color'] = colorArr[9];
            }

            var svg = d3.select('#sankey_svg');
            let last_width = 0;
            let dataset = [];
            let communitty_bottom = [];
            let count = 0;
            
            //===========data_for_community==============
            let community_data = {};

            console.log(sankey_data)
            for(let key in sankey_data){
                dataset.push(key);
                count ++;
                communitty_bottom.push({'x': last_width, 'width': sankey_data[key]['num']/scaleX})
                last_width += sankey_data[key]['num']/scaleX + padding_width;
            }

            document.getElementById('sample_community_num').innerText = parseInt(count);
            //储存rect_bottom的初始位置
            var community_in_rect_bottom = [];
            for(let i in communitty_bottom){
                community_in_rect_bottom.push(communitty_bottom[i]['x']);
            }
            var sample_rect_bottom = [];
            
            //===============================================================================
            //储存rect_top的初始位置
            var community_in_rect_top = [];
            for(let i in rect_top){
                community_in_rect_top.push(rect_top[i]['x']);
            }
            var sample_rect_top = [];
    
            //储存link的位置和id
            var sample_link = [];

            for(let key in sankey_data){
                
                var community_num_belong = sankey_data[key];
                var community_belong = community_num_belong['community_belong'];
                for(var i in community_belong){
                    
                    let color_sample = rect_top[i]['color'];
                    //=============top================
                    let belong = community_belong[i]["%"];
                    var x1 = community_in_rect_top[i];
                    var belong_width = rect_top[parseInt(i)]['width'] * belong
                    community_in_rect_top[i] = x1 + belong_width;
                    var x2 = community_in_rect_top[i];
                    sample_rect_top.push({'x': x1, 'width': belong_width, 'class':'sankey_top_node sankey_top_node_sample sankey_community_top_' + String(i), 'color': color_sample});
                    
    
                    //============bottom================
                    var x3 = community_in_rect_bottom[key];
                    community_in_rect_bottom[key] = x3 + belong_width;
                    var x4 = community_in_rect_bottom[key];
                    sample_rect_bottom.push({'x': x3, 'width': belong_width, 'class':'sankey_bottom_node sankey_bottom_sample sankey_community_bottom_' + String(i), 'color': color_sample})
                    
                    
                    //=============path==============
                    sample_link.push({'x1': x1, 'x2': x2, 'x3': x3, 'x4': x4, 'class': 'sankey_community_path sankey_community_path_' + String(i) + ' sankey_sample_path_' + String(key), 'color': color_sample})
                    
                }
            }
            
            //================top======================
            svg.selectAll('sankey_top_node')
                .data(node_top_dataset)
                .enter()
                .append('rect')
                .attr('class', 'sankey_top_node')
                .attr('id',function(d, i){
                    return 'sankey_community_top_' + String(i);
                })
                .attr('x', function(d, i){
                    return rect_top[i]['x'];
                })
                .attr('y', top_y)
                .attr('width',  function(d){return d/scaleX})
                .attr('height', padding_height)
                .attr('fill', function(d, i){
                    return rect_top[i]['color'];
                })
                .on("click",community_click_do)
                .style('opacity', 0.5);


            svg.selectAll('sankey_top_node')
                .data(sample_rect_top)
                .enter()
                .append('rect')
                .attr('class', d => (d['class']))
                .attr('x', d => (d['x']))
                .attr('y', top_y)
                .attr('width', d => (d['width']))
                .attr('height', padding_height)
                //===========color===============
                .attr('fill', d => (d['color']))
                // .style('opacity', 0.5)
                // .attr('click', community_click_do)
    
            //===============bottom=====================
    
    
            svg.selectAll('sankey_top_node')
                .data(sample_rect_bottom)
                .enter()
                .append('rect')
                .attr('class', d => (d['class']))
                .attr('x', d => (d['x']))
                .attr('y', bottom_y)
                .attr('width', d => (d['width']))
                .attr('height', padding_height)
                //=======color===============
                .attr('fill', d => (d['color']))
                // .style('opacity', 0.5)
                // .attr('click', community_click_do)
    
            //==============path==========================
            
            svg.selectAll('sankey_link')
                .data(sample_link)
                .enter()
                .append('path')
                .attr('class', d => (d['class']))
                .attr('d', d => (straightLine(d['x1'], d['x2'], d['x3'], d['x4'])))
                //==============color==============
                .style('fill', d => (d['color']))
                // .attr('fill', '#d323d3')
                .style('opacity', 0.7)
            // .attr('click', community_click_do)
            
            
            function straightLine(x1,x2,x3,x4) {
                let dy = (bottom_y - top_y)/2;
                let y1 = top_y + padding_height;
                let y2 = bottom_y;
                return 'M' + x1 + ',' + y1 +
                        'C' + x1 + ',' + dy + ',' + x3 + ',' + dy + ',' + x3 + ',' + y2 +
                        'h' + (x2-x1) +
                        'C' + x4 + ',' + dy + ',' + x2 + ',' + dy + ',' + x2 + ',' + y1
            }
    
        })

        })
}

draw_sankey();