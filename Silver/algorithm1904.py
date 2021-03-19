# 원동균 / 1904 / 01타일

import sys

n = int(sys.stdin.readline().split()[0])
memo = [0 for _ in range(1000001)]

memo[0] = 1
memo[1] = 1

for i in range(2, n + 1):
    memo[i] = (memo[i - 2] + memo[i - 1]) % 15746

print(memo[n])
