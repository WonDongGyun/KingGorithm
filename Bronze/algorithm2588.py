# 원동균 / 2588 / 곱셈

import sys

def alg(a,b) :
    print(a * (b % 100 % 10))
    print(a * (b % 100 // 10))
    print(a * (b // 100))
    print(a * b)

a = int(sys.stdin.readline())
b = int(sys.stdin.readline())

alg(a,b)
