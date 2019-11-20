var if_move = true;
var if_choose_point = false;
var if_circle_choose = false;
var force_community_num = 0;

const force_width = 775;
const force_height = 509;

var app = new PIXI.Application({
    width:force_width,
    height:force_height,
    antialias: true,
    resolution : 1,
});

document.querySelector('#Centre_2').appendChild(app.view);
app.renderer.backgroundColor = 0xffffff;


function drawforce(data){
    let scaleAll_xy = 1;//整体缩放
    let moveAll_x = 0;//整体x移动
    let moveAll_y = 0;//整体y移动
    
    const circles_change_color = 0xff00ff;
    
    // let f_nodes = [];
    // let f_links = [];
    
    let f_nodes = [];
    let f_links = [];
    
    var force_community_circle_Color = 0x3A435E;
    var line_Color = 0xc6c6c6;
    var circle_Choose_Color = 0x3A435E;


    d3.json("/data/force_data_gai.json", function(datas){
        for(let key in datas){
            let node = {};
            node["id"] = key;
            node["x"] = datas[key]["x"];
            node["y"] = datas[key]["y"];
            f_nodes.push(node);
        }

        d3.csv("/data/oregonf.csv",function(error,csvdata){

            for(let i=0;i<csvdata.length;i++){
                let data = {};
                let a1 = csvdata[i].source;
                let a2 = csvdata[i].target;
                data["source"] = a1;
                data["target"] = a2;
                f_links.push(data);
            }




            const lines = new PIXI.Graphics();
            for(var i = 0 ; i < f_links.length ; i++){
                lines.lineStyle(0.4,line_Color,1);
                lines.moveTo(datas[f_links[i].source].x,datas[f_links[i].source].y);
                lines.lineTo(datas[f_links[i].target].x,datas[f_links[i].target].y);
            }
            app.stage.addChild(lines);
            const circles = new PIXI.Graphics();
            for(var key in datas){
                circles.beginFill(force_community_circle_Color);
                circles.drawCircle(datas[key].x,datas[key].y,5);
                circles.endFill();
            }
        
            app.stage.addChild(circles);

            mouse_down_position = {};
            document.getElementsByTagName("canvas")[0].id = "force_canvas";
            const canvas = document.getElementsByTagName("canvas");
            const canvas_force = canvas[0];


            canvas_force.addEventListener('mousedown', onDragStart, false);
            canvas_force.addEventListener('mouseup', onDragEnd, false);
            canvas_force.addEventListener('mousemove', onDragMove, false);
            canvas_force.addEventListener('mouseout', onDragEnd,false);        

            canvas_force.addEventListener('DOMMouseScroll', wheel, false); 


            canvas_force.onmousewheel = wheel; //W3C鼠标滚轮事件

            circles_choose = new PIXI.Graphics();
            circles_choose_change_color = new PIXI.Graphics();
            function onDragStart() 
            {
                if(if_move == true){
                    this.dragging = true;
                }
                else {
                    this.dragging = false;
                }
                if(if_circle_choose)this.drawingCircle = true;
                else this.drawingCircle = false;

                if(if_choose_point)this.drawingPoint = true;
                else this.drawingPoint = false;
                mouse_down_position = getMousePos(this);
            }

            function onDragEnd() 
            {
                if(this.dragging)this.dragging = false;
                
                else if(this.drawingCircle)
                {
                    reflash();
                    this.drawingCircle = false;
                    const newPosition = getMousePos(this);
                    const circle_x = mouse_down_position.x;
                    const circle_y = mouse_down_position.y;
                    const circle_r = Math.sqrt(Math.pow(newPosition.x - circle_x, 2) + Math.pow(newPosition.y - circle_y, 2));
                    let choosed_point_data = [];
                    for(let node in f_nodes)
                    {
                        const now_x = f_nodes[node].x * scaleAll_xy + moveAll_x;
                        const now_y = f_nodes[node].y * scaleAll_xy + moveAll_y;
                        if(Math.sqrt(Math.pow(now_x - circle_x, 2) + Math.pow(now_y - circle_y, 2)) <= circle_r)
                        {
                            choosed_point_data.push(f_nodes[node]);
                        }
                    }

                    circles_choose.clear();
                    circles_choose_change_color.clear();
                    console.log(choosed_point_data)
                    var circle_list = []
                    for(let node in  choosed_point_data)
                    {
                        const now_x = (choosed_point_data[node].x);
                        const now_y = (choosed_point_data[node].y);
                        circle_list.push(choosed_point_data[node].id);
                        circles_choose_change_color.beginFill(circles_change_color);
                        circles_choose_change_color.drawCircle(now_x,now_y,5);
                        circles_choose_change_color.endFill();
                    }
                    console.log(circle_list)
                    tsne_chanege_color_by_list(circle_list);
                    app.stage.addChild(circles_choose_change_color);
                }

                else if(this.drawingPoint == true)
                {
                    this.drawingPoint = false;
                    const newPosition = getMousePos(this);
                    const circle_x = newPosition.x;
                    const circle_y = newPosition.y;
                    const circle_r = 5;
                    let choosed_point_data = [];
                    for(let node in f_nodes)
                    {
                        const now_x = f_nodes[node].x * scaleAll_xy + moveAll_x;
                        const now_y = f_nodes[node].y * scaleAll_xy + moveAll_y;
                        if(Math.sqrt(Math.pow(now_x - circle_x, 2) + Math.pow(now_y - circle_y, 2)) <= circle_r)
                        {
                            choosed_point_data.push(f_nodes[node]);
                        }
                    }

                    circles_choose.clear();
                    circles_choose_change_color.clear();
                    for(let node in  choosed_point_data)
                    {
                        const now_x = (choosed_point_data[node].x);
                        const now_y = (choosed_point_data[node].y);
                        circles_choose_change_color.beginFill(circles_change_color);
                        circles_choose_change_color.drawCircle(now_x,now_y,5);
                        circles_choose_change_color.endFill();
                    }
                    app.stage.addChild(circles_choose_change_color);
                }
                this.data = null;
            }
            function onDragMove()
            {
                if (this.dragging == true)
                {
                    const newPosition = getMousePos(this);
                    const move_x = mouse_down_position.x - newPosition.x;
                    const move_y = mouse_down_position.y - newPosition.y;
                    mouse_down_position = newPosition;
                    moveAll_x -= move_x;
                    moveAll_y -= move_y;

                    circles.x = moveAll_x;
                    circles.y = moveAll_y;
                    lines.x = moveAll_x;
                    lines.y = moveAll_y;
                    circles_choose.x = moveAll_x;
                    circles_choose.y = moveAll_y;

                    circles_choose_change_color.x = moveAll_x;
                    circles_choose_change_color.y = moveAll_y;
                }

                if(this.drawingCircle == true)
                {
                    const newPosition = getMousePos(this);
                    const circle_r = Math.sqrt(Math.pow(newPosition.x / scaleAll_xy - mouse_down_position.x / scaleAll_xy, 2) + Math.pow(newPosition.y / scaleAll_xy - mouse_down_position.y / scaleAll_xy, 2));

                    circles_choose.clear();
                    circles_choose.beginFill(circle_Choose_Color);
                    circles_choose.drawCircle((mouse_down_position.x - moveAll_x) / scaleAll_xy, (mouse_down_position.y - moveAll_y) / scaleAll_xy, circle_r);

                    circles_choose.endFill();
                    circles_choose.alpha = 0.5;

                    app.stage.addChild(circles_choose);
                }
            }

            function getMousePos(canvas) { //获取鼠标位置
                const rect = canvas.getBoundingClientRect();
                const x = event.clientX - rect.left * (canvas.width / rect.width);
                const y = event.clientY - rect.top * (canvas.height / rect.height);
                ans = {}
                ans.x = x;
                ans.y = y;
                return ans;
            }

            //统一处理滚轮滚动事件
            function wheel(event){
                let delta = 0;
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
                    scaleAll_xy *= 1.2;
                }else{//向上滚动 
                    scaleAll_xy /= 1.2;
                }
                circles.scale.x = scaleAll_xy;
                circles.scale.y = scaleAll_xy;
                lines.scale.x = scaleAll_xy;
                lines.scale.y = scaleAll_xy;
                circles_choose.scale.x = scaleAll_xy;
                circles_choose.scale.y = scaleAll_xy;
                circles_choose_change_color.scale.x = scaleAll_xy;
                circles_choose_change_color.scale.y = scaleAll_xy;
            }
            

            function change_color(nodes)
            {
                for(let node in  nodes)
                {
                    const now_x = (nodes[node].x - moveAll_x) * scaleAll_xy;
                    const now_y = (nodes[node].y - moveAll_y) * scaleAll_xy;
                    circles_choose_change_color.beginFill(circles_change_color);
                    circles_choose_change_color.drawCircle(now_x,now_y,5*scaleAll_xy*scaleAll_xy);
                    circles_choose_change_color.endFill();
                }
                app.stage.addChild(circles_choose_change_color);
            }
        })
    })
}

drawforce();