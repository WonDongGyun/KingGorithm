// 원동균 / 2206 / 벽 부수고 이동하기

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
  const [row, col] = (await ps.readLine())
    .split(" ")
    .map((element) => parseInt(element));

  const maze = [];

  for (let i = 0; i < row; i++) {
    maze.push(
      (await ps.readLine()).split("").map((element) => parseInt(element))
    );
  }
  maze[0][0] = 1;

  console.log(mazeExit(maze));

  // bfs
  function mazeExit(maze) {
    const queue = [];

    // 3차원 배열 선언. 한 쪽은 벽이 부숴지지 않았을 경우, 다른 한 쪽은 벽이 부숴진 경우의 3차원 배열
    const visited = Array.from(Array(row), () =>
      Array(col)
        .fill(0)
        .map(() => Array(2).fill(0))
    );
    visited[0][0][0] = 1;

    //상 하 좌 우
    const locYArr = [1, -1, 0, 0];
    const locXArr = [0, 0, -1, 1];
    queue.unshift([0, 0, 0]);

    while (queue.length) {
      const [i, j, broken] = queue.pop();

      // 만약 i, j가 끝에 도달하면 반환한다.
      if (i === row - 1 && j === col - 1) {
        return visited[i][j][broken];
      }

      for (let k = 0; k < 4; k++) {
        const locY = i + locYArr[k];
        const locX = j + locXArr[k];

        if (locY >= 0 && locX >= 0 && locY <= row - 1 && locX <= col - 1) {
          if (maze[locY][locX] === 1 && broken === 0) {
            // 부순 벽이 하나도 없고, 다음 좌표에 벽이 존재한다면 부순다.

            queue.unshift([locY, locX, 1]);
            visited[locY][locX][1] = visited[i][j][0] + 1;
          }

          // 일반 길은 지나간다.
          if (maze[locY][locX] === 0 && visited[locY][locX][broken] === 0) {
            queue.unshift([locY, locX, broken]);
            visited[locY][locX][broken] = visited[i][j][broken] + 1;
          }
        }
      }
    }
    return -1;
  }
});
