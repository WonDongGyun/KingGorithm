# 원동균 / 11651 / 좌표 정렬하기 2

import sys

# 람다는 신기한것 같다

arr = []
n = sys.stdin.readline().split()

for i in range(int(n[0])) :
    x, y = map(int, sys.stdin.readline().split())
    arr.append((x, y))

arr.sort(key = lambda x : (x[1], x[0]))

for i in arr :
    print(str(i[0]) + ' ' + str(i[1]))