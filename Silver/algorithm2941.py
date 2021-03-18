# 원동균 / 2941 / 크로아티아 알파벳
# 꼼수 사용했다 ㅎㅎ

import sys
croatia = ['c=', 'c-', 'dz=', 'd-', 'lj', 'nj', 's=', 'z=']

def alg(n) :
    count = 0
    for i in range(0, len(croatia)) :
        if n.find(croatia[i]) != -1 :
            n = n.replace(croatia[i], ' ')
            count += 1
        else :
            continue
    return len(n)


word = sys.stdin.readline().split()
print(alg(word[0]))