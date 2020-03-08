#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/3/3 17:21
# @Author  : SELF-T-YY
# @Site    : 
# @File    : change_nodes_id.py
# @Software: PyCharm

import json
import csv

with open(r'../data/cit-HepTh/CH_re.csv') as f:
    ansDict_AB = {}
    ansDict_BA = {}
    fData = f.readlines()
    nodeList = []
    for line in fData:
        line = line.replace('\n', '').split(',')
        nodeList.append(line[0])
        nodeList.append(line[1])
    nodeList = list(set(nodeList))
    for i in range(len(nodeList)):
        ansDict_AB[i] = nodeList[i]
        ansDict_BA[nodeList[i]] = i
    with open(r'../data/cit-HepTh/CH_change_nodes_AB.json', 'w+') as fw:
        fw.write(json.dumps(ansDict_AB))
    with open(r'../data/cit-HepTh/CH_change_nodes_BA.json', 'w+') as fw:
        fw.write(json.dumps(ansDict_BA))

    edgesList = []

    for line in fData:
        line = line.replace('\n', '').split(',')
        edgesList.append([ansDict_BA[line[0]], ansDict_BA[line[1]]])
    with open(r'../data/cit-HepTh/CH_re_gai.csv', 'w+', newline='') as fw:
        writer = csv.writer(fw, dialect='excel')
        for i in edgesList:
            writer.writerow(i)

