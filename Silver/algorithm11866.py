# 원동균 / 27조 / 11866
# 요세푸스 문제는 입력받은 사람의 수만큼 차례대로 큐에 넣고, k 번째 사람을 지워나가는 문제입니다.
# 쉽게 하는 방법은 rotate() 사용해서 -(k - 1)만큼 돌려서 나온 첫번째 q의 데이터를 popleft() 시키는 것입니다.
# rotate는 -일때 왼쪽으로 하나씩 움직입니다.

import sys
from collections import deque
 
n, k = list(map(int, sys.stdin.readline().split()))
q = deque()
arr = []
for i in range(1, n + 1) :
    q.append(i)

def alg(k) :
    if k > 1 :
        while q :
            q.rotate(-(k - 1))
            num = q.popleft()
            arr.append(num)
    else :
        while q :
            num = q.popleft()
            arr.append(num)       

alg(k)

for i in range(0, len(arr)) :
    if i == 0 and len(arr) == 1 : 
        print('<' + str(arr[i]) + '>')
    elif i ==  0:
        print('<' + str(arr[i]), end = ', ') 
    elif i == len(arr) - 1 :
        print(str(arr[i]) + '>', sep = '\n') 
    else :
        print(str(arr[i]), end = ', ') 
