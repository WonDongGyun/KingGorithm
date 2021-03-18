# 원동균 / 27조 / 11047
# 그리디 알고리즘은 매 순간의 최적 값을 찾는 알고리즘입니다.
# while 문을 통해 money값이 0보다 클때만 돌립니다.
# 안쪽에서 반복문을 통해 돈과 coinArr[]과 요소들의 차이중에 가장 큰 차이를 내는 값을 찾고, 그 값으로 돈을 나눈 몫만큼 카운트에 증가시킵니다.
# 돈의 값은 찾은 최저값과 연산하여 초기화 시킵니다.

import sys

def alg(k, coinArr) :
    money = k
    minMon = k
    maxCoin = 0
    cnt = 0
    while money > 0 :
        for i in range(len(coinArr)) :
            if money - coinArr[i] < 0 :
                break

            if money - coinArr[i] < minMon :
                minMon = money - coinArr[i]
                maxCoin = coinArr[i]

        cnt += (money // maxCoin)
        money = money - (maxCoin * (money // maxCoin))

    return cnt

n, k = map(int, sys.stdin.readline().split())
arr = []

for i in range(n) :
    coin = int(sys.stdin.readline().split()[0])
    arr.append(coin)

print(alg(k, arr))