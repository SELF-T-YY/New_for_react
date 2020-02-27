import json

position = 'SW-10000-5-0d3-trial3'
file_name = 'SW'
file_path = r'../data/' + position + '/' + file_name + '_id_x_y_kde.json'
file_write_path = r'../data/' + position + '/' + file_name + '_id_x_y_kde_edges.json'

re_file_name = r'E:\Project\New_for_react\data\SW-10000-5-0d3-trial3\SW-10000-5-0d3-trial3.edges'


print('file_path:   {}'.format(file_path))
print('file_write_path:   {}'.format(file_write_path))

with open(file_path) as f:
    data_dict = json.load(f)
    edges_dict = {}
    betweenness_dict = {}
    with open(re_file_name) as f_edges:
        f_edges.readline()
        f_edges.readline()
        while True:
            line = f_edges.readline()
            if not line:
                break
            line = line.replace('\n', '').split(' ')
            if line[0] in data_dict and line[1] in data_dict:
                if line[0] not in edges_dict:
                    edges_dict[line[0]] = list([line[1]])
                    betweenness_dict[line[0]] = 1
                else:
                    if line[1] not in edges_dict[line[0]]:
                        temp_list = edges_dict[line[0]]
                        temp_list.append(line[1])
                        edges_dict[line[0]] = temp_list
                        betweenness_dict[line[0]] = betweenness_dict[line[0]]+1

                if line[1] not in edges_dict:
                    edges_dict[line[1]] = list([line[0]])
                    betweenness_dict[line[1]] = 1
                else:
                    if line[0] not in edges_dict[line[1]]:
                        temp_list = edges_dict[line[1]]
                        temp_list.append(line[0])
                        edges_dict[line[1]] = temp_list
                        betweenness_dict[line[1]] = betweenness_dict[line[1]] + 1
    for key in data_dict:
        temp_dict = data_dict[key]
        if key not in edges_dict:
            edges_dict[key] = []
        temp_dict.update({"edges": edges_dict[key]})
        data_dict[key] = temp_dict
    print(data_dict)
    # print(data_dict)
    f_file = open(file_write_path, 'w+')
    ans_json = json.dumps(data_dict)
    f_file.write(ans_json)