# 원동균 / 7576 / 토마토

import sys
from collections import deque

m, n = map(int, sys.stdin.readline().split())

arr = []
tmtDeque = deque()

for i in range(n) :
    arr.append(list(map(int, sys.stdin.readline().split())))
    for j in range(m) :
        if arr[i][j] == 1 :
            tmtDeque.append([i, j])


def tmtDeqAlg(hori, verti, tmtBox) :
    day = -1;    
    locX = [0, 0, 1, -1]                   # x 및 y의 좌표 설정
    locY = [-1, 1, 0, 0]

    while tmtDeque :
        day += 1
        
        # tmtDeque 크기 만큼 돌면서 다 익은 토마토 위치를 pop하고, 그 주변 토마토가 익지 않았다면 그걸 다시 데크에 넣고 1로 바꿈
        # 즉, 이 코드는 값이 1인 애들이 데크에 존재하고 그 주변에서 0인 애들을 데크에 넣고 1로 바꾼 다음에 바뀐 애들의 위치를 데크에 넣고 돌리는 것임! 
        for _ in range(len(tmtDeque)) :
            tmtloc = tmtDeque.popleft()
            for j in range(4) :
                tmtX = tmtloc[1] + locX[j]
                tmtY = tmtloc[0] + locY[j]

                if (0 <= tmtX < m) and (0 <= tmtY < n) :
                    if tmtBox[tmtY][tmtX] == 0 :
                        tmtDeque.append([tmtY , tmtX]) 
                        tmtBox[tmtY][tmtX] = 1

    for i in range(n) :
        for j in range(m) :
            if arr[i][j] == 0 :
                return -1

    return day

print(tmtDeqAlg(m, n, arr))