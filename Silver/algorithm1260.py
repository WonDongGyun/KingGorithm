# 원동균 / 27조 / 1260 / DFS와 BFS
# DFS와 BFS를 구현해봅시다.
# 이 문제는 "양방향" 간선 문제입니다. 따라서 for문에서 미리 모든 경우에 대비해서 graph 딕셔너리에 추가해줍니다.
# DFS, BFS를 손쉽게 조작하기 위해 데크를 선언하였습니다.
# DFS의 경우에는 q를 내림차순 정렬하고 pop과 append를 사용하였고
# BFS의 경우는 q를 오름차순 정렬을하고 popleft와 append를 사용하였습니다.
# 주의 사항
# 반드시 함수 안에는 graph에 간선이 없는 경우의 오류 처리를 해주어야 합니다. 시작 노드가 아무런 노드랑 연결이 안될 수도 있습니다.
# 반례 : https://www.acmicpc.net/board/view/24356


import sys
from collections import deque
n, m, v = list(map(int, sys.stdin.readline().split()))

def graphDFS(vis) :
    q.append(vis)
    if vis not in graph :
        visitedDFS.append(vis)
        return
    while q :
        point = q.pop()
        graph[point].sort(reverse = True)
        if point not in visitedDFS :
            visitedDFS.append(point)

        if graph.get(point) != None :
            for i in graph[point] :
                if i not in visitedDFS :
                    q.append(i)

def graphBFS(vis) :
    q.append(vis)
    if vis not in graph :
        visitedBFS.append(vis)
        return
    while q :
        point = q.popleft()
        graph[point].sort()
        if point not in visitedBFS :
            visitedBFS.append(point)

        if graph.get(point) != None :
            for i in graph[point] :
                if i not in q and i not in visitedBFS :
                    q.append(i)


graph = {}
q = deque()
visitedDFS = []
visitedBFS = []

for i in range(m) :
    x, y = list(map(int, sys.stdin.readline().split()))

    if graph.get(x) == None :
        graph[x] = [y]
        if graph.get(y) == None :
            graph[y] = [x]
        else :
            graph[y].append(x)
            
    else :
        graph[x].append(y)
        if graph.get(y) == None :
            graph[y] = [x]
        else :
            graph[y].append(x)
            
graphDFS(v)
graphBFS(v)
print(' '.join(map(str, visitedDFS)))
print(' '.join(map(str, visitedBFS)))