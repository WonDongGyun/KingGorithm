# 원동균 / 27조 / 11050 
# 위키백과의 이항계수 항목 정의 부분을 참조하였습니다.
# https://ko.wikipedia.org/wiki/%EC%9D%B4%ED%95%AD_%EA%B3%84%EC%88%98

import sys

n, k = map(int, sys.stdin.readline().split())

if k < 0 :
    print(0)

if n < k :
    print(0)

if 0 <= k and k <= n :
    nF = 1
    kF = 1
    nkF = 1
    for i in range(1, n + 1) :
        nF *= i

    for i in range(1, k + 1) :
        kF *= i

    for i in range(1, n - k + 1) :
        nkF *= i

    print(nF // (kF*nkF))