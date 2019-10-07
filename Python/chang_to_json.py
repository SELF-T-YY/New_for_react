import random
import json


ans_dict = {}
with open(r"../data/oregonf_TSNE_5000_id_x_y_kde.csv") as f:
    f.readline()
    while True:
        line = f.readline()
        if not line:
            break
        ans = line.replace('\n', '').split(',')
        ans_dict.update({ans[0]: {'id': ans[0], 'x': ans[1], 'y': ans[2], 'kde': ans[3]}})
    pass
    f_file = open(r'../data/oregonf_TSNE_5000_id_x_y_kde.json', 'w+')
    ans_json = json.dumps(ans_dict)
    f_file.write(ans_json)


        