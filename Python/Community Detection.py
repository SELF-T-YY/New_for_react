from community import community_louvain as community
import networkx as nx
import json

G = nx.Graph()

nodes = []
edges = []
with open(r'../data/cit-HepTh/CH_re_gai_TRUE.csv') as f:
    f.readline()
    while True:
        line = f.readline()
        if not line:
            break
        line = line.replace('\n', '').split(',')
        if line[0] not in nodes:
            nodes.append(line[0])
        if line[1] not in nodes:
            nodes.append(line[1])
        edges.append((line[0], line[1]))
pass

# print(edges)
G.add_nodes_from(nodes)
G.add_edges_from(edges)


partition = community.best_partition(G)

print(partition)

max_num = 0
fw = open(r'../data/cit-HepTh/CH_community.json', 'w+')
# for key in partition.keys():
#     max_num = max(max_num, partition.get(key))
#     fw.writelines(str(key)+','+str(partition.get(key))+'\n')
# print(max_num)
fw.write(json.dumps(partition))

fw.close()
