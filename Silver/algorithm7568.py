# 원동균 / 7568 / 덩치

import sys

n = int(sys.stdin.readline().split()[0])

arr = []
rankArr = [1 for _ in range(n)]
for i in range(0, n):
    x, y = list(map(int, sys.stdin.readline().split()))
    arr.append((x, y))


for i in range(n):
    k = 1
    minW = arr[i][0]
    minH = arr[i][1]
    for j in range(n):
        if arr[j][0] > arr[i][0] and arr[j][1] > arr[i][1]:
            k += 1
            rankArr[i] = k
        elif arr[j][0] < arr[i][0] and arr[j][1] < arr[i][1]:
            minW = arr[j][0]
            minH = arr[j][1]
            if (arr[j][0] >= minW and arr[j][1] <= minH) or (arr[j][0] <= minW and arr[j][1] >= minH):
                rankArr[j] = rankArr[j]
            else:
                k += 1
                rankArr[j] = k

print(' '.join(map(str, rankArr)))
