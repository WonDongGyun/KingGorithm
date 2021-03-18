# 원동균 / 27조 /1436 / 신나는 함수 실행
# 파이썬 3차원 배열을 사용하는 방법을 배워봅시다.
# 일반적으로 numpy라는 애를 사용하는데, 알고리즘 시험에서는 못 사용하는 라이브러리 입니다.
# 그래서 메모이제이션 배열인 memo를 3차원으로 선언하고, 만약 좌표에 0이 하나라도 들어가 있다면 1로 초기화 하고 그렇지 않으면 0으로 초기화 했습니다.
# a,b,c값은 그 값에 해당하는 memo 배열에 저장하면 됩니다.
# 나머지는 피보나치 수열 동적 프로그래밍 방법처럼 하시면 됩니다.

import sys

memo = [[[0 for _ in range(51)] for _ in range(51)] for _ in range(51)]

for i in range(51) :
    for j in range(51) :
        for k in range(51) :
            if i == 0 or j == 0 or k == 0 :
                memo[i][j][k] = 1
            else :
                memo[i][j][k] = 0

def alg(a, b, c) :

    if a <= 0 or b <= 0 or c <= 0 :
        return 1        

    if memo[a][b][c] != 0 :
        return memo[a][b][c]

    if a > 20 or b > 20 or c > 20 :
        return alg(20, 20, 20)

    if a < b and b < c :
        memo[a][b][c] = alg(a, b, c-1) + alg(a, b-1, c-1) - alg(a, b-1, c)
        return memo[a][b][c]


    memo[a][b][c] = alg(a-1, b, c) + alg(a-1, b-1, c) + alg(a-1, b, c-1) - alg(a-1, b-1, c-1) 
    return memo[a][b][c]


arr = []
answer = []
while True :
    x, y, z = map(int, sys.stdin.readline().split())
    if x == -1 and y == -1 and z == -1 :
        break
    else :
        arr.append([x, y, z])
        answer.append(alg(x, y, z))

for i in range(len(arr)) :
    word = 'w({0}, {1}, {2}) = {3}'.format(arr[i][0], arr[i][1], arr[i][2], answer[i])
    print(word)