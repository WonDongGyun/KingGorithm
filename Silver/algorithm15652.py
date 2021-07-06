# 원동균 / 15651 / N과 M (4)

import sys
from itertools import combinations_with_replacement

n, m = list(map(int, sys.stdin.readline().split()))
arr = []

for i in range(1, n + 1):
    arr.append(i)

cm = combinations_with_replacement(arr, m)

for i in cm:
    for j in range(len(i)):
        if j != len(i) - 1:
            print(i[j], end=' ')
        else:
            print(i[j], sep='\n')
