# 원동균 / 10872 / 팩토리얼

import sys

n = int(sys.stdin.readline().split()[0])


def alg(cnt, ip, number):

    if ip > number:
        return cnt
    else:
        cnt *= ip
        result = alg(cnt, ip + 1, number)

    return result


print(alg(1, 1, n))
