#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/2/9 15:17
# @Author  : SELF-T-YY
# @Site    : 
# @File    : our_sample_gai5_for_fpp.py
# @Software: PyCharm

import math
import json
import random
import copy


all_data_dict = json.load(open('../data/fb-pages-politician/fpp_forceData.json'))
all_edges_dict = all_data_dict['edges']
all_nodes_dict = json.load((open('../data/fb-pages-politician/fpp_id_x_y_kde.json')))


def calculate_r(fpi, bi, beta=1):
    beta = 1 - alpha
    temp = (alpha * fpi*100 + beta * bi)
    if temp == 0:
        temp = 1
    r = ra/temp
    return r


def calculate_r_for_all(p_dict):
    for temp_p in p_dict:
        p_dict[temp_p].update({"pr": calculate_r(fpi=float(p_dict[temp_p]["kde"]), bi=int(p_dict[temp_p]["betweenness"]))})


def distance(p1, p2):

    return math.sqrt(math.pow(float(p1['x']) - float(p2['x']), 2) + math.pow(float(p1['y']) - float(p2['y']), 2))


def ns_around_p(p, p_dict):
    ans_dict = {}
    for temp_p in p_dict:
        if distance(p, p_dict[temp_p]) <= float(p['pr']):
            ans_dict.update({p_dict[temp_p]['id']: p_dict[temp_p]})
    return ans_dict


def ns_around_p_inR2_outR1_both(p, p_dict):
    ans_dict = {}
    for temp_p in p_dict:
        dis = distance(p, p_dict[temp_p])
        if dis <= float(p['pr']):
            continue

        if dis <= float(p['pr']*2):
            if dis > float(p_dict[temp_p]['pr']):
                ans_dict.update({p_dict[temp_p]['id']: p_dict[temp_p]})
    return ans_dict


# remove-----True
# save-------False
def remove_or_save(p, pd_p):
    max_r = max(float(p['pr']), float(pd_p['pr']))
    if distance(p, pd_p) < max_r:
        return True
    else:
        return False


def dict_key_value_max(all_dict, p_dict):
    edges_list = p_dict["edges"]
    max_betweenness = 0
    max_betweenness_key = -1
    for edge in edges_list:
        if edge not in all_dict:
            continue
        if all_dict[edge]["betweenness"] > max_betweenness:
            max_betweenness = all_dict[edge]["betweenness"]
            max_betweenness_key = edge
    return max_betweenness_key


def max_betweenness(all_dict):
    max_betweeness = 0
    max_betweeness_key = -1
    for edge in all_dict:
        if all_dict[edge]["betweenness"] > max_betweeness:
            max_betweeness = all_dict[edge]["betweenness"]
            max_betweeness_key = edge
    return max_betweeness_key


def choose_p_key(data_list, p_dict, all_dict):
    p_list = []
    for p in data_list:
        for edge in all_dict[p]['edges']:
            if edge in p_dict:
                p_list.append(edge)
    if not p_list:
        return -1
    else:
        max_betweeness = 0
        p_key = -1
        for p in p_list:
            if all_dict[p]["betweenness"] > max_betweeness:
                max_betweeness = all_dict[p]["betweenness"]
                p_key = p
    return p_key


def poisson_disc(p_dict, per):
    pan_stack = Stack()
    ans_list = []
    p_temp_dict = {}
    temp_dict = copy.deepcopy(p_dict)
    flag = True
    while temp_dict:
        if pan_stack.empty() and flag:
            flag = False
            p_key = max_betweenness(temp_dict)
            # p_key = random.choice(list(temp_dict))
        else:
            if len(ans_list) / len(p_dict)*100 > per:
                break
            p_key = choose_p_key(ans_list, temp_dict, p_dict)
        if p_key == -1:
            break

        pan_stack.push(p_key)
        p_temp_dict.update({p_key: temp_dict[p_key]})
        temp_dict.pop(p_key)
        ans_list.append(p_key)
        while p_key != -1:
            around_p = ns_around_p(p_temp_dict[p_key], temp_dict)
            if not around_p == {}:
                for remove_p in around_p:
                    temp_dict.pop(remove_p)

            if_next = False
            for edge in p_temp_dict[p_key]["edges"]:
                if edge not in temp_dict:
                    p_temp_dict[p_key]["edges"].remove(edge)
                else:
                    if_next = True
            if not if_next:
                p_key = pan_stack.pop()
                continue
            if p_key == -1:
                continue
            p_key = dict_key_value_max(ns_around_p_inR2_outR1_both(p_temp_dict[p_key], temp_dict), p_temp_dict[p_key])
            pan_stack.push(p_key)
            if p_key == -1:
                continue
            p_temp_dict.update({p_key: temp_dict[p_key]})
            temp_dict.pop(p_key)
            ans_list.append(p_key)
        ans_list = list(set(ans_list))
    return ans_list


class Stack:
    def __init__(self):
        self.data = []

    def empty(self):
        if not self.data:
            return True
        else:
            return False

    def size(self):
        return len(self.data)

    def pop(self):
        if self.empty():
            return -1
        else:
            return self.data.pop()

    def push(self, data):
        if data != -1:
            self.data.append(data)

    def top(self):
        return self.data[-1]


def reflash(p_dict):
    ans_nodes = []
    ans_edges = []

    check_nodes =[]
    for edge in all_edges_dict:
        n1 = edge['source']
        n2 = edge['target']
        if n1 in p_dict and n2 in p_dict:
            ans_edges.append(edge)
            if n1 not in check_nodes:
                check_nodes.append(n1)
                ans_nodes.append({'id': n1,
                                  'x': all_nodes_dict[n1]['x'],
                                  'y': all_nodes_dict[n1]['y']})
            if n2 not in check_nodes:
                check_nodes.append(n2)
                ans_nodes.append({'id': n2,
                                  'x': all_nodes_dict[n2]['x'],
                                  'y': all_nodes_dict[n2]['y']})
    return {'nodes': ans_nodes, 'edges': ans_edges}


# per = 10
# f_name = r'../data/block2000/our_sample/our_sample_gai_a_0.1_b_0.9_rata_' + str(per) + '.json'
# with open(f_name) as f:
#     data = json.load(f)
#     data = reflash(data)
#     # print(data)
#     f_file = open(r'../data/block2000/our_sample_gai/our_sample_gai_a_0.1_b_0.9_rata_' + str(per) + '.json', 'w+')
#     ans_json = json.dumps(data)
#     f_file.write(ans_json)


with open(r'../data/fb-pages-politician/fpp_id_x_y_kde_edges_betweenness.json') as f:
    alpha = 0.1

    ra = 13.5

    per = 30

    ra = ra/100

    # 5     40
    # 10    28
    # 15    22
    # 20    18
    # 25    16
    # 30    13.5
    # 35    12
    # 40    10

    data_dict = json.load(f)
    len1 = len(list(data_dict.keys()))
    calculate_r_for_all(data_dict)

    max_len = 0
    for i in range(1):
        final_list = poisson_disc(data_dict, 40)
        final_list = reflash(final_list)
        len2 = len(final_list['nodes'])
        # len2 = len(final_list)
        len_fin = len2 / len1 * 100
        print(len_fin, "%", sep='')
        if max_len < len_fin:
            ans_list = final_list
            max_len = len_fin
        # print(final_list)
    print(ans_list)
    print(max_len, '%', sep='')
    f_file = open(r'../data/fb-pages-politician/our_sample/our_sample_gai_a_0.1_b_0.9_rata_' + str(per) + '.json', 'w+')
    ans_json = json.dumps(final_list)
    f_file.write(ans_json)
