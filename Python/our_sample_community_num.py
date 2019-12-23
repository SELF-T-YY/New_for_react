import json

sample_rate = (5, 10, 15, 20, 25, 30, 35, 40)


print('-----------start--------------')


x = open(r'../data/community_id.json')
community_id = json.load(x)
x.close()
for rate in sample_rate:
    file_path = r'../data/oregonf/our_sample_community2/our_sample_a_1_b_9_rate_' \
                + str(rate) + '_community.json'

    file_write_path = r'../data/oregonf/our_sample_community_num2/our_sample_a_1_b_9_rate_'\
                      + str(rate) + '_community_num.json'

    with open(file_path) as f:
        json_dict = json.load(f)
        ans_dict = {}
        for i in json_dict:
            ans_dict[i] = len(json_dict[i])
    print(ans_dict)
    fw = open(file_write_path, 'w+')
    fw.write(json.dumps(ans_dict))
    fw.close()