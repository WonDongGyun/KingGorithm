# 원동균 / 27조 / 10828
# 스택의 원리를 생각하셔서 구현하시면 됩니다!

import sys 

def alg(wordArr) :
    if len(wordArr) == 2 :
        stack.append(int(wordArr[1]))
    else :
        if wordArr[0] == 'top' :
            if len(stack) > 0 :
                print(stack[-1])
            else :
                print(-1)
        elif wordArr[0] == 'empty' :
            if len(stack) > 0 :
                print(0)
            else :
                print(1)            
        elif wordArr[0] == 'size' :
            print(len(stack))     
        else :
            if len(stack) > 0 :
                print(stack.pop())
            else :
                print(-1)

n = int(sys.stdin.readline().split()[0])
stack = []

for i in range(n) :
    x = list((sys.stdin.readline().split()))
    alg(x)