#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/2/26 11:43
# @Author  : SELF-T-YY
# @Site    : 
# @File    : delete_node.py
# @Software: PyCharm


def run(re_list):
    node_num_dict = {}
    for temp_list in re_list:
        if temp_list[0] not in node_num_dict:
            node_num_dict[temp_list[0]] = 1
        else:
            node_num_dict[temp_list[0]] = node_num_dict[temp_list[0]] + 1
        if temp_list[1] not in node_num_dict:
            node_num_dict[temp_list[1]] = 1
        else:
            node_num_dict[temp_list[1]] = node_num_dict[temp_list[1]] + 1
    return node_num_dict


def re_run(re_list, node_one_list):
    ans_nodes = []
    # print(re_list)
    for node_list in re_list:
        if node_list[0] in node_one_list:
            continue
        if node_list[1] in node_one_list:
            continue
        ans_nodes.append([node_list[0], node_list[1]])
    return ans_nodes


def delete(re_dict, num):
    node_one_list = []
    for node in re_dict:
        if re_dict[node] == num:
            node_one_list.append(node)
    for i in node_one_list:
        re_dict.pop(i)
    print('node_one_list num:', len(node_one_list))
    print('const: ', len(list(re_dict.keys())))
    return re_dict, node_one_list


with open(r'../data/cit-HepTh/Cit-HepTh.txt') as f:
    f.readline()
    f.readline()
    f.readline()
    f.readline()
    all_node = []
    while True:
        line = f.readline()
        if not line:
            break
        line = line.replace('\n', '').split('\t')
        all_node.append(line)

    for i in range(0, 6):
        a = run(all_node)
        b, c = delete(a, 1)
        all_node = re_run(all_node, c)

    a = run(all_node)
    b, c = delete(a, 2)
    all_node = re_run(all_node, c)

    for i in range(0, 6):
        a = run(all_node)
        b, c = delete(a, 1)
        all_node = re_run(all_node, c)
    # b = delete(b, 2)
    # b = delete(b, 3)
    # b = delete(b, 4)
    # b = delete(b, 2)
    # b = delete(b, 3)





    # ans_nodes = []
    # for node_list in all_node:
    #     if node_list[0] in node_one_list:
    #         continue
    #     if node_list[1] in node_one_list:
    #         continue
    #     ans_nodes.append(node_list)

    # fw = open(r'../data/cit-HepTh/new_CH.txt', 'w+')
    # for i in ans_nodes:
    #     fw.writelines(str(i[0]) + ',' + str(i[1]))
    # fw.close()
