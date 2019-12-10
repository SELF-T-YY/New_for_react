import os
import json

sample_name = ('FF', 'ISRW', 'RNS', 'SRW', 'TIES')
sample_rate = ('5', '10', '15', '20', '25', '30', '35', '40')

print('----------start-----------')
for name in sample_name:
    for rate in sample_rate:
        file_name = 'oregonf_sample_tsne_' + name + '_' + rate + '_community_num_nodes_id.json'
        file_path = os.path.join(r'../data/oregonf/all_oregonf_rate_community//' + file_name)
        print(file_name)

        file_write_name = 'oregonf_sample_tsne_' + name + '_' + rate + '_community_num_for_sankey.json'
        file_write_path = os.path.join(r'../data/oregonf/all_oregonf_rate_community_num_for_sankey_gai//' + file_write_name)

        with open(r'../data/community_id.json') as f:
            community_id_json = json.load(f)
        with open(r'../data/community_num.json') as f:
            community_num_json = json.load(f)
        with open(file_path) as f:
            sample_community_num_nodes_id = json.load(f)
            ans_temp_dict = {}
            for sam_com_num_key in sample_community_num_nodes_id:
                san_com_num = sample_community_num_nodes_id[sam_com_num_key]
                nodes = san_com_num['nodes']
                # sample_num = san_com_num['num']
                community_belong = {}
                for com_num_key in community_id_json:
                    num = 0
                    for node in nodes:
                        if str(node) in community_id_json[com_num_key]:
                            num += 1
                    if num != 0:
                        community_belong[com_num_key] = {'num': num, '%': num/community_num_json[com_num_key]}
                ans_temp_dict[sam_com_num_key] = {'num': san_com_num['num'], 'community_belong': community_belong}
            ever_sample = []
            for i in range(0, 34):
                ever_sample.append(0)
            for sam_com_num_key in ans_temp_dict:
                sam_com_num = ans_temp_dict[sam_com_num_key]['community_belong']
                for i in sam_com_num:
                    ever_sample[int(i)] += sam_com_num[i]["%"]
                    if ever_sample[int(i)] > 1:
                        print('====================================')
            fw = open(file_write_path, 'w+')
            fw.write(json.dumps(ans_temp_dict))
            fw.close()
