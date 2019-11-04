const sankey_width = 400;
const sankey_height = 400;
const sankey_color = 0x3A435E;

d3.json("/data/community_num.json", function(community_num_data)
{
    sankey_svg = d3.select('body')
                    .append('svg')
                    .attr('width', sankey_width)
                    .attr('height', sankey_height)

    const node_jiange = 3
    let last_node = {'x': 0,'y':0};

    for(let key in community_num_data)
    {
        console.log(community_num_data[key]);
    }

})

