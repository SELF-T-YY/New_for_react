#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/2/27 20:07
# @Author  : SELF-T-YY
# @Site    : 
# @File    : WR_forceData.py
# @Software: PyCharm

# SRC:Steel1943
# TGT:BDD
# VOT:1
# RES:1
# YEA:2013
# DAT:23:13, 19 April 2013
# TXT:'''Support''' as co-nom.
#

import json

all_edgesDict = {}
edgeConst = 0
nodesList = []
edgesList = []
with open(r'../data/wiki-RfA.txt/wiki-RfA.txt', encoding='utf-8') as f:

    while True:
        line = f.readline()
        if not line:
            break

        line_SRC = line.replace('\n', '').split(':', 1)
        line_TGT = f.readline().replace('\n', '').split(':', 1)
        line_VOT = f.readline().replace('\n', '').split(':', 1)
        line_RES = f.readline().replace('\n', '').split(':', 1)
        line_YEA = f.readline().replace('\n', '').split(':', 1)
        line_DAT = f.readline().replace('\n', '').split(':', 1)
        line_TXT = f.readline().replace('\n', '').split(':', 1)
        f.readline()

        if line_SRC[0] != 'SRC':
            break
        # if line_SRC[1] == '':
        #     break

        all_edgesDict[edgeConst] = {
            line_SRC[0]: line_SRC[1],
            line_TGT[0]: line_TGT[1],
            line_VOT[0]: line_VOT[1],
            line_RES[0]: line_RES[1],
            line_YEA[0]: line_YEA[1],
            line_DAT[0]: line_DAT[1],
            line_TXT[0]: line_TXT[1]
        }
        edgeConst += 1

        nodesList.append(line_SRC[1])
        nodesList.append(line_TGT[1])
        edgesList.append([line_SRC[1], line_TGT[1]])

    nodesList = list(set(nodesList))
    forceDataDict = {'nodes': nodesList, 'edges': edgesList}

    fw = open(r'../data/wiki-RfA.txt/WR_forceData.json', 'w+')
    fw.write(json.dumps(forceDataDict))
    fw.close()

    fw = open(r'../data/wiki-RfA.txt/WR.json', 'w+')
    fw.write(json.dumps(all_edgesDict))
    fw.close()