const tsne_width = document.getElementById('Right_1_1').offsetWidth;
const tsne_height = document.getElementById('Right_1_1').offsetHeight;

const tsne_circle_color = '#3A435E';
const tsne_circle_choose_color = '#ff00ff'

function draw_tsne(input_data){
    d3.csv('/data/oregonf_tsne_5000.csv', function(tsne_datas){
        
        let dataset = [];
        for(let key = 0; key < tsne_datas.length; key++){
            let data = {};
            data.x = parseFloat(tsne_datas[key].x);
            data.y = parseFloat(tsne_datas[key].y);
            data.id = parseInt(tsne_datas[key].id);
            dataset.push(data);
        }

        var svg = d3.select('#Right_1_1')
                    .append('svg')
                    .attr('width', tsne_width)
                    .attr('height', tsne_height)
                    

        var x_max = d3.max(dataset,function(d){
            return d.x;
        })
        var x_min = d3.min(dataset,function(d){
            return d.x;
        })
        var y_max = d3.max(dataset,function(d){
            return d.y;
        })
        var y_min = d3.min(dataset,function(d){
            return d.y;
        })


        var xScale = d3.scaleLinear()
                        .domain([x_min,x_max])
                        .range([10,tsne_width]);
        var yScale = d3.scaleLinear()
                        .domain([y_min,y_max])
                        .range([10,tsne_height]);

        for(var i = 0 ; i < dataset.length; i++){
            dataset[i].x = parseInt(xScale(dataset[i].x));
            dataset[i].y = parseInt(yScale(dataset[i].y));
        }


        svg.append('g')
            .selectAll('.tsne_circle')
            .data(dataset)
            .enter()
            .append('circle')
            .attr('r', 1)
            .attr('fill', tsne_circle_color)
            .attr('cx', function(d){ return d['x']; })
            .attr('cy', function(d){ return d['y']; })
            .attr('class', 'tsne_circle')
            .attr('id', function(d,i){ return 'tsne_circle_' + d['id']; })
            

        var brush = d3.brush();
        svg.append('g')
            .attr('class', 'brush')
            .call(brush.on('start brush', brushed).on('end', brushend()));
        brushed();

        function brushed(){}
        function brushend(){
            d3.selectAll("circle").style("fill",tsne_unselected_color);
            var event = d3.event.selection;
            var x1=event[0][0], y1=event[0][1], x2=event[1][0], y2=event[1][1];
            var x_max=d3.max([x1,x2]), y_max=d3.max([y1,y2]), x_min=d3.min([x1,x2]), y_min=d3.min([y1,y2]);
            var selectpoints=[];
            for(var i=0;i<tsneData.length;i++){
                var x=parseFloat($("#tsne_node_"+tsneData[i].id)[0].attributes.cx.value);
                var y=parseFloat($("#tsne_node_"+tsneData[i].id)[0].attributes.cy.value);
                if(x>=x_min&&x<=x_max&&y>=y_min&&y<=y_max){
                    selectpoints.push(tsneData[i].id);
                    d3.select("#tsne_node_"+tsneData[i].id).style("fill",tsne_selected_color);
                }
            }
            // d3.selectAll('.tsne_circle').style('fill', tsne_circle_color);
            // var event = d3.event;
            
            // var x1 = event[0][0];
            // var y1 = event[0][1];
            // var x2 = event[1][0];
            // var y2 = event[1][1];
            // var x_max = d3.max([x1,x2]);
            // var y_max = d3.max([y1,y2]);
            // var x_min = d3.min([x1,x2]);
            // var y_min = d3.min([y1,y2]);
            // var circle_choosed = [];
            // for(var key in dataset){
            //     var x = parseFloat(d3.select('#tsne_circle_' + dataset[key]['id']).attributes.cx.value);
            //     var y = parseFloat(d3.select('#tsne_circle_' + dataset[key]['id']).attributes.cy.value);
            //     if(x >= x_min && x <= x_max && y >= y_min && y <= y_max){
            //         circle_choosed.push(dataset[key]['id']);
            //         d3.select('#tsne_circle_' + dataset[key]['id']).attr('fill', tsne_circle_choose_color);
            //     }

            // }
        }
        

    })
}

draw_tsne();

function tsne_chanege_color(){

}