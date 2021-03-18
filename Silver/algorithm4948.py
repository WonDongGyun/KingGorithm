# 원동균 / 27조 / 4948 / 베르트랑 공준
# 에라토네스의 체로 구하는 방법과 1씩 증가시켜가며 그 수가 소수인지 구하는 방법이 있습니다.
# 일단 후자는 pypy에서는 돌아가지만, python에서는 돌아가지 않습니다. 왜냐하면 전부 하나하나 소수 조건을 비교해가며 찾아가기 때문입니다.
# 반면에 에라토스테네스의 체로 123456 * 2 + 1만큼의 배열을 True로 선언해주고 거기서 소수가 아닌 수를 전부 False로 바꿉니다.
# 에라토스테네스의 체를 사용하면 여러가지 입력이 들어왔을 때 각각의 입력에 대해서 단순히 for문으로 True 위치만 보면 됩니다.
# 에라토스테네스가 훨씬 더 빠른 방법입니다.
# 혹시나 해서 2가지 코드 모두 올립니다.


import sys
import math

# def alg(num) : 
#     odd = 3
#     sqrtNum = math.sqrt(num)
#     if num == 2 :
#         return 1
#     else :
#         if i % 2 == 0 or i == 1 :
#             return 0
#         else :
#             while sqrtNum >= odd :
#                 if num % odd == 0 :
#                     return 0
#                 odd +=2
#     return 1

# arr = []
# while True :
#     n = int(sys.stdin.readline().split()[0])

#     if n == 0 :
#         break 

#     count = 0
#     for i in range(n + 1, 2 * n + 1) :
#         count += alg(i)
    
#     arr.append(count)

# for i in arr :
#     print(i)

era = [True] * (123456 * 2 + 1)
num = 123456 * 2 + 1

m = int(math.sqrt(num))

for i in range(2, m + 1):
    if era[i] == True:           
        for j in range(i+i, num, i): 
            era[j] = False


arr = []
while True :
    n = int(sys.stdin.readline().split()[0])
    if n == 0 :
        break 

    count = 0
    for i in range(n + 1, 2 * n + 1) :
        if era[i] == True :
            count += 1
    arr.append(count)

for i in arr :
    print(i)
