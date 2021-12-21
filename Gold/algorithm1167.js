// 원동균 / 1167 / 트리의 지름
"use strict";

const { memory } = require("console");

const ps = (function (process) {
  const readline = require("readline");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let lines = [];
  let cursor = 0;

  rl.on("line", function (line) {
    lines.push(line);
  });

  return {
    main(f) {
      f()
        .catch((err) => {
          console.error(err);
          process.exit(1);
        })
        .finally(() => {
          rl.close();
        });
    },
    use(name, f) {
      this[name] = f;
    },
    readLine: async function readLine() {
      return new Promise((resolve) => {
        if (cursor < lines.length) {
          resolve(lines[cursor++]);
        } else {
          setTimeout(() =>
            readLine().then((line) => {
              resolve(line);
            })
          );
        }
      });
    },
    async readArrayLine() {
      const line = await this.readLine();
      return line.split(/\s/).map((t) => parseInt(t));
    },
    write(data) {
      process.stdout.write(data + "");
    },
    writeLine(data) {
      process.stdout.write((data === undefined ? "" : data) + "\n");
    },
    range(start, end, step = 1) {
      if (end === undefined) {
        end = start;
        start = 0;
      }
      return {
        [Symbol.iterator]: function* () {
          for (let i = start; i < end; i += step) {
            yield i;
          }
        },
      };
    },
  };
})(process);

ps.main(async () => {
  const V = parseInt(await ps.readLine());
  const vertax = Array.from(Array(V + 1), () => new Array());

  const dfs = (start) => {
    // 방문 여부를 판단하며, 끝 정점까지 갈 수 있는 최대값을 구합니다.
    const visited = Array(V + 1).fill(-1);
    const deque = [start];
    visited[start] = 0;

    // [해당 정점까지 가는 가중치의 최대값, 정점]
    let max = [0, 0];

    while (deque.length != 0) {
      // 출발할 정점
      const go = deque.shift();

      // 해당 정점에서 갈 수 있는 정점과 정점까지 이동하는 가중치
      for (const [node, weight] of vertax[go]) {
        // 방문하지 않았다면 수행
        if (visited[node] == -1) {
          visited[node] = visited[go] + weight;
          deque.push(node);

          if (max[0] < visited[node]) {
            max = [visited[node], node];
          }
        }
      }
    }

    return max;
  };

  for (let i = 0; i < V; i++) {
    const dis = (await ps.readLine())
      .split(" ")
      .map((element) => parseInt(element));

    for (let j = 1; j < dis.length - 1; j += 2) {
      vertax[dis[0]].push([dis[j], dis[j + 1]]);
    }
  }

  // 해당 문제의 그래프는 모든 정점이 전부 이어져 있는 그래프입니다.
  // 첫번째 dfs에서 임의의 정점에서 어떤 정점까지 가는 최대 거리를 구합니다.
  /* 하지만 한번만 진행하면 해당 노드 까지의 거리가 최대 거리 값임을 보장할 수 없기 때문에
   해당 정점에서 다시 한번 더 bfs를 진행하여 해당 정점에서 멀리 있는 정점을 찾아나갑니다. */
  const result = dfs(dfs(1)[1])[0];

  console.log(result);
});
