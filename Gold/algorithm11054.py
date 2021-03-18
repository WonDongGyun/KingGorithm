# 원동균 / 27조 / 11054 / 가장 긴 바이토닉 부분 수열
# 반례가 많아서 오래 걸렸지만 쉽게 푸는 방법을 알려드리겠습니다
# 먼저 예전에 가장 긴 수열의 길이를 구하는 문제 기억하시나요?
# 그걸 정방향으로 1번, 역방향으로 1번 해줍니다.
# 그 다음 메모이제이션 배열인 memo, memo2의 각 요소를 더해줍니다.
# 그리고 거기서 1을 빼주면 됩니다. 1을 빼는 이유는 각 memo 배열이 1로 초기화되고 경로 탐색을 시작했기 때문입니다.
# 더해준 요소값에서 최대값을 뽑으면 끝!

import sys

n = int(sys.stdin.readline().split()[0])
arr = list(map(int, sys.stdin.readline().split()))
memo = [1 for _ in range(n)]
memo2 = [1 for _ in range(n)]
numArr = []

def alg(memo) :

    for i in range(1, len(arr)) :
        for j in range(0, i) :
            if arr[i] > arr[j] :
                memo[i] = max(memo[i], memo[j] + 1)

    for i in range(len(arr) - 1, -1, -1) :
        for j in range(len(arr) - 1, i, -1) :
            if arr[i] > arr[j] :
                memo2[i] = max(memo2[i], memo2[j] + 1)
    

    for i in range(len(arr)) :
        numArr.append(memo[i] + memo2[i] - 1)
    return max(numArr)
print(alg(memo))