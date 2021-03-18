# 원동균 / 27조 / 9663
# 이 문제는 python으로 풀려면 시간복잡도를 정말 잘 관리해야 합니다.
# 이 코드는 pypy에서만 돌아갑니다.
# 분기한정법과 백트래킹을 사용해서 문제를 풀었습니다.
# 체스 판의 퀸은 같은 대각선, 행, 열에 존재하는 모든 말을 죽일 수 있습니다.
# 따라서 DFS 방식과 분기한정법을 사용해서 col 열일때 모든 row를 돌며 체스판 전부에 퀸을 하나하나 넣어보며 같은행, 같은 좌 우대각선에 있는지 확인 합니다.
# 만약 있다면 되돌아가고, 아니라면 계속 탐색합니다.
# 대각선상 번호는 좌 대각선 = col - row + 7, 우 대각선 = col + row 입니다.
# 대각선의 크기는 변의 크기 * 2 - 1 입니다.
# 이 문제는 2차원 배열을 쓰지 않고도 문제를 해결할 수 있습니다. 1차원 배열을 변의 크기 만큼 선언하고, 그 변의 각 배열 번호가 열을, 각 배열 번호 안의 수가 행을 뜻합니다.
# 만약 백트래킹을 사용해서 풀이 하실 거라면 코드에서 flag 부분을 따로 함수로 빼셔서 해주시면 됩니다.

import sys

n = int(sys.stdin.readline().split()[0])

flag_Row = [False] * n
flag_Ldig = [False] * ((n * 2) - 1)
flag_Rdig = [False] * ((n * 2) - 1)
chessArr = [0] * n
cnt = 0
def alg(col) :
    global cnt
    for row in range(n) :
        if flag_Row[row] == False and flag_Ldig[col - row + (n - 1)] == False and flag_Rdig[col + row] == False :
            chessArr[col] = row
            if col == n - 1 :
                cnt += 1
                return
            else :
                flag_Row[row] = True
                flag_Ldig[col - row + (n - 1)] = True
                flag_Rdig[col + row] = True
                alg(col + 1)
                flag_Row[row] = False
                flag_Ldig[col - row + (n - 1)] = False
                flag_Rdig[col + row] = False               

alg(0)
print(cnt)