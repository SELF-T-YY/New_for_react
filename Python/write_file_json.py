import json


def write_json(path, data):
    f_file = open(path, 'w+')
    ans_json = json.dumps(data)
    f_file.write(ans_json)

