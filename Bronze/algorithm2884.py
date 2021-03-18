# 원동균 / 2884 / 알람 시계

import sys
import datetime

def alg(h, m) :
    wake = datetime.datetime(2021, 3, 5, h, m, 0, 0)
    alram = wake - datetime.timedelta(minutes=45)
    print(str(alram.hour) + ' ' + str(alram.minute))

a = sys.stdin.readline().split()

h = int(a[0])
m = int(a[1])

alg(h, m)

