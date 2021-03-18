# 원동균 / 1712 / 손익분기점
import sys

a, b, c = map(int, sys.stdin.readline().split())

if b >= c :
    print(-1)
else :
    print(a // (c-b) + 1)