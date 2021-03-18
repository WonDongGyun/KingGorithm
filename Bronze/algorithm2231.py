#  원동균 / 27조 / 2231번 / 분해합
# 브루트포스 알고리즘을 이용해 찾아봅시다.
# 분해합은 자기자신 + 각 자리의 숫자입니다. 따라서 생성자 m은 N 이상일 수가 없습니다.
# 따라서 1부터 1000000까지 1씩 증가시켜서 조건에 맞는 숫자를 찾으면, 그 숫자가 생성자 중 최소값이 될 것입니다~!

import sys

n = int(sys.stdin.readline().split()[0])
arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]


def alg(number) :
    for i in range(1, 1000001) :
        if i < number :
            strNumArr = list(str(i))
            sumNum = 0
            for j in strNumArr :
                sumNum += int(j)
            ans = int(i) + sumNum

            if ans == number :
                return int(i)

        else :
            return 0

print(alg(n))