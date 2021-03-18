# 원동균 / 10815 / 숫자 카드

import sys

n = int(sys.stdin.readline().split()[0])
num1 = list(map(int, sys.stdin.readline().split()))
m = int(sys.stdin.readline().split()[0])
num2 = list(map(int, sys.stdin.readline().split()))

num1.sort()

arr = []

for i in range(m) :
    L = 0
    R = n-1
    middle = (L + R) // 2

    while L <= R :
        if num1[middle] == num2[i] :
            arr.append('1')
            break
        elif num1[middle] > num2[i] :
            R = middle - 1
            middle = (L + R) // 2

        else :
            L = middle + 1
            middle = (L + R) // 2

    if num1[middle] != num2[i] :
        arr.append('0')
        continue

print(' '.join(arr))