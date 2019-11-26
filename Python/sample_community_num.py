import json
import os

sample_name = ('FF', 'ISRW', 'RNS', 'SRW', 'TIES')
sample_rate = ('5', '10', '15', '20', '25', '30', '35', '40')

print('----------start-----------')

with open('../data/community_id.json') as f2:
    community_dict = json.load(f2)

    for name in sample_name:
        for rate in sample_rate:
            file_name = 'oregonf_sample_tsne_' + name + '_' + rate + '_nodes_edges.json'
            file_path = os.path.join(r'../data/oregonf/all_oregonf_rate//' + file_name)

            file_write_name = 'oregonf_sample_tsne_' + name + '_' + rate + '_community_num.json'
            file_write_path = os.path.join(r'../data/oregonf/all_oregonf_rate_community_num//' + file_write_name)

            print(file_name)

            with open(file_path) as f:
                nodes = json.load(f)['nodes']

                community_num = {}
                for key in community_dict:
                    for node in nodes:
                        # print(community_dict[key])
                        if str(node['id']) in community_dict[key]:
                            if key in community_num:
                                community_num[key] = community_num[key] + 1
                            else:
                                community_num[key] = 1
                fw = open(file_write_path, 'w+')
                fw.write(json.dumps(community_num))
                fw.close()
    #             print(community_num)
    #     break
    # break

