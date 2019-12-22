import json

sample_rate = (5, 10, 15, 20, 25, 30, 35, 40)

for rate in sample_rate:
    a = 4
    b = 10 - a
    file_path = r'../data/oregonf/our_sample/oregonf_OUR_a_' + str(a) + '_b_' + str(b) + '_Rate_' + str(rate) + '.json'
    file_write_path = r'../data/oregonf/our_sample_community_num_for_sankey/oregonf_OUR_a_' + str(a) + '_b_' + str(b) \
                      + '_Rate_' + str(rate) + '_for_sankey.json'

    f1 = open('../data/community_id.json')
    community_id_dict = json.load(f1)
    f1.close()

    with open(file_path) as f:
        data_json = json.load(f)
        nodes = list(data_json.keys())
        temp = {}
        for i in community_id_dict:
            count = 0
            for node in nodes:
                if node in community_id_dict[i]:
                    count += 1
            per = count / len(community_id_dict[i])
            if count != 0:
                temp[i] = {'num': count, 'community_belong': {i: {"num": count, '%': per}}}

    fw = open(file_write_path, 'w+')
    fw.write(json.dumps(temp))
    fw.close()
