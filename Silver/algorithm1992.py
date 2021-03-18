# 원동균 / 27 조 / 1992 / 쿼드트리
# 분할정복법을 사용해서 풀었습니다
# 원리는 색종이 문제와 같습니다.
# 괄호는 재귀가 시작하고 끝나는 지점에 넣어주시면 됩니다.

import sys
import math

n = int(sys.stdin.readline().split()[0])
video = [[0 for _ in range(n)] for _ in range(n)]

arr = []
def alg(side, ip, jp) :
    global arr
    oneP = 0
    zeroP = 0
    for i in range(ip, ip + side) :
        for j in range(jp, jp + side) :
            if video[i][j] == 1 :
                oneP += 1
            else:
                zeroP += 1

    area = int(math.pow(side, 2))

    if oneP == area :
        arr.append(1)
        return 
    elif zeroP == area :
        arr.append(0)
        return 
    else :
        side = side // 2
        arr.append('(')
        alg (side, ip, jp)
        alg (side, ip, jp + side)
        alg (side, ip + side, jp)
        alg (side, ip + side, jp + side)
        arr.append(')')



for i in range(n) :
    vidArr = list(sys.stdin.readline())
    vidArr.remove(vidArr[-1])
    for j in range(n) :
        video[i][j] = int(vidArr[j])

alg(n, 0, 0)
print(''.join(map(str, arr)))