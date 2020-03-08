#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/2/26 13:11
# @Author  : SELF-T-YY
# @Site    : 
# @File    : if_connected.py
# @Software: PyCharm

import networkx as nx
import csv

with open(r'../data/cit-HepTh/CH_re_gai.csv') as f:
    nodesList = []
    edgesList = []
    while True:
        line = f.readline()
        if not line:
            break
        line = line.replace('\n', '').split(',')
        nodesList.append(line[0])
        nodesList.append(line[1])
        edgesList.append(line)
    nodesList = set(nodesList)

    G = nx.Graph()
    G.add_nodes_from(nodesList)
    G.add_edges_from(edgesList)

    # print(nx.is_connected(G))
    # print(nx.number_connected_components(G))

    for c in nx.connected_components(G):
        print(len(c))
        nodesList_TRUE = list(c)
        edgesList_TRUE = []
        for edge in edgesList:
            if edge[0] in nodesList_TRUE and edge[1] in nodesList_TRUE:
                edgesList_TRUE.append(edge)

        with open(r'../data/cit-HepTh/CH_re_gai_TRUE.csv', 'w', newline='') as fw:
            writer = csv.writer(fw, dialect='excel')
            for i in edgesList_TRUE:
                writer.writerow(i)
        break

        # print(G.subgraph(c))
        # file_name = r'../data/cit-HepTh/G/' + str(c) + '.txt'
        # fw = open(file_name, 'w+')
        # fw.write(G.subgraph(c).nodes())
        # fw.close()

