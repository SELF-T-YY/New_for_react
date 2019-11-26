import json
import os

sample_name = ('FF', 'ISRW', 'RNS', 'SRW', 'TIES')
sample_rate = ('5', '10', '15', '20', '25', '30', '35', '40')

print('----------start-----------')

with open(r'../data/community_id.json') as f:
    community_id_dict = json.load(f)

    for name in sample_name:
        for rate in sample_rate:
            file_name = 'oregonf_sample_tsne_' + name + '_' + rate + '_community_num_nodes_id.json'
            file_path = os.path.join(r'../data/oregonf/all_oregonf_rate_community//' + file_name)

            file_write_name = 'oregonf_sample_tsne_' + name + '_' + rate + '_community_num_belong.json'
            file_write_path = os.path.join(r'../data/oregonf/all_oregonf_rate_community_num_belong//' + file_write_name)

            with open(file_path) as f2:
                sample_community_node_id_dict = json.load(f2)
                ans_dict = {}
                for key_sample in sample_community_node_id_dict:
                    temp_dict = sample_community_node_id_dict[key_sample]
                    community_belong = {}
                    for key in community_id_dict:
                        # print(community_id_dict[key])
                        for node in temp_dict['nodes']:
                            if str(node) in community_id_dict[key]:
                                if key in community_belong:
                                    temp_list = community_belong[key]['nodes']
                                    temp_list.append(node)
                                    community_belong[key] = {'num': community_belong[key]['num'] + 1, 'nodes': temp_list}
                                else:
                                    temp_list = []
                                    temp_list.append(node)
                                    community_belong[key] = {'num': 1, 'nodes': temp_list}
                            # print(community_belong)
                        temp_dict['community_belong'] = community_belong
                    # print(temp_dict)
                    ans_dict[key_sample] = temp_dict
                fw = open(file_write_path, 'w+')
                fw.write(json.dumps(ans_dict))
                fw.close()
