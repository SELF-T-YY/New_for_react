from community import community_louvain as community
import networkx as nx
import json
import matplotlib.pyplot as plt

sample_rate = (5, 10, 15, 20, 25, 30, 35, 40)
for rate in sample_rate:
    file_path = r'../data/oregonf/our_sample_nodes_edges2/our_sample_a_4_b_6_rate_' \
                      + str(rate) + '_nodes_egdes.json'
    file_write_path = r'../data/oregonf/our_sample_community2/our_sample_a_4_b_6_rate_' \
                      + str(rate) + '_community.json'

    G = nx.Graph()

    nodes = []
    edges = []

    with open(file_path) as f:
        nodes_edges_dict = json.load(f)
        # print(nodes_edges_dict)
        nodes_list_all = nodes_edges_dict["nodes"]
        edges_list_all = nodes_edges_dict['edges']
        for node in nodes_list_all:
            nodes.append(node['id'])
        for edge in edges_list_all:
            edges.append((edge['source'], edge['target']))

        # print(len(nodes))
        # print(edges)
        G.add_nodes_from(nodes)
        G.add_edges_from(edges)

        partition = community.best_partition(G)
        max_num = 0

        for key in partition.keys():
            max_num = max(max_num, partition.get(key))
        print(max_num)
        ans_dict = {}
        for key in partition:
            if partition[key] not in ans_dict:
                temp = [key]
                ans_dict[partition[key]] = temp
            else:
                temp = ans_dict[partition[key]]
                temp.append(key)
                ans_dict[partition[key]] = temp
    fw = open(file_write_path, 'w+')
    fw.write(json.dumps(ans_dict))
    fw.close()



