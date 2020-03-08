#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/3/6 23:27
# @Author  : SELF-T-YY
# @Site    : 
# @File    : for_colaData.py
# @Software: PyCharm

import json

with open(r'../data/cit-HepTh/CH_forceData.json') as f:
    forceData = json.load(f)
    nodesData = forceData['nodes']
    edgesData = forceData['edges']
    nodesList = {}
    nodeCount = 1
    for node in nodesData:
        nodesList[node] = nodeCount
        nodeCount += 1

    with open(r'../data/cit-HepTh/CH_community.json') as f1:
        communityData = json.load(f1)
        nodesNewData = []
        edgesNewData = []
        for node in nodesData:
            nodesNewData.append({'name': node, 'group': communityData[node]})

        for edge in edgesData:
            edgesNewData.append({'source': nodesList[edge['source']], 'target': nodesList[edge['target']], 'value': 1})

    dataTURE = {'nodes': nodesNewData, 'links': edgesNewData}

    fw = open(r'../data/cit-HepTh/CH_colaData_gai.json', 'w+')
    fw.write(json.dumps(dataTURE))
    fw.close()