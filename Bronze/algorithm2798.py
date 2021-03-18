# 원동균 / 27조 / 2798
# 브루트포스 알고리즘를 사용해서 쉽게 풀어 봅시다.
# 브루트포스는 쉽게 말하면 전부 뒤져보는 방식입니다.
# 중간에 조건을 줘서 탈출할 수 있게 만들어주면 더 좋겠죠?
# 내림차순 정렬을 해서 오름차순으로 정렬했을 때 보다 더 빠르게 maxNum을 찾을 수 있습니다.

import sys

n, m = list(map(int, sys.stdin.readline().split()))
cardArr = list(map(int,sys.stdin.readline().split()))
cardArr.sort(reverse = True)

def alg(cardArr) :
    maxNum = 0

    for i in range(len(cardArr)):
        for j in range(i + 1, len(cardArr)):
            for k in range(j + 1, len(cardArr)):
                blackJ = cardArr[i] + cardArr[j] + cardArr[k]
                if blackJ <= m and maxNum < blackJ :
                    maxNum = blackJ
                if blackJ < maxNum :
                    break
            
    return maxNum

print(alg(cardArr))
