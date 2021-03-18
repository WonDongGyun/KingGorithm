# 원동균 / 4344 / 평균은 넘겠지

import sys

arr = []

def alg(numArr) :
    avgNum = 0
    sumNum = 0
    count = 0
    global arr

    for j in range(1, int(numArr[0]) + 1) :
        sumNum += int(numArr[j])

    avgNum = sumNum / int(numArr[0])

    for k in range(1, int(numArr[0]) + 1) :
        if int(numArr[k]) > avgNum :
            count += 1

    arr.append(round(count / int(numArr[0]) * 100, 3))


c = int(sys.stdin.readline())

for i in range (0, c) :
    n = sys.stdin.readline().split()
    alg(n)

for a in range(0, len(arr)) :
    print(format(arr[a], ".3f") + '%')
