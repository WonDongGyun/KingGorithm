# 원동균 / 27조 / 1149 / RGB거리
# RGB의 최단경로를 찾아봅시다.
# 어렵게 생각하지 말고, RGB의 최단경로를 한꺼번에 구해서 min()함수를 사용해 최소값을 구해봅시다.
# 집이 1채만 있다면, R, G, B 중에 최소값을 반환하면 됩니다.
# 만약 2채 이상있다면, 다음 집을 기준으로 그 집의 전집의 각각의 R, G, B 값을 더해서 메모이제이션에 넣습니다. (물론 인접한 집은 색깔이 겹치면 안됩니다.)
# 메모이제이션에  넣으면, 앞으로 연산할때 추가 연산 필요없이 해당 배열 위치의 값만 가지고 오면 뚝딱 만들 수 있습니다.

import sys

n = int(sys.stdin.readline().split()[0])
memo = [[0 for _ in range(3)] for _ in range(n)]

def alg(num, r, g, b) :
    
    if num == 1 :
        return min(memo[num - 1][0], memo[num - 1][1], memo[num - 1][2])
    for i in range(1, num) :
        memo[i][0] = min(memo[i - 1][1], memo[i - 1][2]) + memo[i][0]
        memo[i][1] = min(memo[i - 1][0], memo[i - 1][2]) + memo[i][1]
        memo[i][2] = min(memo[i - 1][0], memo[i - 1][1]) + memo[i][2]
        
        if i == num - 1 :
            return min(memo[i][0], memo[i][1], memo[i][2])

arr = []

for i in range(n) :
    red, green, blue = map(int, (sys.stdin.readline().split()))
    memo[i][0] = red
    memo[i][1] = green
    memo[i][2] = blue

print(alg(n, red, green, blue))