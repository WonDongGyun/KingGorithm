// 원동균 / 11725 / 트리의 부모 찾기
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
  const N = parseInt(await ps.readLine());

  // parent = 부모를 기록하는 배열
  // stack = dfs를 위한 다음 경로 배열
  // visit = 방문 기록 배열
  // tree = 노드 배열

  const parent = Array.from(Array(N).fill(0));
  //   const stack = [];
  const queue = [];
  const visit = Array.from(Array(N).fill(false));
  const tree = Array.from(Array(N), () => new Array());

  for (let i = 0; i < N - 1; i++) {
    const loc = (await ps.readLine())
      .split(" ")
      .map((element) => parseInt(element));
    tree[loc[0] - 1].push(loc[1]);
    tree[loc[1] - 1].push(loc[0]);
  }

  bfs(0);

  parent.shift();
  let result = "";
  parent.forEach((ans) => (result += ans + "\n"));
  console.log(result);

  // 1번 노드부터 시작하지만 배열은 0번부터 시작합니다.
  //   function dfs(node) {
  //     visit[node] = true;
  //     for (let i = 0; i < tree[node].length; i++) {
  //       if (!visit[tree[node][i] - 1]) {
  //         stack.push(tree[node][i] - 1);
  //         parent[tree[node][i] - 1] = node + 1;
  //       }
  //     }

  //     if (stack.length < 1) {
  //       return;
  //     }
  //     dfs(stack.pop());
  //   }
  function bfs(node) {
    queue.push(node);
    while (queue.length > 0) {
      const next = queue.shift();
      visit[next] = true;
      for (let i = 0; i < tree[next].length; i++) {
        if (!visit[tree[next][i] - 1]) {
          queue.push(tree[next][i] - 1);
          parent[tree[next][i] - 1] = next + 1;
        }
      }
    }
  }
});
