import json


ans_dict = {}
with open(r'../data/oregonf_community.csv') as f:
    while True:
        line = f.readline()
        if not line:
            break
        line = line.replace('\n', '').split(',')
        if line[1] not in ans_dict:
            ans_dict[line[1]] = 1
        else:
            ans_dict[line[1]] = ans_dict[line[1]]+1
pass

fw = open(r'../data/community_num.json', 'w+')
ans_json = json.dumps(ans_dict)
fw.write(ans_json)


