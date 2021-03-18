# 원동균 / 11729 / 하노이 탑 이동 순서

import sys
import math

# 하노이 탑 공식을 유도하지 못해서 결국은 식을 찾아봤다

def alg(disk, start, end, middle) :
    if disk == 1 :
        print("%d %d" % (start, end))
        return

    alg(disk - 1, start, middle, end)
    print("%d %d" % (start, end))
    alg(disk - 1, middle, end, start)

    return


n = sys.stdin.readline().split()
print(int(math.pow(2, int(n[0]))) -1 )
alg(int(n[0]), 1, 3, 2)
