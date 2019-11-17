const tsne_width = document.getElementById('Right_1_1').offsetWidth;
const tsne_height = document.getElementById('Right_1_1').offsetHeight;

const tsne_circle_color = 'steelblue';


function draw_tsne(input_data){
    d3.json('/data/oregonf_tsne_5000.csv', function(tsne_datas){
        let dataset = [];
        for(let key in tsne_datas){
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
            

        

    })
}

draw_tsne();