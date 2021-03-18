# 원동균 / 27조 / 1934 / 최소공배수
# 최대공약수를 구할 수 있는 두 수는 유클리드 호재법으로 구해서 최대공약수를 구한 후, 최소 공배수를 구했습니다.
# 그렇지 않은 경우는 공약수가 없다고 판단해 서로를 곱했습니다.

import sys

def gcdAlg(alpha, beta) :
    if alpha > beta :
        x = alpha
        y = beta
    elif alpha < beta :
        x = beta
        y = alpha
    else :
        return alpha
    
    while x % y != 0 :
        if x % y < 0 :
            return 0
        
        z = x % y
        x = y
        y = z
    
    return y



n = int(sys.stdin.readline().split()[0])
arr = []
for i in range(n) :
    a, b = map(int, sys.stdin.readline().split())
    
    GCD = gcdAlg(a, b)
    if GCD == 0 :
        arr.append(a * b)
    else :
        arr.append((a * b) // GCD)

for i in arr :
    print(i)
