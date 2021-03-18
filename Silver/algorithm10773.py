# 원동균 / 27조 / 10773
# 스택의 원리를 이용하셔서 구현하시면 됩니다~

import sys

n = int(sys.stdin.readline().split()[0])
stack = []

for i in range(n) :
    k = int(sys.stdin.readline().split()[0])
    
    if k == 0 :
        stack.pop()
    else :
        stack.append(k)

num = 0
if len(stack) > 0 :
    for i in stack :
        num += i
    print(num)
else :
    print(0)