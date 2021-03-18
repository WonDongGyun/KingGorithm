# 원동균 / 10250 / ACM 호텔

import sys
arr = []

# 알고보니 등차수열

def alg(height, weight, customer) :
    global arr
    floor = customer % height
    if floor != 0 :
        room = floor * 100 + (((customer - floor) / height) + 1)
    else :
        room = height * 100 + (((customer - height) / height) + 1)    
    return arr.append(int(room))


n = sys.stdin.readline().split()

for i in range(int(n[0])) :
    h, w, cus = map(int, sys.stdin.readline().split())
    alg(h, w, cus)

for i in arr :
    print(i)
    
