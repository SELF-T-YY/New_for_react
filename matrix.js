var c2Num = 0;
var cNum = 0;
var comData = {};
var a = d3.rgb(214, 214, 211);
var b = d3.rgb(53, 152, 219);
var colorArr=[
    "#a50026",
    "#d73027",
    "#f46d43",
    "#fdae61",
    "#fee090",
    "#ffffbf",
    "#e0f3f8",
    "#abd9e9",
    "#74add1",
    "#4575b4"]
// var a = d3.rgb(0, 191, 255);
// var b = d3.rgb(255, 0, 0);
var dic_color_ori={};
var dic_color_sam={};
function drawdef(){
    var defsvg=d3.select("#defBox").append("svg").attr("width","100%").attr("height","100%")
    // 渐变条
    // var a = d3.rgb(0, 191, 255);
    // var b = d3.rgb(255, 0, 0);
    
    
    
    var defheight=15;
    var width=$("#defBox").width();
    var height=$("#defBox").height();
    var defwidth=width/10;

    defsvg.append("g").selectAll("rect").data(colorArr).enter()
        .append("rect")
        .attr("x",function(d,i){
            return i*defwidth;
        })
        .attr("y",3)
        .attr("width",defwidth-1)
        .attr("height",defheight)
        .attr("fill",function(d){
            return d;
        })
        

    // var defs = defsvg.append("defs");

    // var linearGradient = defs.append("linearGradient")
    //     .attr("id", "linearColor")
    //     .attr("x1", "0%")
    //     .attr("y1", "0%")
    //     .attr("x2", "100%")
    //     .attr("y2", "0%");

    // var stop1 = linearGradient.append("stop")
    //     .attr("offset", "0%")
    //     .style("stop-color", a.toString());

    // var stop2 = linearGradient.append("stop")
    //     .attr("offset", "100%")
    //     .style("stop-color", b.toString());
    // var colorRect = defsvg.append("rect")
    //     .attr("x",0)
    //     .attr("y", 0)
    //     .attr("width", defwidth)
    //     .attr("height", defheight)
    //     .style("fill", "url(#" + linearGradient.attr("id") + ")")
    //     .attr(
    //         "transform",
    //         "translate(" + (width-defwidth-20) + "," + (height-rightMbBoxHeight-defheight-8.5) + ")"
    //     )

}
drawdef();

