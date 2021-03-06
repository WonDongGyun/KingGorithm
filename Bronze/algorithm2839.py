#원동균 / 27조 / 2839 / 설탕 배달
# 설탕 배달할때는 3과 5 크기의 봉투만 사용할 수 있습니다.
# 그런데 만약 설탕이 5로 나눠진다면 그게 가장 최소값이겠죠? 그렇다면 그 값을 5로 나눠서 몫을 반환합니다.
# 아니라면 while문을 n이 0이 아닐때까지 돌립니다.
# 그 안에서 먼저 -3을 하고 카운트 값을 증가시킵니다. 왜냐하면 11인 경우나 14인 경우가 있을 수 있기 때문입니다.
# -3을 감소시키고 만약 5로 딱 나눠 떨어진다면? 그 값을 5로 나누고 몫을 반환하면 됩니다.
# 만약 n==0 이 아니라면 ? 그럼 3이랑 5로는 못 담는 거죠 

import sys
n = int(sys.stdin.readline().split()[0])

count = 0
if n % 5 == 0 :
    count += (n // 5)
    n = 0
else :
    while n > 0 :
        count +=1
        n = n - 3
        if n % 5 == 0 :
            count += (n // 5)
            n = 0
            break

if n != 0 :
    count = -1
print(count)