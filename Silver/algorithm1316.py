#원동균 / 27조 / 1316번
# 문자열이 alg()함수에 들어가서, 그룹 단어라면 1을 반환하고 아니라면 0을 반환합니다.
# alg() 안의 arr 배열이 존재하고, 반복문을 입력된 문자열 만큼 돌립니다.
# 만약 arr 길이가 0 보다 크고 현재 배열값이 전 배열값과 다르다면 해당 문자열값을 arr에 넣습니다.
# 만약 어떤 문자열 값이 이미 arr 안에 존재한다면 바로 0을 반환하고, 반복문이 끝날때까지 그런 값이 없다면 1을 반환합니다.

import sys

def alg(word) :
    arr = []
    for j in range(len(word)) : 
        if len(arr) > 0 and word[j - 1] != word[j] :
            if word[j] in arr :
                return 0
            else :
                arr.append(word[j])
        else :
            arr.append(word[j])
    return 1
    


n = int(sys.stdin.readline().split()[0])
count = 0
for i in range(n) :

    w = list(sys.stdin.readline())
    w.remove(w[-1])
    count += alg(w)

print(count)