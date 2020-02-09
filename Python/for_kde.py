#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/1/22 13:03
# @Author  : SELF-T-YY
# @Site    : 
# @File    : for_kde.py
# @Software: PyCharm

from sklearn.neighbors.kde import KernelDensity
import numpy as np
import json

with open(r'../data/fb-pages-public-figure/fppf_Tsne.csv') as f:
    ans_dict = {}
    temp_list = []
    id_list = []
    while True:
        line = f.readline()
        if not line:
            break
        line = line.replace('\n', '').split(',')
        id_list.append(line[0])
        temp_list.append([line[1], line[2]])
        ans_dict[line[0]] = {'id': line[0], 'x': line[1], 'y': line[0]}
    X = np.array(temp_list)
    kde = KernelDensity(kernel='gaussian', bandwidth=0.2).fit(X)
    kde_list = np.exp(kde.score_samples(X))
    print(id_list)
    for i in range(len(id_list)):
        ans_dict[id_list[i]]['kde'] = kde_list[i]
        print(i)
    print(ans_dict)
    fw = open(r'../data/fb-pages-public-figure/fppf_id_x_y_kde.json', 'w+')
    fw.write(json.dumps(ans_dict))
    fw.close()