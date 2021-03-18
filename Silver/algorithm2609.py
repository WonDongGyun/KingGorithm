# 원동균 / 27조 / 2609
# 최대공약수는 유클리드 호재법을 사용했습니다.
# 유클리드 호재법 - 주어진 두 개의 자연수 중에서 작은 값으로 나눈 나머지값으로 0이 될때까지 나누는 방식
# ex) 24 % 18 = 6 => 18 % 6 = 0  => 6은 최대공약수가 된다.
# 최소공배수는 두 수의 곱셈값과 최대공약수 * 최소공배수 값은 같다는 것을 이용했습니다.
# 이 문제에서 두 수는 항상 서로 다릅니다.

import sys

n, m = list(map(int, sys.stdin.readline().split()))

if n > m :
    a = n
    b = m
else :
    a = m
    b = n

while a % b !=0 :
    c = a % b
    a = b
    b = c

GCD = b
LCM = (n * m) // GCD

print(GCD)
print(LCM)