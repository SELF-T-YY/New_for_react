import json

with open(r'../data/oregonf_TSNE_5000_id_x_y_kde.json') as f:
    data_dict = json.load(f)
    edges_dict = {}
    with open(r'../data/oregonf.csv') as f_edges:
        f_edges.readline()
        while True:
            line = f_edges.readline()
            if not line:
                break
            line = line.replace('\n', '').split(',')
            if line[0] in data_dict and line[1] in data_dict:
                if line[0] not in edges_dict:
                    edges_dict[line[0]] = list(line[1])
                else:
                    if line[1] not in edges_dict[line[0]]:
                        temp_list = edges_dict[line[0]]
                        temp_list.append(line[1])
                        edges_dict[line[0]] = temp_list
                if line[1] not in edges_dict:
                    edges_dict[line[1]] = list(line[0])
                else:
                    if line[0] not in edges_dict[line[1]]:
                        temp_list = edges_dict[line[1]]
                        temp_list.append(line[0])
                        edges_dict[line[1]] = temp_list
    for key in data_dict:
        temp_dict = data_dict[key]
        temp_dict.update({"edges": edges_dict[key]})
        data_dict[key] = temp_dict
    print(data_dict)
    f_file = open(r'../data/oregonf_tsne_5000_addedges.json', 'w+')
    ans_json = json.dumps(data_dict)
    f_file.write(ans_json)