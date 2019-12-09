const d3 = require('d3')
const fs = require('fs')

const sample_name = ['FF', 'ISRW', 'RNS', 'SRW', 'TIES']
const sample_rate = ['5', '10', '15', '20', '25', '30', '35', '40']

function drawforce(data, filewritepath){
    var nodeArr = data['nodes'];
    var edgeArr = data['edges'];
    
    var nodesID = []
    for(var n in nodeArr){
        nodesID.push({'id': nodeArr[n]['id']});
    }

    var links = [];
    for(var i in edgeArr){
        links.push({
            'source': edgeArr[i]['source'],
            'target': edgeArr[i]['target']
        })
    }

    const force_width = 775;
    const force_height = 509;

    var simulation = d3.forceSimulation(nodesID)
                        .force('link', d3.forceLink(links).id(d => d['id']))
                        .force('charge', d3.forceManyBody())
                        .force('center', d3.forceCenter(force_width/2, force_height/2))
                        .on('tick',function(){})


                        .on('end', ()=>{
                            var x_max = d3.max(nodesID, d => d['x'])
                            var x_min = d3.min(nodesID, d => d['x'])
                            var y_max = d3.max(nodesID, d => d['y'])
                            var y_min = d3.min(nodesID, d => d['y'])

                            var xScale = d3.scaleLinear()
                                            .domain([x_min, x_max])
                                            .range([10, force_width]);
                            var yScale = d3.scaleLinear()
                                            .domain([y_min, y_max])
                                            .range([10, force_height]);
                            
                            for(var i in nodesID){
                                nodesID[i].x = parseInt(xScale(nodesID[i].x));
                                nodesID[i].y = parseInt(yScale(nodesID[i].y));
                            }

                            // console.log(nodesID);
                            var node = [];
                            for(var i in nodesID){
                                node.push({
                                    'id': nodesID[i]['id'],
                                    'x':  nodesID[i]['x'],
                                    'y':  nodesID[i]['y'] 
                                })
                            }

                            var ans_data = {'nodes':node, 'edges': edgeArr};
                            console.log(ans_data)

                            fs.writeFile(filewritepath, JSON.stringify(ans_data), function(err){
                                if(err){console.log("写入失败！！！");}
                                else{console.log("写入成功！！！");}
                            })
                        })

}

function getdata(){
    for(let name in sample_name){
        // name = 1
        for(let rate in sample_rate){
            const filepath = '../data/oregonf/all_oregonf_rate/oregonf_sample_tsne_' + sample_name[name] + '_' + sample_rate[rate] + '_nodes_edges.json'
            const filewritepath = '../data/oregonf/all_oregonf_rate_force_data/oregonf_force_data' + sample_name[name] + '_' + sample_rate[rate] + '_nodes_edges.json'
            fs.readFile(filepath,function(e,data){
                data = JSON.parse(data);
                // console.log(data);
                console.log(filepath)

                drawforce(data, filewritepath);
            })
            // break
        }
        // break
    }
}

getdata();



