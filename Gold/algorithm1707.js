// 원동균 / 1707 / 이분 그래프

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
  const test = parseInt(await ps.readLine());
  const result = [];

  for (let i = 0; i < test; i++) {
    const [v, e] = (await ps.readLine())
      .split(" ")
      .map((element) => parseInt(element));

    // 그래프 관계를 표현할 배열 선언 (코딩하기 쉽게 하기 위해서 + 1을 해주었습니다.)
    // 기본적인 2차원 배열로 선언하면 공간 낭비가 발생하기 때문에, 빈 배열로 행만을 선언해주었습니다.
    const graphArr = Array.from(Array(v + 1), () => Array());

    // 그래프의 각 정점의 색깔을 저장하기 위한 배열 선언. 초기에는 색깔이 없으므로 0으로 채웁니다.
    const colorArr = Array(v + 1).fill(0);

    for (let j = 0; j < e; j++) {
      const [node1, node2] = (await ps.readLine())
        .split(" ")
        .map((element) => parseInt(element));

      graphArr[node1].push(node2);
      graphArr[node2].push(node1);
    }
    result.push(check_BipartiteGraph(graphArr, colorArr));
  }

  for (const i of result) {
    console.log(i);
  }

  // bfs를 이용해서 이분 그래프 찾기
  function check_BipartiteGraph(graphArr, colorArr) {
    const queue = [];

    // 간선이 서로 이어지지 않은 그래프들도 존재합니다.
    for (let i = 1; i < graphArr.length; i++) {
      queue.unshift(i);

      if (colorArr[i] === 0) {
        colorArr[i] = 1;
      }

      while (queue.length) {
        const vertex = queue.pop();

        for (const j of graphArr[vertex]) {
          if (colorArr[j] === 0) {
            colorArr[j] = -colorArr[vertex];
            queue.unshift(j);
          } else {
            if (colorArr[vertex] === colorArr[j]) {
              return "NO";
            }
          }
        }
      }
    }

    return "YES";
  }
});
