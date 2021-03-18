# 원동균 / 27조 / 2667 / 단지번호붙이기
# 스택이나 큐를 사용하지 않고 해봤습니다.
# 처음 설계할 때는 스택이나 큐 배열에 넣고 하나씩 빼는 순으로 하려고 했는데 생각해보니까 안써도 풀릴 것 같았습니다.
# 먼저 house 배열을 0으로 초기화 하고 입력값을 받습니다.
# 그다음 2중 for문을 돌면서 함수를 실행합니다.
# 만약 그 좌표가 1이라면 0으로 만들고 그 좌표부터 상하좌우를 탐색합니다.
# 함수가 종료되면 아파트 단지가 1개 생긴것이므로 apt+=1을 해줍니다.

import sys

n = int(sys.stdin.readline().split()[0])
house = [[0 for _ in range(n)] for _ in range(n)]
cnt = 0
apt = 0
arr = []
def algBfs(ip, jp) :
    global cnt
    if 0 <= ip and ip < n and 0 <= jp and jp < n:
        if house[ip][jp] == 0 :
            return
        if house[ip][jp] == 1 :
            cnt += 1
            house[ip][jp] = 0

        algBfs(ip, jp + 1)
        algBfs(ip, jp - 1)
        algBfs(ip - 1, jp)
        algBfs(ip + 1, jp)


for i in range(n) :
    home = list(sys.stdin.readline())
    home.remove(home[-1])
    for j in range(n) :
        house[i][j] = int(home[j])


for i in range(n) :
    for j in range(n) :
        if house[i][j] == 1 :
            algBfs(i, j)
            arr.append(cnt)
            cnt = 0
            apt += 1

arr.sort()
print(apt)
for i in arr :
    print(i)
