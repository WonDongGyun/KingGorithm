# 원동균 / 1874 / 스택 수열
# 처음에 문제를 이해하기 어려웠다. 역시 백준 문제... 한국말을 드럽게 못쓴다.

import sys
a = int(sys.stdin.readline())
#count =1 반드시 오름차순으로 넣어야 하기 때문에
#수열을 담기 위해서
stack =[]
op=[]
count =1
temp = True
for i in range(a):
    number = int(sys.stdin.readline())
    #두번째 값 받기
    while count <= number:
        stack.append(count)
        op.append('+')
        count += 1
        #오름차순으로 값을 받아야 하니까 
        # 조건을 충족하면 1을 늘림
    if stack[-1]==number:
        stack.pop()
        op.append('-')
    else:
        temp = False
if temp == False:
    print('NO')
else:
    for i in op:
        print(i)

        
# n = list(map(int, sys.stdin.readline().split()))
# examArr = []
# ascArr = []
# pp = []

# def popMech(num) :
#     while len(ascArr) > 0 and len(examArr) > 0:
#         if num == examArr[0] :
#             ascArr.pop()
#             pp.append('-')
#             examArr.remove(examArr[0])    
            
#             if len(ascArr) > 0 :
#                 popMech(ascArr[-1])

#         else :
#             break
#     return

# for i in range(1, n[0] + 1) :
#     number = list(map(int, sys.stdin.readline().split()))
#     examArr.append(number[0])

#     if i < n[0] + 1:
#         ascArr.append(i)
#         pp.append('+')
#         popMech(i)

# if len(examArr) > 0 :
#     print('NO')
# else :
#     for i in pp :
#         print(i)