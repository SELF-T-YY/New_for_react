#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/1/20 23:08
# @Author  : SELF-T-YY
# @Site    : 
# @File    : FileWrite.py
# @Software: PyCharm

import json


def FileWrite_forJson(openFile, data):
    fw = open(openFile, 'w+')
    fw.write(json.dumps(data))
    fw.close()