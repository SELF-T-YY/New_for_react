#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/1/17 17:03
# @Author  : SELF-T-YY
# @Site    : 
# @File    : block2000.py
# @Software: PyCharm

import json
# with open(r'../data/block2000/block2000t.txt') as f:
with open(r'../data/two_ball/two-ball.txt') as f:

    nodes = []
    edges = []

    while True:
        line = f.readline()
        if not line:
            break
        line = line.replace('\n', '').split(' ')
        if line[0] not in nodes:
            nodes.append(line[0])
        if line[1] not in nodes:
            nodes.append(line[1])
        edges.append({'source': line[0], 'target': line[1]})

    ans_json = {'nodes': nodes, 'edges': edges}

    # fw = open('block2000_force_data.json', 'w+')
    fw = open(r'../data/two_ball/two-ball_force_data.json', 'w+')

    fw.write(json.dumps(ans_json))
    fw.close()