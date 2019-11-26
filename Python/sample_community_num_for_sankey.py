import json
import os

sample_name = ('FF', 'ISRW', 'RNS', 'SRW', 'TIES')
sample_rate = ('5', '10', '15', '20', '25', '30', '35', '40')


print('----------start-----------')
for name in sample_name:
    for rate in sample_rate:
        file_name = 'oregonf_sample_tsne_' + name + '_' + rate + '_community_num_belong.json'
        file_path = os.path.join(r'../data/oregonf/all_oregonf_rate_community_num_belong//' + file_name)

        file_write_name = 'oregonf_sample_tsne_' + name + '_' + rate + '_community_num_for_sankey.json'
        file_write_path = os.path.join(r'../data/oregonf/all_oregonf_rate_community_num_for_sankey//' + file_write_name)

        with open(file_path) as f:
            community_belong_data = json.load(f)
            ans_data = {}
            for key in community_belong_data:
                all_nodes_num = community_belong_data[key]['num']
                temp_dict = {}
                for community_belong_key in community_belong_data[key]['community_belong']:
                    num = community_belong_data[key]['community_belong'][community_belong_key]['num']
                    temp_dict[community_belong_key] = {'num': num, '%': num/all_nodes_num}
                ans_data[key] = {'num': all_nodes_num, 'community_belong': temp_dict}
            fw = open(file_write_path, 'w+')
            fw.write(json.dumps(ans_data))
            fw.close()