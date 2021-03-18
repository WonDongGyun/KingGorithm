# 원동균 / 27조 / 1753 / 최단경로
# 힙큐는 반드시 사용안해도 되지만, 2차원 배열을 사용해서 풀었다가는 메모리 초과 및 시간 초과가 납니다.
# 다익스트라 알고리즘과 플로이드 알고리즘을 쓸 수 있습니다.
# 음수 가중치가 나오지 않으므로 다익스트라 알고리즘을 사용하였습니다.
# heapq 모듈은 이진트리 구조의 힙 자료구조를 제공합니다. 따라서 다익스트라 문제와 같이 최소의 경로 혹은 최대의 경로를 구할 때 유용하게 사용할 수 있습니다.
# 이진 트리의 부모는 항상 자식 트리보다 cost가 낮거나 높습니다.
# 2차원 배열로 선언해서 하면 메모리 초과 및 시간초과 오류가 뜨므로, 입접 리스트로 만들었습니다.
# 배열의 크기가 V+1 인 이유는 배열은 0부터 시작하기 때문에, 알아보기 쉽게 하기위해 + 1을 하였습니다.


# route[]에는 u v w 값이 들어있습니다.
# dji[]의 각 열은 지정한 정점에서 갈 수 있는 지점을 뜻합니다. 이 배열의 값을 조정해서 지정한 정점 ~ 해당 지점까지의 최소 거리를 나타낼 수 있습니다.
# 예를 들어 dji[3] = 10 이면, 내가 지정한 정점에서 3번까지 가는 최소값은 10이라는 의미입니다.
#  float('inf') => C++의 infinity와 같습니다. 경로 최소값을 찾으려면 minNum을 가능한 최대의 수로 두어야 합니다. 때문에 dji[]을 minNum으로 전부 초기화 해줍니다.


# 먼저 heapq.heappush를 사용해서 지정한 힙에 [지정한 정점, 0]을 넣습니다. 그 후, dji[ 지정한 정점 ]은 0으로 초기화 해줍니다. 자기 자신과의 거리는 0입니다.
# heap이 전부 빌때까지 반복문을 돌립니다.
# point => 도착지, dis => 현재 출발지에서 point까지 갈때의 거리 입니다.
# 처음에는 point = 1, dis = 0이 들어갑니다.
# 반복문을 통해 rout[]에서 1번 노드가 갈 수 있는 정보를 가지고 옵니다. 이 경우는 2번과 3번노드의 정보를 가지고 올 수 있습니다.
# cost => 현재 계산한 최소 비용 입니다. 
# 만약 해당 cost값이 dji[]에 저장되어 있는 값보다 작다면 dji[]에 cost값을 넣습니다. 처음에는 무한값과 비교하기 때문에 무조건 들어갑니다.
# heap에 데이터를 넣을 때 cost값, 도착지 정보를 넣습니다.
# 첫번째 while문이 끝나면, 힙 배열에는 1번 정점에서 갈수 있는 2번과 3번의 정보가 저장됩니다.  그 다음 while 문이 종료되면 2번에서 갈 수 있는 3번과 4번 정점의 정보가 들어갑니다.

# cost = dis + i[1] 를 계산함으로서 선택한 정점에서 도착지까지 걸리는 거리를 계산하고
# cost < dji[i[0]] 최소 거리가 아니라면, 다른 거리를 계산합니다.

import sys
import heapq

V, E = list(map(int, sys.stdin.readline().split()))
k = int(sys.stdin.readline().split()[0])

minNum = float('inf')
route = [[] for _ in range(V + 1)]
dji = [minNum for _ in range(V + 1)]

def dijAlg(root) :
    heap = []
    heapq.heappush(heap, [0, root])
    dji[root] = 0

    while heap :
        dis, point = heapq.heappop(heap)
        if dji[point] < dis :
            continue

        for i in route[point]:
            cost = dis + i[1]

            if cost < dji[i[0]]:
                dji[i[0]] = cost
                heapq.heappush(heap, [cost, i[0]])        

for i in range(E) :
    u, v, w = list(map(int, sys.stdin.readline().split()))
    route[u].append([v, w])

print(route)
dijAlg(k)
for i in range(1, V + 1) :
    if dji[i] == minNum :
        print('INF')
    else :
        print(dji[i])