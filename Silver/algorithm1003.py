# 원동균 / 1003 / 피보나치 함수

import sys

n = int(sys.stdin.readline().split()[0])
arr = []
memo = {0 : 0, 1 : 1}

def fibonacci(number) :
    global memo
    if number in memo :
        return memo[number]
    fib = fibonacci(number - 1) + fibonacci(number - 2)
    memo[number] = fib
    return fib

for _ in range(n) :
    cnt = int(sys.stdin.readline().split()[0])
    if cnt == 0 :
        arr.append([1, 0])
    else:
        arr.append([fibonacci(cnt - 1), fibonacci(cnt)])

for i in arr :
    print(i[0], i[1])
