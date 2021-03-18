# 원동균 / 2164 / 카드2

import sys
from collections import deque

n = int(sys.stdin.readline().split()[0])

card = deque()
for i in range(1, n+1) :
    card.append(i)

num = 0
while len(card) != 1 :
    if num == 0 :
        card.popleft()
        num += 1
    elif num % 2 != 0 :
        card.rotate(-1)
        num += 1
    else :
        card.popleft()
        num += 1  

print(card[0])      