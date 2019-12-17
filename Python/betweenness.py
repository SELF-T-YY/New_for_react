import json
import networkx as nx

with open(r'../data/oregonf_tsne_5000_addedges.json') as f:
    data_dict = json.load(f)
    grf = nx.Graph()
    for i in data_dict:
        grf.add_node(i)
        for j in data_dict[i]['edges']:
            grf.add_edge(i, j)

    between = nx.betweenness_centrality(grf)

    for i in between:
        if i in data_dict:
            data_dict[i]['betweenness'] = between[i]
    f_file = open(r'../data/oregonf/oregonf_tsne_5000_betweenness', 'w+')
    ans_json = json.dumps(data_dict)
    f_file.write(ans_json)
