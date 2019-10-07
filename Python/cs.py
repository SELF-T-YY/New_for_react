import random
import json

with open(r'../data/oregonf_TSNE_exponential_id_x_y_kde.json') as f:
    ans_json = json.load(f)
    key_list = list(ans_json.keys())
    pd_p = random.choice(list(ans_json))
    print(pd_p)