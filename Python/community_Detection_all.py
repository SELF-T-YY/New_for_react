import community
import networkx as nx
import json
import os


sample_name = ('FF', 'ISRW', 'RNS', 'SRW', 'TIES')
sample_rate = ('5', '10', '15', '20', '25', '30', '35', '40')

print('----------start-----------')
for name in sample_name:
    for rate in sample_rate:
        file_name = 'oregonf_sample_tsne_' + name + '_' + rate + '_nodes_edges.json'
        file_path = os.path.join(r'../data/oregonf/all_oregonf_rate//' + file_name)

        file_write_name = 'oregonf_sample_tsne_' + name + '_' + rate + '_community_num_nodes_id.json'
        file_write_path = os.path.join(r'../data/oregonf/all_oregonf_rate_community//' + file_write_name)

        print(file_name)

        G = nx.Graph()

        nodes = []
        edges = []

        with open(file_path) as f:
            data = json.load(f)
            for key in data['nodes']:
                nodes.append(int(key['id']))
            for key in data['edges']:
                edges.append((int(key['source']), int(key['target'])))
        G.add_nodes_from(nodes)
        G.add_edges_from(edges)
        partition = community.best_partition(G)
        max_num = 0

        community_json = {}
        for key in partition:
            community_num = partition[key]
            if community_num in community_json:
                temp = community_json[community_num]['nodes']
                temp.append(key)
                community_json[community_num] = {
                                                    'num': community_json[community_num]['num'] + 1,
                                                     'nodes': temp,
                                                    'community_id': community_num
                                                }
            else:
                temp = list()
                temp.append(key)
                community_json[community_num] = {'num': 1, 'nodes': temp, 'community_id': community_num}

            max_num = max(max_num, partition[key])
        pass

        with open(file_write_path, 'w+') as fw:
            fw.write(json.dumps(community_json))

print('----------over-----------')