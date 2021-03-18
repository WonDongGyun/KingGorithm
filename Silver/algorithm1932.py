# 원동균 / 27조 / 1932
# 삼각형의 최대 합은 무엇일까요?
# 먼저 맨 위의 값은 그대로 둡시다.
# 그 다음 행 부터 memoL과 memoR을 선언하여 최대값을 찾고, 그 최대값을 해당 삼각형의 위치에 저장합니다.
# 왜냐하면 3 8 다음 행의 8 1 0 에서 1의 경우 7 + 3 + 1의 값을 갖을 수도 있고, 7 + 8 + 1의 값을 갖을 수도 있기 때문입니다.
# 이것을 반복해서 메모이제이션 배열인 memo[]에 저장해 주면 끝~

import sys

n = int(sys.stdin.readline().split()[0])
memo = [[0 for _ in range(n)] for _ in range(n)]

def alg(num) :
    for i in range(num) :
        for j in range(i + 1) :
            if i > 0 :
                if j == 0 :
                    memo[i][j] = memo[i - 1][0] + memo[i][j]
                else :
                    memoL = memo[i - 1][j - 1] + memo[i][j]
                    memoR = memo[i - 1][j] + memo[i][j]
                    memo[i][j] = max(memoL, memoR)
    return max(memo[num-1])
            



for i in range(n) :
    tri = list(map(int, (sys.stdin.readline().split())))
    if i == 0 :
        memo[i][0] = tri[0]
        continue
    for j in range(i + 1) :
        memo[i][j] = tri[j]

print(alg(n))
