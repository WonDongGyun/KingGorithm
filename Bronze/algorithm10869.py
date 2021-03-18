# 원동균 / 10869 / 사칙연산

import sys
def alg(a,b) :
    print(a+b)
    print(a-b)
    print(a*b)
    print(a//b)
    print(a%b)

a = sys.stdin.readline().split()
alg(int(a[0]), int(a[1]))
