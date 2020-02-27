import json

nodes = []
with open(r'../data/force_data_gai.json') as f:
    data_x_y = json.load(f)
    for key in data_x_y:
        node = {'id': key, 'x': data_x_y[key]['x'], 'y': data_x_y[key]['y']}
        nodes.append(node)
print(nodes)


edges = []
with open(r'../data/oregonf.csv') as f:
    f.readline()
    while True:
        line = f.readline()
        if not line:
            break
        line = line.replace('\n', '').split(',')
        edges.append({'source': line[0], 'target': line[1]})
print(edges)

ans_json = {'nodes': nodes, 'edges': edges}

fw = open(r'../data/force_data_nodes_edges.json', 'w+')
fw.write(json.dumps(ans_json))
fw.close()