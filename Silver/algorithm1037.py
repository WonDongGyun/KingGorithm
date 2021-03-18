# 원동균 / 27조 / 1037 / 약수
# 주어진 약수에 대해서 그 약수를 갖는 숫자를 구하는 문제입니다.
# 오름차순으로 약수가 주어진다는 보장이 없기 때문에, 정렬을 한 후, 배열의 첫번째 값과 마지막 값을 곱해줍시다.


import sys

n = int(sys.stdin.readline().split()[0])
num = list(map(int, sys.stdin.readline().split()))

num.sort()
print(num[0] * num[-1])