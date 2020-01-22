#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/1/17 16:22
# @Author  : SELF-T-YY
# @Site    : 
# @File    : betweenness_for_block2000.py
# @Software: PyCharm

import json
import networkx as nx

# with open(r'../data/block2000/block2000t_tsne_5000_addedges.json') as f:
with open(r'../data/ca-HepPh.txt/ca-HepPh_id_x_y_kde_edges.json') as f:
    data_dict = json.load(f)
    grf = nx.Graph()
    for i in data_dict:
        grf.add_node(i)
        for j in data_dict[i]['edges']:
            grf.add_edge(i, j)

    print('xx')
    between = nx.betweenness_centrality(grf)
    print(between)
    for i in between:
        if i in data_dict:
            data_dict[i]['betweenness'] = between[i]
            data_dict[i]['id'] = i
    # f_file = open(r'../data/block2000/block2000t_tsne_5000_addedges_gai.json', 'w+')
    f_file = open(r'../data/ca-HepPh.txt/ca-HepPh_id_x_y_kde_edges_betweenness.json', 'w+')

    ans_json = json.dumps(data_dict)
    f_file.write(ans_json)
