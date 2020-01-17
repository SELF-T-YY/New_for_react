#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/1/14 17:58
# @Author  : SELF-T-YY
# @Site    :
# @File    : 灵敏度分析——测试.py
# @Software: PyCharm

import numpy as np
import scipy as sp
from scipy.optimize import leastsq
import matplotlib.pyplot as plt


m = 1

x = np.linspace(-2.0, 2.0, 11)
y = np.array([-6309, -5301, -4102, -2722, -1629, -264, 1117, 2499, 3852, 4863, 5924])


# 线性拟合


def func(p, x):
    k, b = p
    return k * x + b


def error(p, x, y):
    return func(p, x) - y


p0 = [0, 0]

para = leastsq(error, p0, args=(x, y))
k, b = para[0]

# 计算线性度Ln=(平均值与拟合直线之间最大偏差/满量程理论输出值)
Ln = max(abs(y - (k * x + b))) / max(abs(y))
print('线性度为%.4f%%' % Ln)

# 计算灵敏度：输出变化量/输入变化量
# 对y求一阶差分
dy = np.array([(y[i + 1] - y[i]) for i in range(len(y) - 1)])
Q1 = para[0][0]
Q2 = dy.mean() / 0.4
print('Q1 = %.4f \nQ2 = %.4f' % (Q1, Q2))


plt.scatter(x, y, color="red", label="Sample Point", linewidth=3)
xi = np.linspace(-2, 2, 1000)
yi = k * xi + b
plt.plot(xi, yi, color="blue", label="Fitting Line", linewidth=2)
plt.legend()
plt.show()
