# 원동균 / 10870 / 피보나치 수 5

import sys

n = int(sys.stdin.readline().split()[0])


def alg(num):
    if num == 0:
        return 0
    elif num == 1:
        return 1
    else:
        result = alg(num - 1) + alg(num - 2)

    return result


print(alg(n))
