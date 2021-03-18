# 원동균 / 2751 / 수 정렬하기 2
import sys 

n = int(sys.stdin.readline().split()[0])

arr = []
for i in range(n) :
    m = int(sys.stdin.readline().split()[0])
    arr.append(m)
arr.sort()

for i in arr :
    print(i)