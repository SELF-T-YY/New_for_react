import community
import networkx as nx
import matplotlib.pyplot as plt

# temp_num = 5
# while(temp_num!=50):
G = nx.Graph()

fr_node = open("Data/textdata/text"+str(3)+"_nodes.csv","r")
# fr_node = open("Data/ori_nodes.csv","r")

nodes = []
edges = []
for line in fr_node:
    array = eval(line)
    nodes.append(array)
fr_node.close()
fr_edge = open("Data/textdata/text"+str(3)+"_edges.csv","r")
for line in fr_edge:
    array = eval(line)
    edges.append((array[0], array[1]))
fr_edge.close()
G.add_nodes_from(nodes)
G.add_edges_from(edges)

partition = community.best_partition(G)

max_num = 0
fw = open("Data/textdata/text"+str(2)+"_com.csv","w")
for key in partition.keys():
    max_num = max(max_num,partition.get(key))
    fw.writelines(str(key)+','+str(partition.get(key))+'\n')
print(max_num)
fw.close()
# temp_num += 5



