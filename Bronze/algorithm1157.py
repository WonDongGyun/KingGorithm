# 원동균 / 1157 / 단어 공부
# 알파벳을 대문자로 바꾸고 정렬한 뒤 개수를 파악하였다

import sys

def alg(arr) :
    count = 0
    setArr = list(set(arr))
    maxAlpha = []
    
    for i in range(0, len(setArr)) :
        findAlpha = ''.join(arr).count(setArr[i])

        if count < findAlpha :
            maxAlpha.clear()
            count = findAlpha
            maxAlpha.append(setArr[i])

        elif count == findAlpha :
            maxAlpha.append(setArr[i])
            
        else :
            continue
    
    if len(maxAlpha) > 1 :
        return '?'
    else :
        return maxAlpha[0]
    
        


alphabet = sorted(sys.stdin.readline().upper())
alphabet.remove(alphabet[0])
print(alg(alphabet))