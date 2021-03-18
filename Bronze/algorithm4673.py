# 원동균 / 4673 / 셀프 넘버

arr = []

def kap(num) :
    global arr
    sumNum = 0
    if len(list(str(num))) <= 1 :
        return arr.append(num + num)
    else :
        for j in list(str(num)) :
            sumNum += int(j)
            
        return arr.append(num + sumNum)


for i in range(1, 10001) :
    if i == 1 :
        kap(i)
        print(i)
    else :
        if i in arr and len(arr) > 0 :
            kap(i)
        else :
            kap(i)
            print(i)