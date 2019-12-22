import numpy as np  # 数据结构
import sklearn.cluster as skc  # 密度聚类
from sklearn import metrics   # 评估模型
import matplotlib.pyplot as plt  # 可视化绘图
import json


with open(r'../data/cs/2_.josn') as f:
    nodes_edges_dict = json.load(f)

    datas = []
    ids = []

    nodes_list_all = nodes_edges_dict["nodes"]
    edges_list_all = nodes_edges_dict['edges']
    for node in nodes_list_all:
        ids.append(node['id'])
        datas.append([node['x'], node['y']])

    X = np.array(datas)

    eps = 19
    db = skc.DBSCAN(eps=eps, min_samples=2).fit(X)
    labels = db.labels_


    # print(X[labels])
    n_clusters_ = len(set(labels)) - (1 if -1 in labels else 0)  # 获取分簇的数目

    ans_dict = {}
    for i in range(n_clusters_):
        temp_dict = []
        for lb in range(len(labels)):
            if labels[lb] == i:
                # ans = {int(ids[lb][0]): {"x": datas[lb][0], "y": datas[lb][1], "kde": ids[lb][1]}, }
                temp_dict.append(ids[lb])
            pass
        pass
        ans_dict.update({i: temp_dict})

    print(ans_dict)

    # f_json = open("dbscan_id_x_y_cbj.json", "w+")
    # json_str = json.dumps(ans_dict)
    # f_json.write(json_str)

    print('每个样本的簇标号:')
    print(labels)

    raito = len(labels[labels[:] == -1]) / len(labels)  #计算噪声点个数占总数的比例
    print('噪声比:', format(raito, '.2%'))

    n_clusters_ = len(set(labels)) - (1 if -1 in labels else 0)  # 获取分簇的数目

    print('分簇的数目: %d' % n_clusters_)
    print("轮廓系数: %0.3f" % metrics.silhouette_score(X, labels)) #轮廓系数评价聚类的好坏

    # for i in range(n_clusters_):
    #     # print('簇 ', i, '的所有样本:')
    #     one_cluster = X[labels == i]
    #     # print(one_cluster)
    #     plt.plot(one_cluster[:, 0], one_cluster[:, 1], 	"o", markersize=1)
    #
    # # file_name = str(eps)+'___' + str(n_clusters_) +".png"
    # #     plt.savefig(file_name)
    #     plt.show()