# 원동균 / 27조 / 9012 / 괄호
# 우리 예전에 괄호 풀기 문제 풀었었죠? 그것보다 쉬워요!
# 다만, 스택 클리어 하는거 잊지 말아주세요~

import sys

t = int(sys.stdin.readline().split()[0])

def alg(wordArr) :
    for i in range(len(wordArr)) :
        if wordArr[0] == ')' :
            return 'NO'
        
        if wordArr[i] == '(' :
            stack.append('(')

        if wordArr[i] == ')' :
            if len(stack) > 0 :
                stack.pop()
            else :
                return 'NO'
    
    if len(stack) != 0 :
        return 'NO'
    else :
        return 'YES'
        
        



arr = []
stack = []
for i in range(t) :
    word = list(sys.stdin.readline())
    word.remove(word[-1])
    arr.append(alg(word))
    stack.clear()

for i in arr :
    print(i)
