# 원동균 / 27조 / 2630 / 색종이 만들기
# 분할정복법 사용하기
# 사각형의 배열을 미리 전부 채워놓고 시작합니다.
# 함수로 들어갈때 side (변의 크기), ip jp (좌표값)을 매개변수로 넣어줍니다.
# 반복문을 통해 wp(하얀색의 개수), bp(파란색의 개수)를 산정하고, area(영역)변수와 같은면 반환하고 아니면 재귀함수를 실행합니다.
# 1번 재귀함수는 좌상단, 2번 재귀함수는 우상단, 3번 재귀함수는 좌하단, 4번 재귀함수는 우하단 영역입니다.
# ip와 jp에 변의 크기를 절반한 것만큼 초기화 시켜주면 해당 좌표부터 탐색할 수 있습니다.

import sys
import math

white = 0
blue = 0

def algDq(side, ip, jp) :
    global white
    global blue
    wp = 0
    bp = 0
    for i in range(ip, ip + side) :
        for j in range(jp, jp + side) :
            if dq[i][j] == 0 :
                wp += 1
            else :
                bp += 1
    area = int(math.pow(side, 2))

    if wp == area :
        white += 1    
        return
    elif bp == area :
        blue += 1
        return
    else :
        side = side // 2
        algDq(side, ip, jp)
        algDq(side, ip, jp + side)
        algDq(side, ip + side, jp)
        algDq(side, ip + side, jp + side)




n = int(sys.stdin.readline().split()[0])
dq = [[0 for _ in range(n)] for _ in range(n)]
for i in range(n) :
    num = list(map(int, (sys.stdin.readline().split())))
    for j in range(len(num)) :
        dq[i][j] = num[j]

algDq(n, 0, 0)  
print(white)
print(blue) 