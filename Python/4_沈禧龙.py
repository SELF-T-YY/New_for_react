import numpy as np


def f_write(filename, data_write):
    f = open(filename, 'w+')
    data_write = str(data_write)
    f.write(data_write)
    f.close()


def f_read(filename, num, elem_type):
    f = open(filename)
    temp = []
    count = 0
    ans = []
    data = f.read().split(',')
    for i in data:
        if num == count:
            ans.insert(len(ans), temp)
            count = 0
            temp =[]
        else:
            count += 1
            if elem_type == 'int':
                temp.append(int(i))
            elif elem_type == 'str':
                temp.append(str(i))
            elif elem_type == 'float':
                temp.append(float(i))
    return ans



data = '1,2,3,4,5,6,7,8,9,10,11,12,13'
flag = input('是否使用测试数据（Y/N）：')
if flag == 'N':
    data = input('输入测试数据：')
f_write(filename='1.txt', data_write=data)
input_num = input('维数：')
input_type = input('输入的数据类型（int，float，str）：')
data_read = f_read(filename='1.txt', num=int(input_num), elem_type=input_type)
# data_read = f_read('1.txt', 3, 'int')
print(data_read)