function drawMatrix(fileName, rate, type) {
    MBSvg.selectAll("rect").remove();
    MBSvg.selectAll("text").remove();
    MBSvg.selectAll("path").remove();
    rectSvg.selectAll("g").remove();
    dic_color_ori={};
    var padding = {
        top: 0,
        bottom: 20,
        right: 0,
        left: 0
    }
    var margin = {
        top: 20,
        bottom: 20,
        right: 20,
        left: 30
    };
    var a = d3.rgb(195, 226, 255);
    var b = d3.rgb(8, 48, 107);
    var color = d3.interpolate(a, b); //颜色插值函数
    var width = rightMbBoxWidth - padding.left - padding.right;
    var height = rightMbBoxHeight - padding.top - padding.bottom;

    d3.json("../data/" + fileName + "/" + fileName + "_pro.json", function (proData) {
    d3.json("../data/" + fileName + "/" + fileName + "_ie.json", function (ieData) {

        var oriData = proData["OUR"]["rate-100"]["all"];
        var dic_ori = [];
        cNum = 0; //原始社区数量
        c2Num = 0; //采样后社区数量
        for (var i in oriData) {
            cNum++;
            dic_ori.push({
                name: i,
                num: oriData[i],
                sam: 0,
            });

        }
        var dic_all = {};
        for (var j in proData) {
            var tempdic = [];
            for (var i in oriData) {
                tempdic.push({
                    name: i,
                    num: oriData[i],
                    sam: 0,
                })
            }
            dic_all[j] = tempdic;
        }
        var tempAll = [];
        if (rate != 100) {
            for (var j in dic_all) {
                var tempSamData = proData[j]["rate-" + rate]["all"];
                for (var i in tempSamData) {
                    var tempStackData = proData[j]["rate-" + rate]["stack"][i];
                    for (var k = 0; k < dic_all[j].length; k++) {
                        if (tempStackData[k] != undefined) {
                            var thisdata = tempStackData[dic_all[j][k]["name"]] / dic_all[j][k]["num"]
                            // console.log(thisdata)
                            tempAll.push(thisdata);
                        } else {
                            tempAll.push(0);
                        }
                    }

                }
            }
        }
        // console.log(tempAll)
        // console.log(dic_ori)
        // console.log(dic_ori[0])
        var samData = proData[type]["rate-" + rate]["all"];
        comData = {};
        var All = [];
        for (var i in samData) {
            var tempData = proData[type]["rate-" + rate]["stack"][i];
            // console.log(tempData)
            var temp = {};
            //求浓度
            for (var j = 0; j < dic_ori.length; j++) {
                if (tempData[j] != undefined) {
                    var thisdata = tempData[dic_ori[j]["name"]];
                    temp[dic_ori[j]["name"]] = thisdata;
                    All.push(thisdata);
                    dic_ori[j].sam += tempData[dic_ori[j]["name"]];
                } else {
                    temp[dic_ori[j]["name"]] = 0;
                    All.push(0);
                    dic_ori[j].sam += 0;
                }
            }
            comData[i] = temp;
            c2Num++;
        } //comData={"采样后社区":{"采样前社区1":，浓度,"采样前社区2":，浓度,}}
        console.log(comData)

        var riverData = [];
        for (var i in comData) {
            for (var j in comData[i]) {
                if (comData[i][j] != 0) {
                    riverData.push([j, i + "_", comData[i][j]]);
                }
            }
        }
        console.log(riverData)
        var commuori=[];
        var dic_river_ori={};
        var ie=ieData[type]["rate-"+rate];
        var linknum=[];
        for(var i=0;i<riverData.length;i++){
            if(commuori.indexOf(riverData[i][0])<0){
                commuori.push(riverData[i][0]);

                dic_river_ori[riverData[i][0]]=ie[riverData[i][0]];
                linknum.push(dic_river_ori[riverData[i][0]]);
            }
            
        }
       
        // console.log(linknum)
        var link_max=d3.max(linknum);
        var link_min=d3.min(linknum);
        console.log("link_max:",link_max)
        var link_scale;
        if(link_max==link_min){
            link_scale=d3.scaleLinear().domain([link_max,0]).range([0.9,1]);
        }
        else
            link_scale=d3.scaleLinear().domain([link_max,0]).range([0,1]);
        // console.log("link_max:",link_max)
        // console.log("link_min:",link_min)
        console.log(dic_river_ori)
        var dic_river_ori_scale={};
        for(var i in dic_river_ori){
            // console.log(dic_river_ori[i]);
            // console.log(link_scale(dic_river_ori[i]))
            dic_river_ori_scale[i]=link_scale(dic_river_ori[i]);
        }
        console.log(dic_river_ori_scale)

        for(var i in dic_river_ori_scale){
            if(Math.floor(dic_river_ori_scale[i])==1){
                dic_color_ori[i]=colorArr[9];
            }
            else{
                dic_color_ori[i]=colorArr[Math.floor(dic_river_ori_scale[i]*10)];
            }
            
        }
        
        
        // var colorScale = d3.interpolate(a, b); //颜色插值函数
        var bp = viz.biPartite(rightMbBoxHeight, rightMbBoxWidth, d3.schemeCategory10, cNum, colorArr,dic_river_ori_scale)
            .data(riverData)
            .orient("horizontal")
        MBSvg.append("g").call(bp);

        for (var i in comData) {
            for (var j in comData[i]) {
                comData[i][j] = Math.log10(comData[i][j] + 1);
            }
        }
        for (var i = 0; i < dic_ori.length; i++) {
            if (dic_ori[i].sam != 0) {

                dic_ori[i].sam = Math.log10(dic_ori[i].sam);
            }
            if (dic_ori[i].num != 0) {
                dic_ori[i].num = Math.log10(dic_ori[i].num);
            }
        }
        console.log(dic_ori)
        var c_max;
        var c_min;
        if (rate != 100) {
            c_max = d3.max(tempAll);
            c_min = d3.min(tempAll);
        } else {
            c_max = d3.max(All);
            c_min = d3.min(All);
        }
        console.log("c_max:", c_max)

        
        if(rate!=100){
            $("#communitySampleNum").text(c2Num);
        }
        else{
            $("#communitysNum").text(cNum);
        }
        // 文字
        // var maxmin=[c_min,c_max];
        // MBSvg.append('g').selectAll("text").data(maxmin).enter()
        //     .append("text")
        //     .attr("x",(d,i)=>{
        //         if(i==1){
        //             return padding.left/4+10+(width+padding.left-35)*i;
        //         }
        //         else{
        //             return padding.left/4+5+(width+padding.left-35)*i;
        //         }
        //     })
        //     .attr("y",padding.top+height+padding.bottom/3*2+2.5)
        //     .attr("font-size",12)
        //     .text((d)=>{
        //         if(d==0||d==1){
        //             return d;
        //         }
        //         else{
        //             return d.toFixed(2);
        //         }
        //     })
        c_max = Math.log10(c_max + 1);
        c_min = Math.log10(c_min + 1);
        var cScale = d3.scaleLinear().domain([c_min, c_max]).range([0, 1]);
        var rectWidth = width / cNum;
        var rectHeight = height / c2Num;
        var index_row = 0; //行
        // for (var i in comData) {
        //     var index_col = 0; //列
        //     for (j in oriData) {
        //         MBSvg.append("rect").attr("x",padding.right + index_col * rectWidth)
        //             .attr("y", index_row * rectHeight + padding.top)
        //             .attr("height", rectHeight-1)
        //             .attr("width", rectWidth-1)
        //             .attr("fill", () => {
        //                 return color(cScale(comData[i][j]));
        //             })
        //             .attr("stroke-width", 1)
        //             .attr("stroke", "#fff")
        //             .attr("stroke-opacity",0)
        //             .attr("id",()=>{
        //                 return "name"+j+"-"+i;//原始-采样
        //             })
        //         index_col++;
        //     }
        //     index_row++;
        // }


        //选择
        var textGap = {
            left: 2,
            right: 5,
            top: 20,
            bottom: 5,
        }
        // var namearr=["Original(col):","Sampling(row):"];
        // ChooseSvg.append("g").selectAll("text").data(namearr).enter()
        //     .append("text")
        //     .attr("x",textGap.left)
        //     .attr("y",(d,i)=>{
        //         return textGap.top+i*(40);
        //     })
        //     .attr("font-size",14)
        //     .text((d)=>{
        //         return d;
        //     })

        // ChooseSvg.append("text").attr("x",85)
        // .attr("y",textGap.top)
        // .attr("font-size",14)
        // .text(cNum+" communities")

        // ChooseSvg.append("text").attr("x",100)
        // .attr("y",textGap.top+40)
        // .attr("font-size",14)
        // .text(c2Num+" communities")

        //两排矩形
        // var t=0;
        // for(var i in oriData){
        //     ChooseSvg.append("rect").attr("x",t*rectWidth)
        //     .attr("y",textGap.top+5)
        //     .attr("width",rectWidth)
        //     .attr("height",10)
        //     .attr("fill","#C3E2FF")
        //     .attr("stroke-width", 1)
        //     .attr("stroke", "#fff")
        //     .attr("id","ori"+i)
        //     .on("click",function(){
        //         var name=this.id.substring(3);

        //         rectOriClick(name);
        //     })
        //     t++;
        // }
        // var rectWidth_=width/c2Num;
        // var t=0;
        // for(var i in comData){
        //     ChooseSvg.append("rect").attr("x",t*rectWidth_)
        //     .attr("y",textGap.top+50)
        //     .attr("width",rectWidth_)
        //     .attr("height",10)
        //     .attr("fill","#C3E2FF")
        //     .attr("stroke-width", 1)
        //     .attr("stroke", "#fff")
        //     .attr("id","sam"+i)
        //     .on("click",function(){
        //         var name=this.id.substring(3);
        //         rectSamClick(name,ClassicalType,rate);
        //     })
        //     t++;
        // }

        // //连线
        // var line=d3.line()
        //            .x((d)=>{return d[0]})
        //            .y((d)=>{return d[1]})
        //            .curve(d3.curveCardinal)
        // if(rate!=100){
        //     for(var i in comData){
        //         var s_width=parseFloat($("#sam"+i)[0].attributes.width.value);
        //         var sx=parseFloat($("#sam"+i)[0].attributes.x.value)+s_width/2;
        //         var sy=parseFloat($("#sam"+i)[0].attributes.y.value);

        //         // console.log(x)
        //         for(var j in oriData){
        //             if(comData[i][j]!=0){
        //                 var t_width=parseFloat($("#ori"+j)[0].attributes.width.value);
        //                 var t_height=parseFloat($("#ori"+j)[0].attributes.height.value);
        //                 var tx=parseFloat($("#ori"+j)[0].attributes.x.value)+t_width/2;
        //                 var ty=parseFloat($("#ori"+j)[0].attributes.y.value)+t_height;

        //                 var mx1=sx;
        //                 var my1=sy-(sy-ty)*0.35;
        //                 var mx2=tx;
        //                 var my2=sy-(sy-ty)*0.61;
        //                 var point_arr=[[sx,sy],[mx1,my1],[mx2,my2],[tx,ty]];
        //                 ChooseSvg.append("path").attr("d",line(point_arr))
        //                 .attr("fill","none")
        //                 .attr("stroke-width",0.5)
        //                 .attr("stroke",()=>{
        //                     return color(cScale(comData[i][j]))
        //                 })
        //                 .attr("stroke-opacity",.0)
        //                 .attr("id","from"+i+"to"+j)//from采样to原始
        //                 .attr("class","fline");
        //                 ChooseSvg.append("path").attr("d",line(point_arr))
        //                 .attr("fill","none")
        //                 .attr("stroke-width",0.5)
        //                 .attr("stroke","#ccc")
        //                 .attr("stroke-opacity",.5)
        //                 .attr("id","ffrom"+i+"to"+j)
        //                 .attr("class","ffline");
        //             }
        //         }
        //     }
        // }

        




        //柱形图    

        var width_ = rectSvgWidth - margin.left - margin.right;
        var height_ = rectSvgHeight - margin.top - margin.bottom;
        var rectWidth = width_ / cNum;
        dic_ori = dic_ori.sort(function (a, b) {
            return b.num - a.num;
        })
        var oriMax = d3.max(dic_ori, (d) => {
            return d.num;
        })
        var oriMin = d3.min(dic_ori, (d) => {
            return d.num;
        })

        var hScale = d3.scaleLinear().domain([0, Math.floor(oriMax) + 1]).range([0, height_]);


        //坐标轴
        var gap = 3; //坐标轴间隔
        var xScale = d3 //x轴比例尺
            .scaleBand()
            .domain(d3.range(1, dic_ori.length + 1))
            .range([0, width_]);
        var yScale = d3 //y轴比例尺
            .scaleLinear()
            .domain([0, Math.floor(oriMax) + 1])
            .range([height_, 0]);

        var gAxis = rectSvg
            .append("g")
            .attr(
                "transform",
                "translate(" + (margin.left - gap) + "," + (height_ + margin.top) + ")"
            )
            .call(d3.axisBottom(xScale));
        //y轴
        var gYxis = rectSvg
            .append("g")
            .attr(
                "transform",
                "translate(" + (margin.left - gap) + "," + (margin.top) + ")"
            )
            .call(d3.axisLeft(yScale));
        //坐标轴文字
        rectSvg.append("text").attr("x", margin.left / 2)
            .attr("y", margin.top / 2)
            .attr("font-size", 10)
            .attr("font-weight", 700)
            .text("Counts(log")
        rectSvg.append("text").attr("x", margin.left / 2 + 52)
            .attr("y", margin.top / 2 + 2)
            .attr("font-size", 8)
            .attr("font-weight", 700)
            .text("10")
        rectSvg.append("text").attr("x", margin.left / 2 + 62)
            .attr("y", margin.top / 2)
            .attr("font-size", 10)
            .attr("font-weight", 700)
            .text("x)")
        if (cNum >= 20) {
            //图例
            var w = ["filter", "rest"]
            var wwidth = 10;

            rectSvg.append("g").selectAll("rect").data(w).enter()
                .append("rect")
                .attr("x", width_ - margin.left / 2)
                .attr("y", (d, i) => {
                    return margin.top / 2 + i * (wwidth + i * 2);
                })
                .attr("width", wwidth)
                .attr("height", wwidth)
                .attr("fill", "#1C86EE")
                .attr("opacity", (d, i) => {
                    if (i == 0) {
                        return 0.2;
                    } else {
                        return 1;
                    }
                })

            rectSvg.append("g").selectAll("text").data(w).enter()
                .append("text")
                .attr("x", width_ - margin.left / 2 + wwidth * 1.2)
                .attr("y", (d, i) => {
                    return margin.top / 20 * 19 + i * (wwidth + i * 2)
                })
                .attr("font-size", 10)
                .text((d) => {
                    return d;
                })
            //条形
            rectSvg.append("g").selectAll("rect").data(dic_ori).enter()
                .append("rect")
                .attr("x", (d, i) => {
                    return margin.left + i * rectWidth;
                })
                .attr("y", (d) => {
                    return margin.top + height_ - hScale(d.num);
                })
                .attr("width", rectWidth / 4 * 3)
                .attr("height", (d) => {
                    return hScale(d.num);
                })
                .attr("fill", "#1C86EE")
                .attr("opacity", 0.2)
                .attr("stroke-width", 1)
                .attr("stroke", "#ccc")


            rectSvg.append("g").selectAll("rect").data(dic_ori).enter()
                .append("rect")
                .attr("x", (d, i) => {
                    return margin.left + i * rectWidth;
                })
                .attr("y", (d, i) => {
                    return margin.top + height_ - hScale(d.num);
                })
                .attr("width", rectWidth / 4 * 3)
                .attr("height", (d, i) => {
                    return hScale(d.num);
                })
                .attr("fill", "#1C86EE")
                .attr("stroke-width", 1)
                .attr("stroke", "#ccc")
                .attr("class", "rectName")
                .attr("id", (d) => {
                    return "rectName" + d.name;
                })
                .on("click", (d) => {
                    
                        rectOriClick(d.name);
                    
                        // rectSamClick(d.name, ClassicalType, rate);
                    
                })
                .transition()
                .delay(100)
                .duration(500)
                .ease(d3.easeLinear)
                .attr("y", (d) => {
                    return margin.top + height_ - hScale(d.num) * d.sam / d.num;
                })
                .attr("height", (d) => {
                    return hScale(d.num) * d.sam / d.num;
                })
        } else {
            //图例
            var w = ["filter", "rest"]
            var wwidth = 10;

            rectSvg.append("g").selectAll("rect").data(w).enter()
                .append("rect")
                .attr("x", width_ - margin.left / 2)
                .attr("y", (d, i) => {
                    return margin.top / 2 + i * (wwidth + i * 2);
                })
                .attr("width", wwidth)
                .attr("height", wwidth)
                .attr("fill", "#1C86EE")
                .attr("opacity", (d, i) => {
                    if (i == 0) {
                        return 0.2;
                    } else {
                        return 1;
                    }
                })

            rectSvg.append("g").selectAll("text").data(w).enter()
                .append("text")
                .attr("x", width_ - margin.left / 2 + wwidth * 1.2)
                .attr("y", (d, i) => {
                    return margin.top / 20 * 19 + i * (wwidth + i * 2)
                })
                .attr("font-size", 10)
                .text((d) => {
                    return d;
                })
            //条形
            var rectWidthTrue = rectWidth / 4 * 3 / 2;
            rectSvg.append("g").selectAll("rect").data(dic_ori).enter()
                .append("rect")
                .attr("x", (d, i) => {
                    return margin.left + i * rectWidth;
                })
                .attr("y", (d) => {
                    return margin.top + height_ - hScale(d.num);
                })
                .attr("width", rectWidthTrue)
                .attr("height", (d) => {
                    return hScale(d.num);
                })
                .attr("fill", "#1C86EE")
                .attr("opacity", 0.2)
                .attr("stroke-width", 1)
                .attr("stroke", "#ccc")


            rectSvg.append("g").selectAll("rect").data(dic_ori).enter()
                .append("rect")
                .attr("x", (d, i) => {
                    return margin.left + i * rectWidth + rectWidthTrue;
                })
                .attr("y", (d, i) => {
                    return margin.top + height_ - hScale(d.num);
                })
                .attr("width", rectWidthTrue)
                .attr("height", (d, i) => {
                    return hScale(d.num);
                })
                .attr("fill", "#1C86EE")
                .attr("stroke-width", 1)
                .attr("stroke", "#ccc")
                .attr("class", "rectName")
                .attr("id", (d) => {
                    return "rectName" + d.name;
                })
                .on("click", (d) => {
                    if (isSampling == false) {
                        rectOriClick(d.name);
                        $('.viz-biPartite-mainBar').click();

                        const rectDOM = document.getElementById(`main${d.name}`)
                        const event = new Event('click', {
                            'bubbles': true,
                            'cancelable': true
                        });
                        rectDOM.dispatchEvent(event);
                    } else {
                        rectOriClick(d.name);
                        // rectSamClick(d.name, ClassicalType, rate);
                        $('.viz-biPartite-mainBar').click();

                        const rectDOM = document.getElementById(`main${d.name}`)
                        const event = new Event('click', {
                            'bubbles': true,
                            'cancelable': true
                        });
                        rectDOM.dispatchEvent(event);
                    }
                })
                .transition()
                .delay(100)
                .duration(500)
                .ease(d3.easeLinear)
                .attr("y", (d) => {
                    return margin.top + height_ - hScale(d.num) * d.sam / d.num;
                })
                .attr("height", (d) => {
                    return hScale(d.num) * d.sam / d.num;
                })
        }
    })
})
}
drawMatrix(file, rate, "OUR")