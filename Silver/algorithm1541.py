# 원동균 / 27조 / 1541
# split이나 슬라이싱을 다룰 줄 알면 쉬운 문제입니다!
# 먼저 -로 split을 합니다. 그러면 -문자를 기준으로 배열이 만들어집니다.
# 이때 0번째 배열에 있는 +를 split하고 전부 더한 후, 1 ~ 배열이 끝날때까지 계속 빼주시면 됩니다. 왜냐하면 제일 작은 값은 제일 큰값을 -한 것이랑 같기 때문이죠
# 만약 없다면 +만 있는 것이므로 +로 split을 해서 전부 더하면 됩니다.

import sys

n = sys.stdin.readline().split()[0]

min = n.split('-')
number = 0
if len(min) < 2 :
    plus = n.split('+')
    for i in plus :
        number += int(i)
else :
    for i in range(0, len(min)) :
        if i == 0 :
            plus = min[i].split('+')
            for j in plus :
                number += int(j)   
        else :
            plus = min[i].split('+')
            for j in plus :
                number -= int(j)  


print(number)