import csv

ansDict = {}
with open(r'../data/cit-HepTh/原始数据/cit-HepTh-dates.txt/Cit-HepTh-dates.txt') as f:
    f.readline()
    while True:
        line = f.readline()
        if not line:
            break
        line = line.replace('\n', '').split('\t')
        year = int(line[1].split('-')[0])

        nodeID = str(int(line[0]))

        if list(nodeID)[0] == '1' and list(nodeID)[1] == '1':
            # print(nodeID, end='------')
            nodeID = ''.join(list(nodeID)[2:])
            # print(nodeID)

        if year >= 1990:
            ansDict[nodeID] = line[1]
    # print(ansDict)
    print(len(ansDict.keys()))
with open(r'../data/cit-HepTh/Cit-HepTh.txt') as f:
    for _ in range(0, 4):
        f.readline()
    edgesList = []
    nodesList = []
    while True:
        line = f.readline()
        if not line:
            break
        line = line.replace('\n', '').split('\t')
        # print(ansDict)
        if line[0] in ansDict and line[1] in ansDict:
            edgesList.append(line)
            nodesList.append(line[0])
            nodesList.append(line[1])
    nodesList = set(nodesList)
    # print(edgesList)
    print(len(edgesList))
    print(len(nodesList))

    with open(r'../data/cit-HepTh/CH_re.csv', 'w+', newline='') as fw:
        writer = csv.writer(fw, dialect='excel')
        for i in edgesList:
            writer.writerow(i)

