import math
import json
import random
import networkx as nx
import os


# 计算松柏盘半径
def calculate_r(fpi, bi, alpha=0.1, beta=1, ra=50):
    beta = 1 - alpha
    ra = ra/1000000
    r = ra/(alpha * fpi + beta * bi)
    return r


# 为所有的node计算松柏盘半径
def calculate_r_for_all(p_dict):
    for temp_p in p_dict:
        p_dict[temp_p].update({"pr": calculate_r(fpi=float(p_dict[temp_p]["kde"]), bi=int(p_dict[temp_p]["betweenness"]))})


# 计算两点之间的距离
def distance(p1, p2):
    return math.sqrt(math.pow(float(p1['x']) - float(p2['x']), 2) + math.pow(float(p1['y']) - float(p2['y']), 2))


# 找出在松柏盘r之内的点
def ns_around_p(p, p_dict):
    ans_dict = {}
    for temp_p in p_dict:
        # if abs(float(p['x']) - float(p_dict[temp_p]['x'])) > float(p['pr']) \
        #     or \
        #         abs(float(p['y']) - float(p_dict[temp_p]['y']) > float(p['pr'])):
        #     continue
        if distance(p, p_dict[temp_p]) <= float(p['pr']):
            ans_dict.update({p_dict[temp_p]['id']: p_dict[temp_p]})
    return ans_dict


# 找出在node点r到2r之间的点，且找出的点的半径小于等于r
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


# # remove-----True
# # save-------False
# def remove_or_save(p, pd_p):
#     max_r = max(float(p['pr']), float(pd_p['pr']))
#     if distance(p, pd_p) < max_r:
#         return True
#     else:
#         return False


# 找出在all_dict中连通度最大的node
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


# 主算法
def poisson_disc(p_dict):
    pan_stack = Stack()
    ans_list = []
    p_temp_dict = {}
    temp_dict = p_dict
    # 如果temp_dict中还存在点，循环继续
    while temp_dict:
        # 在temp_dict随机取点
        p_key = random.choice(list(temp_dict))
        # 加入pan_stack
        pan_stack.push(p_key)
        p_temp_dict.update({p_key: temp_dict[p_key]})
        temp_dict.pop(p_key)
        ans_list.append(p_key)
        # ans_list.append({'id': p_key, 'x': p_temp_dict[p_key]['x'], 'y': p_temp_dict[p_key]['y']})
        # 如果p_key == -1 循环结束，重新选择根节点
        while p_key != -1:
            # 删除p_key r内的点
            around_p = ns_around_p(p_temp_dict[p_key], temp_dict)
            if not around_p == {}:
                for remove_p in around_p:
                    temp_dict.pop(remove_p)
            # print(p_key)
            # 判断是否有下一个联通点
            if_next = False
            for edge in p_temp_dict[p_key]["edges"]:
                if edge not in temp_dict:
                    p_temp_dict[p_key]["edges"].remove(edge)
                else:
                    if_next = True
            # 如果没有继续的点, 返回上一个点继续循环
            if not if_next:
                p_key = pan_stack.pop()
                continue
                # print("asdsad")

            if p_key == -1:
                continue
            # 选出下一个点
            p_key = dict_key_value_max(ns_around_p_inR2_outR1_both(p_temp_dict[p_key], temp_dict), p_temp_dict[p_key])
            pan_stack.push(p_key)
            # print(pan_stack.data)
            if p_key == -1:
                continue
            p_temp_dict.update({p_key: temp_dict[p_key]})
            temp_dict.pop(p_key)
            ans_list.append(p_key)
            # ans_list.append({'id': p_key, 'x': p_temp_dict[p_key]['x'], 'y': p_temp_dict[p_key]['y']})
    # 删除重复的点
    ans_list = list(set(ans_list))
    return ans_list


# 栈
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
        self.data.append(data)

    def top(self):
        return self.data[-1]


# =================== 5=======a 0.1 === b 0.9====ra 300
# ===================10=======a 0.1 === b 0.9====ra 170
# ===================15=======a 0.1 === b 0.9====ra 110
# ===================20=======a 0.1 === b 0.9====ra 85
# ===================25=======a 0.1 === b 0.9====ra 70
# ===================30=======a 0.1 === b 0.9====ra 60
# ===================35=======a 0.1 === b 0.9====ra 50
# ===================40=======a 0.1 === b 0.9====ra 40？？

# ===================40=======a 0.2 === b 0.8====ra 50


with open(r'../data/oregonf/oregonf_tsne_5000_betweenness.json') as f:
# with open(r'../data/oregonf/bet_test.json')as f:
    data_dict = json.load(f)
    len1 = len(list(data_dict.keys()))
    calculate_r_for_all(data_dict)
    final_list = poisson_disc(data_dict)
    print(final_list)
    len2 = len(final_list)
    print(len2 / len1 * 100)
    # f_file = open(r'../data/oregonf/bet_test_run.json', 'w+')
    f_file = open(r'../data/cs/1.json', 'w+')
    # f_file = open(r'../data/oregonf/our_sample_gai/our_sample_gai_a_0.2_b_0.8_rata_40.json', 'w+')
    ans_json = json.dumps(final_list)
    f_file.write(ans_json)