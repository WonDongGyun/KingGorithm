# 원동균 / 1018 / 체스판 다시 칠하기
import sys

n, m = list(map(int, sys.stdin.readline().split()))
wordArr = [[0 for _ in range(m)] for _ in range(n)]

for i in range(n):
    word = list(sys.stdin.readline())
    word.remove(word[-1])

    for j in range(m):
        wordArr[i][j] = word[j]


x = 0
y = 0
minCnt = 10000

while True:
    cnt = 0
    cnt2 = 1
    for i in range(x, x + 8):
        for j in range(y, y + 8):

            if i == x and j == y:
                status = wordArr[i][j]
            else:
                if status == 'W' and (x + y) % 2 == 0:
                    if (i + j) % 2 == 0:
                        if wordArr[i][j] != 'W':
                            cnt += 1
                        else:
                            cnt2 += 1
                    else:
                        if wordArr[i][j] != 'B':
                            cnt += 1
                        else:
                            cnt2 += 1

                elif status == 'W' and (x + y) % 2 != 0:
                    if (i + j) % 2 != 0:
                        if wordArr[i][j] != 'W':
                            cnt += 1
                        else:
                            cnt2 += 1
                    else:
                        if wordArr[i][j] != 'B':
                            cnt += 1
                        else:
                            cnt2 += 1

                elif status == 'B' and (x + y) % 2 == 0:
                    if (i + j) % 2 == 0:
                        if wordArr[i][j] != 'B':
                            cnt += 1
                        else:
                            cnt2 += 1
                    else:
                        if wordArr[i][j] != 'W':
                            cnt += 1
                        else:
                            cnt2 += 1

                elif status == 'B' and (x + y) % 2 != 0:
                    if (i + j) % 2 != 0:
                        if wordArr[i][j] != 'B':
                            cnt += 1
                        else:
                            cnt2 += 1
                    else:
                        if wordArr[i][j] != 'W':
                            cnt += 1
                        else:
                            cnt2 += 1

    if minCnt > min(cnt, cnt2):
        minCnt = min(cnt, cnt2)

    if x + 8 == n and y + 8 == m:
        print(minCnt)
        break
    else:
        if y + 8 != m:
            y += 1
        else:
            x += 1
            y = 0
