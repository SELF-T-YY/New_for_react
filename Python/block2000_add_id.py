#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/1/20 11:21
# @Author  : SELF-T-YY
# @Site    : 
# @File    : block2000_add_id.py
# @Software: PyCharm

import json

with open(r'../data/block2000/block2000t_tsne_5000_addedges.json') as f:
    data = json.load(f)
    for key in data:
        data[key]['id'] = key

fw = open(r'../data/block2000/block2000t_tsne_5000_addedges.json', 'w+')
fw.write(json.dumps(data))
fw.close()