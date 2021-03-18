# 원동균 / 27조 / 18258 / 큐 2
# collections의 deque를 사용해 큐를 사용하고 기본 기능을 구현해 봅시다.

import sys
from collections import deque

def alg(wordArr) :
    if len(wordArr) == 2 :
        q.append(wordArr[1])
    else :
        if wordArr[0] == 'pop' :
            if len(q) > 0 :
                print(q.popleft())
            else :
                print(-1)
        elif wordArr[0] == 'size' :
            print(len(q))   
        elif wordArr[0] == 'empty' :
            if len(q) > 0 :
                print(0)
            else :
                print(1)              
        elif wordArr[0] == 'front' :
            if len(q) > 0 :
                print(q[0])
            else :
                print(-1)
        else :
            if len(q) > 0 :
                print(q[-1])
            else :
                print(-1)

n = int(sys.stdin.readline().split()[0])
q = deque()

for i in range(n) :
    x = list((sys.stdin.readline().split()))
    alg(x)