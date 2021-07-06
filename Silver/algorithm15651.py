# 원동균 / 15651 / N과 M (3)

import sys
from itertools import product

n, m = list(map(int, sys.stdin.readline().split()))
arr = []

for i in range(1, n + 1):
    arr.append(i)

pm = product(arr, repeat=m)

for i in pm:
    for j in range(len(i)):
        if j != len(i) - 1:
            print(i[j], end=' ')
        else:
            print(i[j], sep='\n')
