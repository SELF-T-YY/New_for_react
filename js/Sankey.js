var Sankey_height = document.getElementById('Down_1').offsetHeight;
var Sankey_width = document.getElementById('Down_1').offsetWidth;
const margin = {top: 10, right: 5, bottom: 10, left: 10};
const padding_width = 2;
const padding_height = 20;
const top_y = 10;
const bottom_y = Sankey_height - 80;
const scaleX = 25;
var community_num_all = 33;

var sankey_file_name = NaN
var sankey_width_will_be = NaN

function draw_sankey(){
    d3.json('/data/sankey_data_gai.json', function(datas){

        let community_num_count = 0;
        let node_top = datas['nodes']['top_community'];
        let node_top_dataset = []
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
        let rect_top = []
        for(let i in node_top_dataset){
            rect_top.push({'x': last_width, 'width': node_top_dataset[i]/scaleX})
            last_width += (node_top_dataset[i]/scaleX + padding_width);
        }

        sankey_width_will_be = last_width;
        // const sankey_scaleX = sankey_width_will_be / Sankey_width;

        // last_width = 0;
        // for(let i in node_top_dataset){
        //     rect_top.push({'x': last_width, 'width': node_top_dataset[i]/20*sankey_scaleX })
        //     last_width += node_top_dataset[i]/20 + padding_width;
        //     last_width *= sankey_scaleX;
        // }

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



function draw_sankey_again(){

    d3.selectAll('.sankey_bottom_node').remove();
    d3.selectAll('.sankey_community_path').remove();
    sankey_file_name = '/data/oregonf/all_oregonf_rate_community_num_for_sankey/oregonf_sample_tsne_FF_5_community_num_for_sankey.json'

    d3.json(sankey_file_name, function(sankey_data){
        // let rect_bottom = [];
        // let dataset = [];
        // let last_width = 0;
        // let community_num_count = 0;
        // for(let key in sankey_data){
        //     community_num_count ++;
        //     dataset.push({'x': last_width, 'width': sankey_data[key]['num']/scaleX})
        //     last_width += sankey_data[key]['num']/scaleX + padding_width;
        // }


        let last_width = 0;
        let dataset = []
        let rect_buttom_change = {}
        let community_num_count = 0;
    
        for(let key in sankey_data){
            community_num_count ++;
            dataset.push(key);
            rect_buttom_change[key] = {'x': last_width, 'width': sankey_data[key]['num']/scaleX}
            last_width += sankey_data[key]['num']/scaleX + padding_width;
        }

        const scaleX_again = (sankey_width_will_be - padding_width * 34) / (last_width - padding_width * (community_num_count));
        // const scaleX_again = sankey_width_will_be / last_width;
        // console.log(scaleX_again)
        const scaleX_width = 34 / community_num_count * padding_width;
        last_width = 0;
        for(let i in rect_buttom_change){
            rect_buttom_change[i] = {'x': last_width, 'width': rect_buttom_change[i]['width'] * scaleX_again}
            last_width += rect_buttom_change[i]['width'] + scaleX_width;
        }


        console.log(dataset)
        console.log(rect_buttom_change)
        var svg = d3.select('#sankey_svg')
        var bottom_nodes = svg.selectAll('sankey_bottom_node')
                            .data(dataset)
                            .enter()
                            .append('rect')
                            .attr('class', 'sankey_bottom_node')
                            .attr('id',function(d){
                                return 'sankey_community_bottom_change' + d;
                            })
                            .attr('x', function(d){
                                return rect_buttom_change[d]['x'];
                            })
                            .attr('y', bottom_y)
                            .attr('width',  function(d){return rect_buttom_change[d]['width']})
                            .attr('height', padding_height)
                            .attr('fill', 'steelblue')
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


draw_sankey();
// draw_sankey_again();