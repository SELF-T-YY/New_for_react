import json

sample_rate = (5, 10, 15, 20, 25, 30, 35, 40)


print('-----------start--------------')
for rate in sample_rate:
    rate = 15
    file_path = r'../data/oregonf/our_sample_community/our_sample_a_0.1_b_0.9_rate_' + str(rate) + '_community.json'
    file_write_path = r'../data/oregonf/our_sample_community_num_for_sankey_gai/our_sample_a_0.1_b_0.9_rate_'\
                      + str(rate) + '_community_for_sankey.json'
    with open(file_path) as f:
        node_community = json.load(f)
        community_dict = {}
        for node in node_community:
            if str(node_community[node]) not in community_dict:
                temp = [node]
                community_dict[str(node_community[node])] = {'num': 1, 'nodes': temp}
            else:
                temp = community_dict[str(node_community[node])]['nodes']
                temp.append(node)
                temp_num = community_dict[str(node_community[node])]['num'] + 1
                community_dict[str(node_community[node])] = ({'num': temp_num, 'nodes': temp})

        print(community_dict)


    break