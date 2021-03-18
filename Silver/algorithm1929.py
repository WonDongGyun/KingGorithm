# 원동균 / 1929 / 소수 구하기
# 소수 구하기는 에라토네스의 체말고도 이런 식으로 구할 수 있다.
# 어떤 값의 제곱근값 이하의 값들만 돌려서 약수가 있는지 찾으면 끝!

import sys
import math

def alg(num) :
    sqrtNum = math.sqrt(i)
    j = 3
    if i != 2 and i%2 == 0 :
        return False
    else :
        while j <= sqrtNum :
            if (i % j == 0) :
                return False
            j +=2

    return True

start, end = map(int, sys.stdin.readline().split())

for i in range (start, end+1) :
    if(i > 1) :
        if alg(i) : 
            print(i) 
