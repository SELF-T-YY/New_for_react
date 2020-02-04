import json

with open(r'../data/fb-pages-public-figure/fppf_id_x_y_kde.json') as f:
    data_dict = json.load(f)
    edges_dict = {}
    betweenness_dict = {}
    with open(r'../data/fb-pages-public-figure/fb-pages-public-figure.edges.txt') as f_edges:
        while True:
            line = f_edges.readline()
            if not line:
                break
            line = line.replace('\n', '').split(',')
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
    f_file = open(r'../data/fb-pages-public-figure/fppf_id_x_y_kde_edges.json', 'w+')
    ans_json = json.dumps(data_dict)
    f_file.write(ans_json)