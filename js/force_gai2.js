function drawforce(data){
    var nodes = [];
    var links = [];
    var force_width = 775;
    var force_height = 509;
    var circle_Color = 0x3A435E;
    var line_Color = 0xc6c6c6;
    d3.json("/data/force_data_gai.json", function populate(datas){
        for(var key in datas){
            var node = {};
            node["id"] = key;
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
            console.log(nodes);
            const circles = new PIXI.Graphics();
            for(var key in datas){
                circles.beginFill(circle_Color);
                circles.drawCircle(datas[key].x,datas[key].y,5);
                // circles.drawCircle(nodes[i].x,nodes[i].y,1.5);
                circles.endFill();
            }
        
            if (window.addEventListener)//FF,火狐浏览器会识别该方法
                window.addEventListener('DOMMouseScroll', wheel, false);
            window.onmousewheel = document.onmousewheel = wheel; //W3C
            //统一处理滚轮滚动事件
            function wheel(event){
                var delta = 0;
                if (!event) event = window.event;
                if (event.wheelDelta) {//IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
                    delta = event.wheelDelta/120; 
                    if (window.opera) delta = -delta;//因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
                } else if (event.detail) {//FF浏览器使用的是detail,其值为“正负3”
                    delta = -event.detail/3;
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
            

            circles.buttonMode = true;
            circles.interactive = true;
            
            circles
                .on('pointerdown', onDragStart)
                .on('pointerup', onDragEnd)
                .on('pointerupoutside', onDragEnd)
                .on('pointermove', onDragMove);
            


            function onDragStart(event) {

                // var x = event.pageX;
                // var y = event.pageY;
                // var loc = getLocation(x,y);
                // // store a reference to the data
                // the reason for this is because of multitouch
                // we want to track the movement of this particular touch
                this.data = event.data;
                this.dragging = true;
            }

            function onDragEnd() {
                this.dragging = false;
                // set the interaction data to null
                this.data = null;
            }

            function onDragMove() {
                if (this.dragging) {
                    const newPosition = this.data.getLocalPosition(this.parent);
                    this.x = newPosition.x;
                    this.y = newPosition.y;
                    lines.x = newPosition.x;
                    lines.y = newPosition.y;
                }
            }
            

            //获取当前鼠标点击的坐标
            function getLocation(x, y) {
                var bbox = canvas.getBoundingClientRect();
                return {
                    x: (x - bbox.left) * (canvas.width / bbox.width),
                    y: (y - bbox.top) * (canvas.height / bbox.height)
                };
            }

            app.stage.addChild(circles);

            document.getElementsByTagName("canvas")[0].id = "force_canvas";
        });
    })


}


drawforce();

setTimeout(canvas_move(), 10000);
function canvas_move(){
    var canvas = document.getElementsByTagName("canvas");
    
    var canvas1 = $("canvas").get();
    var canvas2 = document.getElementById("#force_canvas");
    console.log(canvas)
    console.log(canvas1)
    console.log(canvas2)
    // canvas_force.addEventListener('mousedown', onDragStart, false);
    // canvas_force.addEventListener('mouseup', onDragEnd, false);
    // canvas_force.addEventListener('mousemove', onDragMove, false);
    // canvas_force.addEventListener('mouseout', onDragEnd,false);
}