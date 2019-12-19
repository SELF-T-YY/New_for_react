import json

sample_rate = (5, 10, 15, 20, 25, 30, 35, 40)


all_data_dict = json.load(open('../data/oregonf/force_data_nodes_edges.json'))

all_nodes_dict = json.load(open('../data/force_data_gai.json'))
all_edges_dict = all_data_dict['edges']


print('-----------start--------------')
for rate in sample_rate:
    # file_path = r'../data/oregonf/our_sample_gai/our_sample_gai_a_0.1_b_0.9_rata_' + str(rate) + '.json'
    # file_write_path = r'../data/oregonf/our_sample_nodes_edges/our_sample_a_0.1_b_0.9_rate_'\
    #                   + str(rate) + '_nodes_egdes.json'

    file_path = r'../data/oregonf/our_sample/oregonf_OUR_a_4_b_6_Rate_' + str(rate) + '.json'
    file_write_path = r'../data/oregonf/our_sample_nodes_edges/our_sample_a_4_b_6_rate_'\
                      + str(rate) + '_nodes_egdes.json'

    file_path = r'../data/cs/2.json'
    file_write_path = r'../data/cs/2_.josn'

    with open(file_path) as f:
        ans_nodes_list = []
        ans_edges_list = []

        nodes_list = json.load(f)
        for node in nodes_list:
            if node in all_nodes_dict:
                ans_nodes_list.append({'id': node, 'x': all_nodes_dict[node]['x'], 'y': all_nodes_dict[node]['y']})

        for edge in all_edges_dict:
            if edge['source'] in nodes_list and edge['target'] in nodes_list:
                ans_edges_list.append(edge)

        ans_dict = {'nodes': ans_nodes_list, 'edges': ans_edges_list}
    fw = open(file_write_path, 'w+')
    fw.write(json.dumps(ans_dict))
    fw.close()
    break