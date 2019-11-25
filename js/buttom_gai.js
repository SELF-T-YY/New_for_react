var buttom = document.querySelector('input[id="button-sample"]');


function buttom_sample_click(){
    var select_name = document.getElementById('Left-s');
    var index = select_name.selectedIndex;
    var select_n = select_name.options[index].value;

    var sample_name = NaN;
    var sample_rate = NaN;
    if(select_n == 'FF' || select_n == 'SRW' || select_n == 'OUR' || select_n == 'RNS' || select_n == 'ISRW' || select_n == 'TIES'){
        sample_name = select_n;
    }

    var elem3 = document.querySelector('input[id="range3"]');
    var nodes_num = 11174*elem3.value*0.01;
    var edges_num = 23410*elem3.value*0.01;
    document.getElementById("sample_nodes_num").innerText= parseInt(nodes_num);
    document.getElementById("sample_edges_num").innerText= parseInt(edges_num);

    // 列表社区数量呈现
    // document.getElementById('sample_community_num').innerText = parseInt(xx);

    if(elem3.value == '5' || elem3.value == '10' || elem3.value == '15' || elem3.value == '20' || elem3.value == '25' || elem3.value == '30' || elem3.value == '35' || elem3.value == '40') {
        sample_rate = parseInt(elem3.value);
    }

    // oregonf_sample_tsne_FF_5_nodes_edges.json

    var file_path = NaN;
    if(!(sample_name == NaN || sample_rate == NaN)){
        reflash();
        
        file_path = '/data/oregonf/all_oregonf_rate/oregonf_sample_tsne_' + sample_name + '_' + sample_rate + '_nodes_edges.json';
        
        force_file_name = file_path;
        drawforce_again();
        
        document.getElementById('tsne_svg').remove()
        draw_tsne();

        drawRadar(parseInt(sample_rate))
    }


}