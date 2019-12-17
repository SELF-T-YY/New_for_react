import math
import json
import random
import os

import community
import networkx as nx
# from file import file
from sklearn.metrics.pairwise import cosine_similarity

File_path = r'../data/oregonf/our_sample/oregonf_OUR_a_1_b_9_Rate_5.json'
File_path_or = r'../data/oregonf_tsne_5000_addedges.json'


# 特征向量中心性
def cal_AEC(gra):
    ace = nx.eigenvector_centrality_numpy(gra)
    ans = 0
    for i in ace:
        ans = ace[i] + ans
    return ans / len(ace)


def cal_ANB(data):
    ans = 0
    for i in data:
        ans = data[i]["betweenness"] + ans
    return ans / len(data)


def build_G(data):
    tG = nx.Graph()
    # tG.add_edge(1,2)
    # tG.add_edge(4,3)
    for k in data:
        tG.add_node(k)
        for e in data[k]['edges']:
            if e in data.keys():
                tG.add_edge(k, e)
    return tG


def cal_ACC(gra):
    acc = nx.closeness_centrality(gra)
    ans = 0
    for i in acc:
        ans = acc[i] + ans
    return ans / len(acc)
    return ans


def cal_CC(gra):
    cc = nx.number_connected_components(G)
    return cc


def cal_QCS(gra, gra_o):
    communities = community.best_partition(gra)
    communities_o = community.best_partition(gra_o)
    tm = {}
    for i in communities:
        cc = communities[i]
        if cc in tm.keys():
            tm[cc] = tm[cc] + 1
        else:
            tm[cc] = 1
    tm_o = {}
    for i in communities_o:
        cc = communities_o[i]
        if cc in tm_o.keys():
            tm_o[cc] = tm_o[cc] + 1
        else:
            tm_o[cc] = 1
    a = []
    b = []
    c = []
    l = len(tm)
    l_o = len(tm_o)
    m = 0
    if l > l_o:
        m = l
    else:
        m = l_o
    for i in range(0, m - 1):
        if i in tm.keys():
            b.append(tm[i])
        else:
            b.append(0)
        if i in tm_o.keys():
            c.append(tm_o[i])
        else:
            c.append(0)
    a = [b, c]
    ans = cosine_similarity(a)[0][1]
    return ans


def cal_SCS(gra, gra_o):
    communities = community.best_partition(gra)
    communities_o = community.best_partition(gra_o)
    x = []
    tm_o = {}
    for i in communities_o:
        cc = communities_o[i]
        if cc in tm_o.keys():
            tm_o[cc] = tm_o[cc] + 1
        else:
            tm_o[cc] = 1

    tm = {}
    for i in communities:
        cc = communities[i]
        if cc in tm.keys():
            tm[cc].append(i)
        else:
            tm[cc] = [i]
    print(tm)
    for i in tm:
        tp = {}
        for j in tm[i]:
            c_o = communities_o[j]
            if c_o in tp.keys():
                tp[c_o] = tp[c_o] + 1
            else:
                tp[c_o] = 1
        for k in tp:
            a = tp[k] / tm_o[k]
            x.append(a)

    bb = 0
    for i in x:
        bb = bb + i
    print(bb)
    ans = 0
    for i in x:
        ans = ans - i * math.log2(i)
    return ans


with open(File_path_or) as fo:
    with open(File_path) as f:
        data_dict = json.load(f)
        data_or = json.load(fo)

        G = build_G(data_dict)
        G_o = build_G(data_or)

        ACE = cal_AEC(G)
        ANB = cal_ANB(data_dict)
        ACC = cal_ACC(G)
        CC = cal_CC(G)
        QCS = cal_QCS(G, G_o)
        SCS = cal_SCS(G, G_o)
        print(SCS)
        # print(ACE)
        # print(ANB)
        # print(ACC)
        # print(QCS)
