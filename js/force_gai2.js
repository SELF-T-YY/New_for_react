var if_move = true;
var if_choose_point = false;
var if_circle_choose = false;

function drawforce(data){

    d3.csv("/data/oregonf_community.csv", function(data_community)
    {
        var node_community = [];
        var node_json = {}
        for(var node in data_community)
        {
            if(data_community[node][1] in node_json)
                node_json[data_community[node][1]].push(data_community[node][0]);
            else
                node_json[data_community[node][1]] = [data_community[node][0]]
        }
        console.log(node_json)


        var nodes = [];
        var links = [];

        var force_width = 775;
        var force_height = 509;
        var circle_Color = 0x3A435E;
        var line_Color = 0xc6c6c6;
        var circle_Choose_Color = 0x3A435E;

        d3.json("/data/force_data_gai.json", function populate(datas){
            for(var key in datas){
                var node = {};
                node["id"] = "force_" + String(key);
                node["x"] = datas[key]["x"];
                node["y"] = datas[key]["y"];
                nodes.push(node);
            }
            console.log(nodes);

            d3.csv("/data/oregonf.csv",function(error,csvdata){

                for(var i=0;i<csvdata.length;i++){
                    var data = {};
                    var a1 = csvdata[i].source;
                    var a2 = csvdata[i].target;
                    data["source"] = a1;
                    data["target"] = a2;
                    links.push(data);
                }
                let app = new PIXI.Application({
                    width:force_width,
                    height:force_height,
                    antialias: true,
                    resolution : 1,
                });

                console.log(nodes);

                document.querySelector('#Centre_2').appendChild(app.view);
                app.renderer.backgroundColor = 0xffffff;
                const lines = new PIXI.Graphics();
                for(var i = 0 ; i < links.length ; i++){
                    lines.lineStyle(0.4,line_Color,1);
                    lines.moveTo(datas[links[i].source].x,datas[links[i].source].y);
                    lines.lineTo(datas[links[i].target].x,datas[links[i].target].y);
                }
                app.stage.addChild(lines);
                const circles = new PIXI.Graphics();
                for(var key in datas){
                    circles.beginFill(circle_Color);
                    circles.drawCircle(datas[key].x,datas[key].y,5);
                    circles.endFill();
                }
            
                app.stage.addChild(circles);

                mouse_down_position = {}
                document.getElementsByTagName("canvas")[0].id = "force_canvas";
                var canvas = document.getElementsByTagName("canvas");
                var canvas_force = canvas[0];


                canvas_force.addEventListener('mousedown', onDragStart, false);

                canvas_force.addEventListener('mouseup', onDragEnd, false);
                canvas_force.addEventListener('mousemove', onDragMove, false);
                canvas_force.addEventListener('mouseout', onDragEnd,false);
                canvas_force.addEventListener('DOMMouseScroll', wheel, false); 


                canvas_force.onmousewheel = wheel; //W3C鼠标滚轮事件

                const circles_choose = new PIXI.Graphics();
                if_draw_circle = false;

                function onDragStart(event) 
                {
                    if_draw_circle = true;
                    canvas_force.addEventListener('mouseup', circleEnd, false);
                    canvas_force.addEventListener('mousemove', circleMove, false);
                    canvas_force.addEventListener('mouseout', circleEnd,false); 
                    circles_choose.beginFill(circle_Choose_Color);
                    circles_choose.drawCircle(mouse_down_position.x, mouse_down_position.y, 100);
                    circles_choose.endFill();
                    app.stage.addChild(circles_choose);
                    console.log(circles_choose);
                    }
                }

                // function circleEnd()
                // {
                //     if_draw_circle =false;
                //     mouse_down_position = null;
                // }

                // function circleMove()
                // {
                //     if(if_draw_circle)
                //     {
                //         const newPosition = getMousePos(this);
                //         const cricle_long = Math.sqrt(Math.pow(newPosition.x - mouse_down_position.x, 2) + Math.pow(newPosition.y - mouse_down_position.y, 2))                      
                        
                //     }

                // }


                function onDragEnd() {
                    this.dragging = false;
                    // set the interaction data to null
                    this.data = null;
                }
                function onDragMove() {
                    if (this.dragging) {
                        const newPosition = getMousePos(this);
                        const move_x = mouse_down_position.x - newPosition.x;
                        const move_y = mouse_down_position.y - newPosition.y;
                        mouse_down_position = newPosition;
                        circles.x = circles.x - move_x;
                        circles.y = circles.y - move_y;
                        lines.x = lines.x - move_x;
                        lines.y = lines.y - move_y;
                    }
                }

                function getMousePos(canvas) { //获取鼠标位置
                    var rect = canvas.getBoundingClientRect();
                    var x = event.clientX - rect.left * (canvas.width / rect.width);
                    var y = event.clientY - rect.top * (canvas.height / rect.height);
                    ans = {}
                    ans.x = x;
                    ans.y = y;
                    return ans;
                }
  
                //统一处理滚轮滚动事件
                function wheel(event){
                    var delta = 0;
                    if (!event) event = window.event;
                    if (event.wheelDelta) {//IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
                        delta = event.wheelDelta/120; 
                        if (window.opera) delta = -delta;//因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
                    }
                    if (delta)
                        handle(delta);       
                }

                //上下滚动时的具体处理函数
                function handle(delta) {
                    if (delta <0){//向下滚动
                        circles.scale.x *= 1.2;
                        circles.scale.y *= 1.2;
                        lines.scale.x *= 1.2;
                        lines.scale.y *= 1.2;
                    }else{//向上滚动 
                        circles.scale.x /= 1.2;
                        circles.scale.y /= 1.2;
                        lines.scale.x /= 1.2;
                        lines.scale.y /= 1.2;
                    }
                }
            })
        })
    })
}

drawforce();

function if_button_move_click(flag)
{
    if_move = flag;
}
function if_button_point_click(flag)
{
    if_choose_point = flag;
}
function if_button_circle_choose(flag)
{
    if_circle_choose = flag;
}
