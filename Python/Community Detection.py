import community
import networkx as nx

# temp_num = 5
# while(temp_num!=50):
G = nx.Graph()

# fr_node = open("Data/textdata/text"+str(3)+"_nodes.csv", "r")
# fr_node = open("Data/ori_nodes.csv","r")

nodes = []
edges = []
with open(r'../data/oregonf.csv') as f:
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

G.add_nodes_from(nodes)
G.add_edges_from(edges)

partition = community.best_partition(G)

print(partition)

max_num = 0
fw = open(r'../data/oregonf_community.csv', 'w+')
for key in partition.keys():
    max_num = max(max_num,partition.get(key))
    fw.writelines(str(key)+','+str(partition.get(key))+'\n')
print(max_num)
fw.close()
# # temp_num += 5
#
#
#