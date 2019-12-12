import math
import json
import random
import os


def calculate_r(fpi, bi, alpha=1, beta=1, ra=10):
    r = ra/(alpha * fpi + beta * bi)
    return r


def calculate_r_for_all(p_dict):
    for temp_p in p_dict:
        p_dict[temp_p].update({"pr": calculate_r(fpi=float(p_dict[temp_p]["kde"]), bi=int(p_dict[temp_p]["betweenness"]))})


def distance(p1, p2):
    return math.sqrt(math.pow(float(p1['x']) - float(p2['x']), 2) + math.pow(float(p1['y']) - float(p2['y']), 2))


def ns_around_p(p, p_dict):
    ans_dict = {}
    for temp_p in p_dict:
        if abs(float(p['x']) - float(p_dict[temp_p]['x'])) > float(p['pr']) \
            or \
                abs(float(p['y']) - float(p_dict[temp_p]['y']) > float(p['pr'])):
            continue
        if distance(p, p_dict[temp_p]) <= float(p['pr']):
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


def poisson_disc(p_dict):
    pan_stack = Stack()
    ans_list = []
    p_temp_dict = {}
    temp_dict = p_dict
    while temp_dict:
        p_key = random.choice(list(temp_dict))
        pan_stack.push(p_key)
        p_temp_dict.update({p_key: temp_dict[p_key]})
        temp_dict.pop(p_key)
        ans_list.append(p_key)
        # ans_list.append({'id': p_key, 'x': p_temp_dict[p_key]['x'], 'y': p_temp_dict[p_key]['y']})
        while p_key != -1:
            around_p = ns_around_p(p_temp_dict[p_key], temp_dict)
            if not around_p == {}:
                for remove_p in around_p:
                    temp_dict.pop(remove_p)
            # print(p_key)
            if_next = False
            for edge in p_temp_dict[p_key]["edges"]:
                if edge not in temp_dict:
                    p_temp_dict[p_key]["edges"].remove(edge)
                else:
                    if_next = True
            if not if_next:
                p_key = pan_stack.pop()
                continue
                # print("asdsad")

            if p_key == -1:
                continue
            p_key = dict_key_value_max(temp_dict, p_temp_dict[p_key])
            pan_stack.push(p_key)
            # print(pan_stack.data)
            p_temp_dict.update({p_key: temp_dict[p_key]})
            temp_dict.pop(p_key)
            ans_list.append(p_key)
            # ans_list.append({'id': p_key, 'x': p_temp_dict[p_key]['x'], 'y': p_temp_dict[p_key]['y']})
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
        self.data.append(data)

    def top(self):
        return self.data[-1]


# ===================10=======a 1 === b 1====ra 10
with open(r'../data/oregonf_tsne_5000_addedges.json') as f:
    data_dict = json.load(f)
    len1 = len(list(data_dict.keys()))
    calculate_r_for_all(data_dict)
    final_list = poisson_disc(data_dict)
    print(final_list)
    len2 = len(final_list)
    print(len2 / len1)
    f_file = open(r'../data/oregonf_OUR_a_1_b_1_Rate_10.json', 'w+')
    ans_json = json.dumps(final_list)
    f_file.write(ans_json)
