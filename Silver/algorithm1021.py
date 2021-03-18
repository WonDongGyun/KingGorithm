# 원동균 / 1021 / 회전하는 큐
# L값은 0 고정이지만, R값은 변동된다! 데크의 크기가 조정되기 때문에


import sys
from collections import deque

n, m = map(int, sys.stdin.readline().split())
choiceNum = list(map(int, sys.stdin.readline().split()))
algoDeq = deque()

L = 0
count = 0
for i in range(1, n + 1) :
    algoDeq.append(i)

for i in choiceNum :
    R = len(algoDeq)

    if i != algoDeq[0] :
        left = L + algoDeq.index(i)
        right = R - algoDeq.index(i)

        if left <= right : 
            while i != algoDeq[0] :
                algoDeq.rotate(-1)
                count += 1
            if i == algoDeq[0] :
                algoDeq.popleft()
        else :
            while i != algoDeq[0] :
                algoDeq.rotate(1)
                count += 1
            if i == algoDeq[0] :
                algoDeq.popleft()
    else :
        algoDeq.popleft()

print(count)