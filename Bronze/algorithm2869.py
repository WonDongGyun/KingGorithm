# 원동균 / 2869 / 달팽이는 올라가고 싶다
# 등차수열 눈치 못채서 한참 해맸다

import sys 

a,b,v = sys.stdin.readline().split()
a = int(a)
b = int(b)
v = int(v)
count = ((v - a) /(a - b)) + 1
if (v - a) % (a - b) == 0 :
    count = ((v - a) /(a - b)) + 1
else :
    count = ((v - a) /(a - b)) + 2
print(int(count))