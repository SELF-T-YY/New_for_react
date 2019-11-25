import json
import os

sample_name = ('SRW', 'ISRW')
sample_rate = ('5', '10', '15', '20', '25', '30', '35', '40')

for name in sample_name:
    for rate in sample_rate:
        file_name = 'oregonf_sample_tsne_' + name + '_' + rate + '_nodes_edges.json'
        file_path = os.path.join(r'../data/oregonf/all_oregonf_rate//', file_name)
        with open(file_path) as f:
            data = json.load(f)
            edges = data['edges']
            nodes_new = []
            edges_new = []
            for key in edges:
                # print(key)
                edges_new.append({'source': str(key['source']), 'target': str(key['target'])})
                if str(key['source']) not in nodes_new:
                    nodes_new.append(str(key['source']))
                if str(key['target']) not in nodes_new:
                    nodes_new.append(str(key['target']))
        #     print(nodes_new)
        #     print(edges_new)
        #     break
        # break


            text_json = json.load(open(r'E:\项目\New_for_react\data\force_data_gai.json'))
            nodes = []
            for node in nodes_new:
                if node in text_json:
                    # print(node)
                    nodes.append({'id': node, 'x': text_json[node]['x'], 'y': text_json[node]['y']})
            data['nodes'] = nodes
            data['edges'] = edges_new
            print(nodes)
            fw = open(file_path, 'w+')
            fw.write(json.dumps(data))