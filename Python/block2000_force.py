#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/1/17 17:30
# @Author  : SELF-T-YY
# @Site    : 
# @File    : block2000_force.py
# @Software: PyCharm


import json
# with open(r'../data/block2000/block2000_force_data_gai.json') as f:
with open(r'../data/two_ball/two-ball_force_gai.json') as f:

    data = json.load(f)['nodes']
    ans = {}
    for i in data:
        ans[i['id']] = i
    print(ans)
    open(r'../data/two_ball/two-ball_nodes_id_x_y.json', 'w+').write(json.dumps(ans))