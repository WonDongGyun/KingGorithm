# 원동균 / 27조 / 2579
# 먼저 메모이제이션 배열인 memo에 0번째에는 arr의 첫값을, 1번째에는 arr[0]과 arr[1]을 더한 값을 넣습니다. 
# 2번째에는 arr[0]과 두 칸 건너뛰었을때의 경우와, 1번 계단 2번계단을 차례대로 밟은 경우를 비교해서 넣습니다.
# 그 다음 부터는, (1칸올라온 경우 + 현재값 + i - 3), (2칸올라온경우 + 현재값) 중 최대값을 memo[]에 넣습니다.
# 1칸 올라오면 그 전에 올라온 계단은 무조건 2칸이기 때문에 i-3을 했습니다.

import sys

n = int(sys.stdin.readline().split()[0])
arr = []
for i in range(n) :
    score = int(sys.stdin.readline().split()[0])
    arr.append(score)

memo = [0 for _ in range(len(arr))]

def alg() :

    if n == 1 :
        print(arr[0])
        return
    elif n == 2 :
        print(arr[0] + arr[1])
        return
    else :

        memo[0] = arr[0]
        memo[1] = arr[0] + arr[1]
        memo[2] = max(arr[1] + arr[2], arr[0] + arr[2])

        for i in range(3, n) :
            memo[i] = max(memo[i - 3] + arr[i - 1] + arr[i], memo[i - 2] + arr[i])
        
        print(memo[-1])
        return

alg()