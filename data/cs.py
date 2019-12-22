import json
from community import community_louvain as community
import networkx as nx

G = nx.Graph()


nodes = []
edges = []


with open(r'../data/cs/2_.josn') as f:
    nodes_edges_dict = json.load(f)

    # print(nodes_edges_dict)
    nodes_list_all = nodes_edges_dict["nodes"]
    edges_list_all = nodes_edges_dict['edges']
    for node in nodes_list_all:
        nodes.append(node['id'])
    for edge in edges_list_all:
        edges.append((edge['source'], edge['target']))

    G.add_nodes_from(nodes)
    G.add_edges_from(edges)

    partition = community.best_partition(G,  resolution=0.50)

    print(partition)

    max_num = 0
    # fw = open(r'../data/oregonf_community.csv', 'w+')
    for key in partition.keys():
        max_num = max(max_num, partition.get(key))
        # fw.writelines(str(key)+','+str(partition.get(key))+'\n')
    print(max_num)
    # fw.close()