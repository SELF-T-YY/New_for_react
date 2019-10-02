import math
import json
import random

data_dict ={}


def calculate_r(fpi, alpha = 1, beta = 1, bi = math.pi/2, ra=100):
    r = ra/(alpha* fpi + beta * bi)
    return r


def calculate_r_for_all(p_dict):
    for temp_p in p_dict:
        p_dict[temp_p].updata({"pr":calculate_r(fpi = p_dict[temp_p]["fpi"])})


def distance(p1, p2):
    return math.sqrt(math.pow(p1["x"] - p2["x"], 2) + math.pow(p1["y"] - p2["y"], 2))


def ns_around_p(p, p_dict):
    ans_dict ={}
    for temp_p in p_dict:
        if abs(p['x'] - temp_p["x"]) > p['pr'] or abs(p['y'] - temp_p['y'] > p['pr']):
            continue
        if distance(p, temp_p) <= p['pr']:
            ans_dict.update(p)
    return ans_dict


def poisson_disc(p_dict, elem_time = 100):
    temp_dict = p_dict
    while temp_dict =={}:
        p = random.choice(list(temp_dict))
        around_p = ns_around_p(p, temp_dict)
        for cishu in range(elem_time):
            pd_p = random.choice(list(around_p))








# with open(r"//data/oregonf_TSNE_exponential_id_x_y_kde.csv") as f: