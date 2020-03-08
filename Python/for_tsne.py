#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/1/20 21:16
# @Author  : SELF-T-YY
# @Site    : 
# @File    : for_tsne.py
# @Software: PyCharm

import numpy
import csv
from sklearn.manifold import TSNE
numpy.set_printoptions(threshold=numpy.inf)

position = 'cit-HepTh'
file_name = 'CH'
file_path = r'../data/' + position + '/' + file_name + '.txt'
file_write_path = r'../data/' + position + '/' + file_name + '_Tsne.csv'

print('file_path:   {}'.format(file_path))
print('file_write_path:   {}'.format(file_write_path))

ans = TSNE(metric='cosine', method='barnes_hut', angle=0.2, n_iter=2000, n_components=2)
with open(file_path) as f:
    a = -1
    y_list = []
    while True:
        lines = f.readline().replace('\n', '')
        a += 1
        if not lines:
            break
            pass
        if a == 0:
            continue
        x_list = lines.split(' ')
        y_list.append(x_list[0])
        x_list.remove(x_list[0])
        if a == 1:
            x_array = numpy.array(x_list)
        else:
            b_array = numpy.array(x_list)
            x_array = numpy.vstack((x_array, b_array))
        print(a)
    x_tsne = ans.fit_transform(x_array)
    f = open(file_write_path, 'a', newline='')

    csv_write = csv.writer(f, dialect='excel')
    a=0
    for i in x_tsne:
        x = [y_list[a], i[0], i[1]]
        a += 1
        print(a)
        csv_write.writerow(x)
    print("write over")