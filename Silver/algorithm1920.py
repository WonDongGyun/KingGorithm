# 원동균 / 1920 / 수 찾기

import sys

n = int(sys.stdin.readline().split()[0])
num1 = list(map(int, sys.stdin.readline().split()))
m = int(sys.stdin.readline().split()[0])
num2 = list(map(int, sys.stdin.readline().split()))

num1.sort()

for i in range(m) :
    l = 0
    r = len(num1) - 1
    ans = 0
    while l <= r :
        m = (l + r) // 2
        if num2[i] == num1[m] :
            ans = 1
            break
        if num2[i] < num1[m] :
            r = m - 1
        else : 
            l = m + 1
    print(ans)