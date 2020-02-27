#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/2/17 18:22
# @Author  : SELF-T-YY
# @Site    : 
# @File    : for_betweenness.py
# @Software: PyCharm

import json
import networkx as nx
import numpy as np

position = 'SW-10000-5-0d3-trial3'
file_name = 'SW'
file_path = r'../data/' + position + '/' + file_name + '_id_x_y_kde_edges.json'
file_write_path = r'../data/' + position + '/' + file_name + '_id_x_y_kde_edges_betweenness.json'

print('file_path:   {}'.format(file_path))
print('file_write_path:   {}'.format(file_write_path))

# with open(r'../data/block2000/block2000t_tsne_5000_addedges.json') as f:
with open(file_path) as f:
    data_dict = json.load(f)
    grf = nx.Graph()
    for i in data_dict:
        grf.add_node(i)
        for j in data_dict[i]['edges']:
            grf.add_edge(i, j)
    between = nx.betweenness_centrality(grf)
    between_list = []
    for i in data_dict:
        between_list.append(between[i])
    between_list = np.exp(between_list)
    print(between_list)
    a = 0
    for i in data_dict:
        # if i in data_dict:
        data_dict[i]['betweenness'] = between_list[a]
        a += 1
        data_dict[i]['id'] = i
    # f_file = open(r'../data/block2000/block2000t_tsne_5000_addedges_gai.json', 'w+')
    f_file = open(file_write_path, 'w+')

    ans_json = json.dumps(data_dict)
    f_file.write(ans_json)