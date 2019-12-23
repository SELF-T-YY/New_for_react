import json

sample_rate = (5, 10, 15, 20, 25, 30, 35, 40)


print('-----------start--------------')


x = open(r'../data/community_id.json')
community_id = json.load(x)
x.close()
for rate in sample_rate:
    file_path = r'../data/oregonf/our_sample_community2/our_sample_a_4_b_6_rate_' \
                + str(rate) + '_community.json'
    file_write_path = '../data/oregonf/our_sample_community_num_for_sankey2/oregonf_OUR_a_4_b_6_Rate_' \
                      + str(rate) + 'for_sankey.json'

    with open(file_path) as f:
        data_json = json.load(f)
        ans_dict = {}
        for i in data_json:
            num = len(data_json[i])
            community_belong = {}
            for j in community_id:
                count = 0
                for node in data_json[i]:
                    if node in community_id[j]:
                        count += 1
                if count != 0:
                    community_belong[j] = {'num': count, '%': count/len(community_id[j])}
            ans_dict[i] = {'num': num, 'community_belong': community_belong}
        # print(ans_dict)
    fw = open(file_write_path, 'w+')
    fw.write(json.dumps(ans_dict))
    fw.close()