# 원동균 / 11053 / 가장 긴 증가하는 부분 수열
import sys

n = int(sys.stdin.readline().split()[0])
a = list(map(int, sys.stdin.readline().split()))

memo = [1 for _ in range(n)]
for i in range(1, len(a)) :
    for j in range(0, i) :
        if a[j] < a[i] :
            memo[i] = max(memo[i], memo[j] + 1)

print(max(memo))