# 원동균 / 4949 / 균형잡힌 세상
# 백준 개 그지 같은 것
# 입력값 이상하게 예시로 들어서 그것땜에 한참 개고생했다
# 그리고 if else가 아니라 if elif 썻다가 알 수 없는 오류가 터져서 또 고생함 ㅡㅡ

import sys

arr = []
answerArr = []

def alg() :
    global arr
    global answerArr
    while True :
        n = list(sys.stdin.readline())
        n.remove(n[len(n) - 1])
        status = True

        if ''.join(n) == '.' :
            break

        else :

            for i in n :
                if i == '(' or i == '[' :
                    arr.append(i)

                elif i == ')' :
                    if len(arr) > 0 and arr[-1] == '(' :
                        arr.pop()
                    else :
                        status = False
                        break

                elif i == ']' :
                    if len(arr) > 0 and arr[-1] == '[' :
                        arr.pop()
                    else :
                        status = False
                        break
            
            if len(arr) > 0 or status == False:
                answerArr.append("no")
                arr.clear()
                continue
            else :
                answerArr.append("yes")  
                continue

alg()
for i in answerArr :
    print(i)