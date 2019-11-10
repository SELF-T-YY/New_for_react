import json

ans = {}
# ans = {"top_community", "bottom_community"}
with open('../data/community_num.json') as f:
    datas = json.load(f)
    for key in datas:
        if 'top_community' in ans:
            ans['top_community'].update({key: {"community_node_num": datas[key], "community_id": key}})
        else:
            ans['top_community'] = {key: {"community_node_num": datas[key], "community_id": key}}
        if 'bottom_community' in ans:
            ans['bottom_community'].update({key: {"community_node_num": datas[key], "community_id": key}})
        else:
            ans['bottom_community'] = {key: {"community_node_num": datas[key], "community_id": key}}
fw = open(r'../data/sankey_data.json', 'w+')
json_str = json.dumps(ans, indent=4)
fw.write(json_str)