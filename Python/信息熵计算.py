import os
import json
import math

sample_name = ('FF', 'ISRW', 'RNS', 'SRW', 'TIES')
sample_rate = ('5', '10', '15', '20', '25', '30', '35', '40')

print('----------start-----------')
# for name in sample_name:
for i in range(1):
    for rate in sample_rate:
        a = 4
        b = 10 - a
        # file_name = 'oregonf_sample_tsne_' + name + '_' + rate + '_community_num_for_sankey.json'
        # file_path = os.path.join(r'../data/oregonf/all_oregonf_rate_community_num_for_sankey_gai//' + file_name)
        file_path = r'../data/oregonf/our_sample_community_num_for_sankey/oregonf_OUR_a_' + str(a) + '_b_' + str(b) \
                          + '_Rate_' + str(rate) + '_for_sankey.json'

        # print(file_name)

        file_write_path = r'../data/oregonf/our_sample_community_HX/oregonf_OUR_a_'\
                          + str(a) + '_b_' + str(b) + '_Rate_' + str(rate) + '_for_sankey_HX.json'
        with open(file_path) as f:
            community_sample_dict = json.load(f)
            ans_dict = {}
            for community_sample_key in community_sample_dict:
                sample_num = community_sample_dict[community_sample_key]['num']
                sample_community_belong = community_sample_dict[community_sample_key]['community_belong']
                for i in sample_community_belong:
                    px = sample_community_belong[i]['%']
                    temp = math.log2(px) * px
                    if i in ans_dict:
                        ans_dict[i] = ans_dict[i] + temp
                    else:
                        ans_dict[i] = temp
            for i in ans_dict:
                ans_dict[i] = -ans_dict[i]
            fw = open(file_write_path, 'w+')
            fw.write(json.dumps(ans_dict))
            fw.close()