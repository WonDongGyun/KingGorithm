# 원동균 / 27조 / 1002 / 터렛
# 두 중점 사이의 거리 d = √(x1 - x2)² + (y1 - y2)²
# 제 코드는 r1이 r2보다 항상 크다라고 생각하고 만들었습니다.
# 1. 만약 d가 0이고 r1 != r2 => 같은 위치임에도 반지름이 다르기 때문에 절대 만날 수 없습니다.
# 2. 만약 d가 0이고 r1 == r2 => 같은 원이라서 항상 만납니다.
# 3. r1 + r2 == d           => 두 원이 외접합니다. 한번만 만납니다.
# 4. r1 - r2 < d and d < r1 + r2    => 두 원이 외접하는데 두번 만날 수 있습니다.
# 5. abs(r1 - r2) == d      => 원이 내접하면서 1번 만납니다.
# 6.  r1 + r2 < d           => 완전 다른 위치에 있어서 절대 만날 수 없습니다.
# 7. abs(r1 - r2) > d       => 완전 다른 위치에 있어서 절대 만날 수 없습니다.
import sys
import math
n = int(sys.stdin.readline().split()[0])
arr =[]
for _ in range(n) :
    x1, y1, r1, x2, y2, r2 = list(map(int, (sys.stdin.readline().split())))
    d = math.sqrt(math.pow(x1 - x2, 2) + math.pow(y1 - y2, 2))
    maxR = 0
    if r1 < r2 :
        temp = r1
        r1 = r2
        r2 = temp
    
    if d == 0 and r1 != r2 :
        arr.append(0)
    elif d == 0 and r1 == r2 :
        arr.append(-1)
    elif r1 + r2 == d  :
        arr.append(1)
    elif r1 - r2 < d and d < r1 + r2: 
        arr.append(2)
    elif abs(r1 - r2) == d :
        arr.append(1)
    elif r1 + r2 < d:
        arr.append(0)
    elif abs(r1 - r2) > d:
        arr.append(0)

for i in arr :
    print(i)

