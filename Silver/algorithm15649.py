# 원동균 / 15649 / 	N과 M (1)

import sys
from itertools import permutations

n, m = list(map(int, sys.stdin.readline().split()))
arr = []
for i in range(1, n + 1) :
    arr.append(i)

pm = permutations(arr, m)

for i in pm :
    for j in range(m) :
        if j < m - 1 :
            print(i[j], end = ' ')
        else :
            print(i[j], sep = '\n')
