import math
import json
import random
import tqdm
import os


def calculate_r(fpi, bi, alpha=1, beta=1, ra=7):
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


def poisson_disc(p_dict, elem_time=100):
    ans_dict = {}
    p_temp_dict = {}
    temp_dict = p_dict
    # a = 0
    p_key = random.choice(list(temp_dict))
    p_temp_dict.update({p_key: temp_dict[p_key]})
    temp_dict.pop(p_key)
    ans_dict.update({p_key: p_temp_dict[p_key]})
    # lena = len(list(temp_dict.keys()))
    while temp_dict:
        # print(p_key)
        if_next = False

        for edge in p_temp_dict[p_key]["edges"]:
            if edge not in temp_dict:
                p_temp_dict[p_key]["edges"].remove(edge)
            else:
                if_next = True

        if not if_next:
            p_key = random.choice(list(temp_dict))
            p_temp_dict.update({p_key: temp_dict[p_key]})
            temp_dict.pop(p_key)
        else:
            p_key = dict_key_value_max(temp_dict, p_temp_dict[p_key])
            p_temp_dict.update({p_key: temp_dict[p_key]})
            temp_dict.pop(p_key)
        around_p = ns_around_p(p_temp_dict[p_key], temp_dict)

        ans_dict.update({p_key: p_temp_dict[p_key]})
        if not around_p == {}:
            for remove_p in around_p:
                temp_dict.pop(remove_p)

        # lenb = len(list(temp_dict.keys()))
        #
        # print("%.2f%%" % ((lena-lenb)/lena * 100))
    return ans_dict


    # ans_dict = {}
    # p_temp_dict = {}
    # temp_dict = p_dict
    # a = 0
    # p_key = random.choice(list(temp_dict))
    # p_temp_dict.update({p_key: temp_dict[p_key]})
    # temp_dict.pop(p_key)
    #
    # while temp_dict:
    #     if p_temp_dict == {}:
    #         p_key = random.choice(list(temp_dict))
    #         p = temp_dict[p_key]
    #         temp_dict.pop(p_key)
    #     else:
    #         p_key = random.choice(list(p_temp_dict))
    #         p = p_temp_dict[p_key]
    #
    #     around_p = ns_around_p(p, temp_dict)
    #     if around_p == {}:
    #         if p_key in list(p_temp_dict):
    #             a += 1
    #             ans_dict.update({p_key: p})
    #             p_temp_dict.pop(p_key)
    #         else:
    #             p_temp_dict.update({p_key: p})
    #         continue
    #     if_remove = False
    #     for pd_p_key in list(around_p.keys()):
    #         pd_p = around_p[pd_p_key]
    #         if remove_or_save(p, pd_p):
    #             temp_dict.pop(pd_p_key)
    #         else:
    #             if pd_p_key not in list(p_temp_dict):
    #                 p_temp_dict.update({pd_p_key: pd_p})
    #                 if_remove = True
    #                 break
    #
    #     if not if_remove:
    #         if p_key in list(p_temp_dict):
    #             a += 1
    #             ans_dict.update({p_key: p})
    #             p_temp_dict.pop(p_key)
    #         else:
    #             p_temp_dict.update({p_key: p})
    # return ans_dict






#oregonf_OUR_a_1_b_1_Rate_20.json
#oregonf_OUR_a_1_b_1_Rate_10.json--------------ra 7
with open(r'../data/oregonf_tsne_5000_addedges.json') as f:
    data_dict = json.load(f)
    len1 = len(list(data_dict.keys()))
    calculate_r_for_all(data_dict)
    final_dict = poisson_disc(data_dict)
    print(final_dict)
    len2 = len(list(final_dict.keys()))
    print(len1/len2)
    f_file = open(r'../data/oregonf_OUR_a_1_b_1_Rate_10.json', 'w+')
    ans_json = json.dumps(final_dict)
    f_file.write(ans_json)