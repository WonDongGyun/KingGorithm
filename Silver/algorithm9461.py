# 원동균 / 27조 / 9461
# 동적 프로그래밍을 사용해서 삼각형을 만들어보자
# 메모이제이션 배열인 memo를 선언하고 0값을 넣었습니다 (나중에 연산을 쉽게 하기 위함. ex) 2번째 삼각형이 몇인지 알고싶어 => memo[2])
# 동적 프로그래밍 기법을 사용해서 삼각형을 만들 때 규칙만 찾으면 뚝딱뚝딱 만들 수 있습니다.
# 아무런 규칙이 없는것 처럼 보이지만 사실은 규칙이 있는 문제
# 1. 처음 2번은 삼각형의 크기가 무조건 1입니다.
# 2. 그 다음 3번째 삼각형은 0크기의 삼각형이 있다고 생각하고 memo[0] + memo[1] = memo[3] 의 연산을 수행합니다. 4번째 삼각형의 경우는 memo[1] + memo[2] = memo[4] 입니다.
# 3. 2번의 규칙을 계속 반복합니다
# 미리 100개의 삼각형을 만들고 시작해서 내가 삼각형 번호를 입력할 때 마다 삼각형을 만드는 작업을 하지 않게 했습니다
# tri라는 변수는 만들어진 삼각형의 개수고, cnt 변수는 연산을 편하게 하기 위해 넣었습니다.

import sys

n = int(sys.stdin.readline().split()[0])
memo = [0]

def alg(lastTri) :
    tri = 0
    cnt = 0
    while tri != lastTri :
        if len(memo) < 3:
            tri += 1
            memo.append(1)
        else :
            memo.append(memo[cnt] + memo[cnt + 1])
            cnt += 1
            tri += 1
    
alg(100)
arr = []
for i in range(n) :
    t = int(sys.stdin.readline().split()[0])
    arr.append(memo[t])

for i in arr :
    print(i)