import json

sample_rate = (5, 10, 15, 20, 25, 30, 35, 40)


all_data_dict = json.load(open('../data/oregonf/force_data_nodes_edges.json'))

all_nodes_dict = json.load(open('../data/force_data_gai.json'))
all_edges_dict = all_data_dict['edges']


print('-----------start--------------')
for rate in sample_rate:

    file_path = r'../data/oregonf/our_sample/oregonf_OUR_a_4_b_6_Rate_' + str(rate) + '.json'
    file_write_path = r'../data/oregonf/our_sample_nodes_edges3/our_sample_a_4_b_6_rate_'\
                      + str(rate) + '_nodes_egdes.json'


    with open(file_path) as f:
        ans_nodes_list = []
        ans_edges_list = []

        nodes_list = json.load(f)

        for edge in all_edges_dict:
            if edge['source'] in nodes_list and edge['target'] in nodes_list:
                ans_edges_list.append(edge)
                node1 = edge['source']
                node2 = edge['target']
                if node1 in all_nodes_dict:
                    ans_nodes_list.append({'id': node1, 'x': all_nodes_dict[node1]['x'], 'y': all_nodes_dict[node1]['y']})
                if node2 in all_nodes_dict:
                    ans_nodes_list.append({'id': node2, 'x': all_nodes_dict[node2]['x'], 'y': all_nodes_dict[node2]['y']})

        ans_dict = {'nodes': ans_nodes_list, 'edges': ans_edges_list}
    fw = open(file_write_path, 'w+')
    fw.write(json.dumps(ans_dict))
    fw.close()
