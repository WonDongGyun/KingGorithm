# 원동균 / 2292 / 벌집

import sys

n = int(sys.stdin.readline().split()[0])
bee = 1
i = 1
while bee < n :
    bee += 6 * i
    i += 1
print(i)