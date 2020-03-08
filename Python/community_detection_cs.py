#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/3/5 14:25
# @Author  : SELF-T-YY
# @Site    : 
# @File    : community_detection_cs.py
# @Software: PyCharm

from community import community_louvain as community
import networkx as nx
import json

with open(r'../data/soc-sign-bitcoinotc.csv/cs/our_sample_times_0_a_0.5_b_0.5_rata_20.json') as f:
    data = json.load(f)
    nodeData = data['nodes']
    edgeData = data['edges']
    # {"source": "6701", "target": "2035"}
    nodeList = []
    edgeList = []
    for edge in edgeData:
        node1 = edge['source']
        node2 = edge['target']

        nodeList.append(node1)
        nodeList.append(node2)
        edgeList.append([node1, node2])
    nodeList = list(set(nodeList))

    G = nx.Graph()
    G.add_nodes_from(nodeList)
    G.add_edges_from(edgeList)

    partition = community.best_partition(G)

    max_num = 0
    for i in partition.keys():
        max_num = max(max_num, partition.get(i))
    print(max_num)
    fw = open(r'../data/soc-sign-bitcoinotc.csv/cs/20.json', 'w+')
    fw.write(json.dumps(partition))
    fw.close()

    # CH
    # 10    20
    # 15    13
    # 20    14

    # SSB
    # 10    7
    # 15    8
    # 20    7