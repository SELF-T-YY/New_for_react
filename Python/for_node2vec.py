#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/1/20 14:17
# @Author  : SELF-T-YY
# @Site    : 
# @File    : for_node2vec.py
# @Software: PyCharm

from node2vec import Node2Vec
import networkx as nx

with open(r'../data/cit-HepTh/CH_re_gai_TRUE.csv') as f:
    node_list = []
    edge_list = []

    f.readline()
    f.readline()

    while True:
        line = f.readline()
        if not line:
            break
        line = line.replace('\n', '').split(',')
        if line[0] not in node_list:
            node_list.append(line[0])
        if line[1] not in node_list:
            node_list.append(line[1])
        if line[0] != line[1]:
            edge_list.append([line[0], line[1]])
    print('ReadOver!!!')
    G = nx.Graph()
    G.add_edges_from(edge_list)

    # Precompute probabilities and generate walks - **ON WINDOWS ONLY WORKS WITH workers=1**
    node2vec = Node2Vec(G, dimensions=64, walk_length=30, num_walks=200,
                        workers=4)  # Use temp_folder for big graphs

    # Embed nodes
    model = node2vec.fit(window=10, min_count=1,
                         batch_words=4)  # Any keywords acceptable by gensim.Word2Vec can be passed, `diemnsions` and `workers` are automatically passed (from the Node2Vec constructor)

    # Look for most similar nodes
    model.wv.most_similar('2')  # Output node names are always strings

    # Save embeddings for later use
    # model.wv.save_word2vec_format(r'../data/fb-pages-media/fb-pages-media-node.txt')
    model.wv.save_word2vec_format(r'../data/cit-HepTh/CH.txt')
