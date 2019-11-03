var radius = 150;

//边数
var total = 8;
var level = 4;
var rangeMin = 0;
var rangeMax = 100;
//角度   onePiece = mAngle
var arc = 2 * Math.PI;
var onePiece = arc / total;
var polygons = {
   webs:[],
   webPoints:[]
};
var width = 410, height = 350;
var splrateconst;
var dataconst = 1000 ;
   var data_5 = {
      fielaNames:['RE','RJ','RN','ISRW','RW','DFS','BFS','TIES'],
      values:[
         [0.07804998794735474 * dataconst,
            0.051315719402242485 * dataconst,
            0.06193911614193387 * dataconst,
            0.07815066412970847 * dataconst,
            0.07008171305227431 * dataconst,
            0.09218388335478131 * dataconst,
            0.07170914139826061 * dataconst,
            0.08650432224791785 * dataconst]
      ]
   };

var main = d3.select('#Right_2').select('svg').append('g')
   .classed('RadarChart', true)
   .attr('transform', "translate(" + width/2 + ',' + height/2 + ')');
for(var k = level ; k > 0 ; k--){
var webs = '';
var webPoints = [];
var r = radius / level * k;
for(var i = 0 ; i < total ; i++){
var x = r * Math.sin(i * onePiece);
var y = r * Math.cos(i * onePiece);
webs += x + ',' + y + ' ';
webPoints.push({
x:x,
y:y,
});
}
polygons.webs.push(webs);
polygons.webPoints.push(webPoints);
}

{//绘制网轴
var webs = main.append('g')
      .classed('webs',true);

webs.selectAll('polygon')
.data(polygons.webs)
.enter()
.append('polygon')
.attr('points',function(d){
return d;
});
}

{//添加纵轴
var lines = main.append('g')
      .classed('lines',true);

lines.selectAll('line')
.data(polygons.webPoints[0])
.enter()
.append('line')
.attr('x1',0)
.attr('y1',0)
.attr('x2',function(d){
return d.x;
})
.attr('y2',function(d){
return d.y;
})
.attr('stroke','gray')
.attr('stroke-dasharray','10 5');
}


{//文本数据(采样算法名称)
   var textPoints = [];
   var textRadius = radius ;
   for(var i = 0 ; i < total ; i++) {
      var x = textRadius * Math.sin(i * onePiece);
      var y = textRadius * Math.cos(i * onePiece);
      textPoints.push({
         x: x,
         y: y
      });
   }
   
   var texts = main.append('g')
                     .classed('texts',true);

   texts.selectAll('text')
         .data(textPoints)
         .enter()
         .append('text')
         .attr('x',function(d,i){
            if(
               //右上(2)
               //左下
               (onePiece * i > Math.PI * 3 / 2 && onePiece * i <= Math.PI * 2)
               ||
            //左上(2)
               (onePiece * i >= Math.PI && onePiece * i <= Math.PI * 3 / 2)
               ){
               return d.x - 35;
            }
            else{
               return d.x ;
            }
         })
         .attr('y',function(d,i){
            if(
               //右下(3)
               (onePiece * i >= 0 && onePiece * i <= Math.PI / 2)
            //  ||
            // 右上
            //  (onePiece * i > Math.PI / 2 && onePiece * i <= Math.PI)
               ){
                  return d.y + 10;
               }
               else{
               return d.y;
               }
         })
         .text(function(d,i){
            return data_5.fielaNames[i];
         })
         .attr("font-size",'0.6em');
   }
      
function drawradarchart(data){
   var values = data.values;
   for(var i = 0 ; i < values.length ; i++){
      var value = values[i];
      var area = '';
      var points = [];
      for( var k = 0 ; k < total ; k++){
         var r = radius * (value[k] - rangeMin)/(rangeMax - rangeMin);
         var x = r * Math.sin(k * onePiece);
         var y = r * Math.cos(k * onePiece);
         area += x + ',' + y + ' ';
         points.push({
            x:x,
            y:y
         });
      }
      areasData=[];
      areasData.push({
         polygon:area,
         points:points
      });
   }

   var areas = main.append('g')
                     .attr("id","areas");
         
   areas.selectAll('g')
         .data(areasData)
         .enter()
         .append('g')
         .attr('class',function(d,i){
            return 'area'+ (i+1);
         });

   for(var i = 0 ; i < areasData.length ; i++){//每次循环每个雷达图区域
      
      {//各个数据(点)的连线
      var area = areas.select('.area'+ (i+1));
      
      var areaData = areasData[i];
      area.append('polygon')
            .attr('points',areaData.polygon)
            .attr('stroke',function(d,index){
               return getColor(i);
            })
            .attr('fill',function(d,i){
               return getColor(i);
            });
      }      

      {//各个点的表示
      var circles = area.append('g')
                        .classed('circles',true);

      circles.selectAll('circle')
               .data(areaData.points)
               .enter()
               .append('circle')
               .attr('cx',function(d){
                  return d.x;
               })
               .attr('cy',function(d){
                  return d.y;
               })
               .attr('r',3)
               .attr('stroke',function(d,index){
                  return getColor(i);
               });
      }
   }
}
      
drawradarchart(data_5);

function getColor(idx) {
   var palette = [
      '#5ab1ef', 
   ]
   return palette[idx % palette.length];
}