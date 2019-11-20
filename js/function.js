function sankey_change_color(i){
    d3.selectAll('.sankey_top_node').style('opacity', 0.3)
    d3.select('#sankey_community_top_' + i).style('opacity', 1)
    d3.selectAll('.sankey_bottom_node').style('opacity', 0.3)
    d3.select('#sankey_community_bottom_' + i).style('opacity', 1)
    d3.selectAll('.sankey_community_path').style('opacity', 0)
    d3.select('#sankey_community_path_' + i).style('opacity', 0.5)
}

function if_button_move_click(flag){
    if_move = flag;
}
function if_button_point_click(flag){
    if_choose_point = flag;
}
function if_button_circle_choose(flag){
    if_circle_choose = flag;
}


function force_change_color(i){
    // d3.selectAll('.tsne_node').attr('fill', tsne_unselected_color);
    d3.json("/data/community_id.json", function(data_community)
    {
        d3.json("/data/force_data_gai.json", function(datas){
                var circles_change_color = 0xff00ff;
                choosed_point_data = data_community[i];
                // console.log(choosed_point_data)
                circles_choose.clear();
                circles_choose_change_color.clear();
                for(let node in  choosed_point_data)
                {
                    const now_x = (datas[choosed_point_data[node]].x);
                    const now_y = (datas[choosed_point_data[node]].y);
                    d3.select("#tsne_node_"+choosed_point_data[node]).style("fill",circles_change_color);
                    circles_choose_change_color.beginFill(circles_change_color);
                    circles_choose_change_color.drawCircle(now_x,now_y,5);
                    circles_choose_change_color.endFill();
                }
                app.stage.addChild(circles_choose_change_color);
                //tsne该颜色
                tsne_chanege_color_by_list(choosed_point_data);
                // d3.select('#tsne_brush').remove()
                d3.select('#tsne_brush').style('opacity', 0)
        })

    })
}


function tsne_choose_force_change_color(circle_list){
    d3.json("/data/force_data_gai.json", function(datas){
        var circles_change_color = 0xff00ff;
        choosed_point_data = circle_list;
        // console.log(choosed_point_data)
        circles_choose.clear();
        circles_choose_change_color.clear();
        for(let node in  choosed_point_data)
        {
            const now_x = (datas[choosed_point_data[node]].x);
            const now_y = (datas[choosed_point_data[node]].y);
            d3.select("#tsne_node_"+choosed_point_data[node]).style("fill",circles_change_color);
            circles_choose_change_color.beginFill(circles_change_color);
            circles_choose_change_color.drawCircle(now_x,now_y,5);
            circles_choose_change_color.endFill();
        }
        app.stage.addChild(circles_choose_change_color);
    })
}


function community_Distribution_change_color(i)
{
    // console.log(i)
    d3.selectAll(".community_Distribution").attr("fill", 'steelblue');
    d3.select('#community_Distribution_' + i).attr("fill", "red");
}


function community_change_color(i){
    d3.selectAll('.community').attr('fill', 'steelblue');
    d3.select('#community_' + i).attr('fill', 'red');
}


function connected_change_color(i){
    d3.selectAll('.connected').attr('fill', 'steelblue');
    d3.select('#connected_' + i).attr('fill', 'red');
}

function tsne_chanege_color_by_list(circle_list){
    d3.selectAll('.tsne_circle').attr('fill', tsne_circle_color);
    for(let key in circle_list){
        d3.select('#tsne_circle_' + circle_list[key]).attr('fill','red');
    }
}

function community_click_do(d,i){
    community_change_color(i);
    sankey_change_color(i);
    force_change_color(i);
    community_Distribution_change_color(i);
    connected_change_color(i);
}

function reflash(){
    d3.selectAll('.community').attr('fill', 'steelblue');
    d3.selectAll(".community_Distribution").attr("fill", 'steelblue');
    d3.selectAll('.sankey_top_node').style('opacity', 1)
    d3.selectAll('.sankey_bottom_node').style('opacity', 1)
    d3.selectAll('.sankey_community_path').style('opacity', 0.5)
    circles_choose.clear();
    circles_choose_change_color.clear();
    d3.selectAll('.tsne_circle').attr('fill', tsne_circle_color);
    d3.select('#tsne_brush').style('opacity', 0)
    d3.selectAll('.connected').attr('fill', 'steelblue');
}
