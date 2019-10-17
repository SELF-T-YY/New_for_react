import math
import json
import random
import tqdm
import os


def calculate_r(fpi, alpha=1, beta=1, bi=math.pi/2, ra=10):
    r = ra/(alpha * fpi + beta * bi)
    return r


def calculate_r_for_all(p_dict):
    for temp_p in p_dict:
        p_dict[temp_p].update({"pr": calculate_r(fpi=float(p_dict[temp_p]["kde"]))})


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


def poisson_disc(p_dict, elem_time=100):
    ans_dict = {}
    p_temp_dict = {}
    temp_dict = p_dict
    a = 0
    p_key = random.choice(list(temp_dict))
    p_temp_dict.update({p_key: temp_dict[p_key]})
    temp_dict.pop(p_key)
    ans_dict.update({p_key: p_temp_dict[p_key]})
    lena = len(list(temp_dict.keys()))
    while temp_dict:
        # print(p_key)
        if_next = False
        for times in range(1, elem_time):
            print(p_temp_dict[p_key])
            print(p_key)
            p_key = random.choice(p_temp_dict[p_key]["edges"])

            if p_key in temp_dict:
                if_next = True
                p_temp_dict.update({p_key: temp_dict[p_key]})
                temp_dict.pop(p_key)
                break
        # print(p_key)
        if not if_next:
            p_key = random.choice(list(temp_dict))
            p_temp_dict.update({p_key: temp_dict[p_key]})
            temp_dict.pop(p_key)
        # print(p_key)
        around_p = ns_around_p(p_temp_dict[p_key], p_temp_dict)
        if around_p == {}:
            ans_dict.update({p_key: p_temp_dict[p_key]})
            temp_dict.pop(p_key)

        lenb = len(list(temp_dict.keys()))

        print("%.2f%%" % ((lena-lenb)/lena * 100))
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


with open(r'../data/oregonf_TSNE_5000_addedges.json') as f:
    data_dict = json.load(f)
    calculate_r_for_all(data_dict)
    final_dict = poisson_disc(data_dict)
    print(final_dict)
    f_file = open(r'../data/1.json', 'w+')
    ans_json = json.dumps(final_dict)
    f_file.write(ans_json)