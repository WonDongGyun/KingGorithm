# 원동균 / 1110 / 더하기 사이클

import sys

n = int(sys.stdin.readline())
first = n
count = 0

def chg(chgNum) :
    if int(chgNum) < 10 :
        strN = [str(0), str(chgNum)]
        return strN
        
    else :
        strN = list(str(chgNum))
        return strN
        

def sum(num) :
    global count
    global first
    count = count + 1
    strSum = chg(num)[1] + chg(int(chg(num)[0]) + int(chg(num)[1]))[1]
    
    if int(strSum) ==  first :
        return count
    else :
        return sum(int(strSum))


print(sum(n))