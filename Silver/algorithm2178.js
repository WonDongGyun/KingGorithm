// 원동균 / 2178 / 미로 탐색

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
  const mazeInfo = (await ps.readLine())
    .split(" ")
    .map((element) => parseInt(element));

  const maze = [];

  for (let i = 0; i < mazeInfo[0]; i++) {
    maze.push(
      (await ps.readLine()).split("").map((element) => parseInt(element))
    );
  }

  console.log(exitMaze(maze, 0, 0));

  // DFS 방법으로 풀면 시간초과 혹은 복잡한 로직이 생기기 때문에 최단 경로를 찾을 때는 BFS로 해결하는 것이 유리하다.
  function exitMaze(maze, i, j) {
    // 상 하 좌 우 계산을 위한 위치값 배열
    const locYArr = [1, -1, 0, 0];
    const locXArr = [0, 0, -1, 1];

    // unshift를 사용해서 배열의 좌측부터 넣어줌
    const queue = [];
    queue.unshift([i, j]);

    // 큐 안에 내용물이 남아있을 때만 반복
    while (queue.length > 0) {
      const [i, j] = queue.pop();

      // 상 하 좌 우 적용하여 해당 위치에서 갈 수 있는 방향을 찾음
      for (let k = 0; k < 4; k++) {
        const locY = i + locYArr[k];
        const locX = j + locXArr[k];

        if (
          locY >= 0 &&
          locY < maze.length &&
          locX >= 0 &&
          locX < maze[0].length &&
          maze[locY][locX] == 1
        ) {
          queue.unshift([locY, locX]);
          maze[locY][locX] = maze[i][j] + 1;
        }
      }
    }

    return maze[maze.length - 1][maze[0].length - 1];
  }
});
