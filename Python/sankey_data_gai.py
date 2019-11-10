import json



link_dict = {}
count = 0
with open(r'../data/sankey_data.json') as f:
    data_dict = json.load(f)
    for key_t in data_dict['top_community']:
        temp_top_id = data_dict['top_community'][key_t]['community_id']
        for key_b in data_dict['bottom_community']:
            temp_bottom_id = data_dict['bottom_community'][key_b]['community_id']
            if temp_bottom_id == temp_top_id:
                link_dict.update({count: {'source': key_t, 'target': key_b}})
                count += 1
    ans = {}
    ans.update({'nodes': data_dict, 'links': link_dict})

fw = open('../data/sankey_data_gai.json', 'w+')
json_str = json.dumps(ans, indent=2)
fw.write(json_str)