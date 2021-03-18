# 원동균 / 27조 / 15650
# python itertools의 permutations와 combination에 대해 알아봅시다
# permutations - 순열일 경우 사용합니다. 그래서 중복값이 나올 수 있습니다.
# combination - 조합일 경우 사용합니다. 중복값이 나오지 않습니다.
# print 뒤에 end= 하고 조건을 입력하면, print시 해당 조건으로 출력됩니다. 저 같은 경우에는 공백을 두었습니다.
# sep = '\n'을 하면 다음 print는 개행합니다.

# 만약에 itertools를 사용하고 싶지 않다면 밑의 재귀함수를 보시면 됩니다.
# for문에서 재귀함수를 돌림으로서, i값의 변화에 따라 반환 값이 달라집니다.
# 재귀 전에 i값은 cb[]의 0번째를 초기화 합니다. 그래서 해당 재귀문이 끝날때까지는 항상 cb[]의 0번째를 i로 초기화 할 수 있습니다.
# 만약 l값이 number값과 같으면 print를 사용해 출력후 반환합니다. 반환하게 되면, 그 전의 재귀의 for문이 돌면서 다시 재귀를 수행합니다.

# import sys
# from itertools import combinations

# n, m = map(int, sys.stdin.readline().split())

# arr = []
# for i in range(1, n + 1) :
#     arr.append(i)

# cb = combinations(arr, m)

# for i in cb :
#     for j in range(m) :
#         if j != m - 1:
#             print(i[j], end = ' ')
#         else :
#             print(i[j], sep= '\n')

import sys
n, m = map(int, sys.stdin.readline().split())

def alg(l, w, number) :
    if l == number :
        for i in range(len(cb)) :
            if i != number - 1:
                print(cb[i], end = ' ')
            else :
                print(cb[i], sep= '\n')
        return
    
    for i in range(w, len(arr)) :
        cb[l] = arr[i]
        alg(l + 1, i + 1, number)

arr = []
for i in range(1, n + 1) :
    arr.append(i)
cb = [0] * m
alg(0, 0, m)
