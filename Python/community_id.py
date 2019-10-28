import json

ans = {}
for i in range(0, 34):
    # print(i)
    ans.update({i: []})
ans_ = {}
with open(r'E:\项目\New_for_react\data\oregonf_community.csv') as f:
    f.readline()
    while True:
        line = f.readline()
        if not line:
             break
        line = line.replace('\n', '').split(',')
        # print(line)
        ans_[line[1]] = ans[int(line[1])].append(line[0])
    fw = open('community_id.json', 'w+')
    ans_json = json.dumps(ans)
    fw.write(ans_json)