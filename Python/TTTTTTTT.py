#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/1/20 22:57
# @Author  : SELF-T-YY
# @Site    : 
# @File    : TTTTTTTT.py
# @Software: PyCharm

import json

with open(r'../data/fb-pages-public-figure/fb-pages-public-figure.edges.txt') as f:
    nodes_list = []
    edges_list = []
    while True:
        line = f.readline()
        if not line:
            break
        line = line.replace('\n', '').split(',')
        if line[0] not in nodes_list:
            nodes_list.append(line[0])
        if line[1] not in nodes_list:
            nodes_list.append(line[1])
        edges_list.append({'source': line[0], 'target': line[1]})

    ans_dict = {'nodes': nodes_list, 'edges': edges_list}
    # fw = open(r'../data/two_ball/two-ball_forceData.json', 'w+')
    fw = open(r'../data/fb-pages-public-figure/fppf_forceData.json', 'w+')
    fw.write(json.dumps(ans_dict))
    fw.close()