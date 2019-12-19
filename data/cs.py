import json
import matplotlib.pyplot as plt  # 绘图库


nodes = []
edges = []
x = []
y = []
with open(r'../data/cs/2_.josn') as f:
    nodes_edges_dict = json.load(f)

    # print(nodes_edges_dict)
    nodes_list_all = nodes_edges_dict["nodes"]
    edges_list_all = nodes_edges_dict['edges']
    for node in nodes_list_all:
        nodes.append(node['id'])
        x.append(node['x'])
        y.append(node['y'])

    fig = plt.figure()
    ax = plt.subplot()
    ax.scatter(x, y, s=0.1, alpha=0.5)
    plt.show()