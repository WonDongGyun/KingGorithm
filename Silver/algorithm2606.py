# 원동균 / 2606 / 바이러스
# 스택을 이용한 DFS

import sys

computerNum = sys.stdin.readline().split()
relation = sys.stdin.readline().split()

node = {}
visited = []
for i in range(int(relation[0])) :
    f, t = map(int, sys.stdin.readline().split())  
    
    if node.get(f) == None :
        node[f] = [t]
        if node.get(t) == None :
            node[t] = [f]
        else :
            node[t].append(f)

    else :
        node[f].append(t)
        if node.get(t) == None :
            node[t] = [f]
        else :
            node[t].append(f)


def stackDFS(node, start) :
    global visited
    stack = [start]

    while stack :
        nodePoint = stack.pop()
        visited.append(nodePoint)
        for i in node[nodePoint] :
            if i not in stack and i not in visited :
                stack.append(i)
        

    return visited

stackDFS(node, 1)
print(len(visited) - 1)





