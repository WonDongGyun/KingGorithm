// 원동균 / 7562 / 나이트의 이동

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
    // 체스판 크기
    const chessH = parseInt(await ps.readLine());
    // 나이트 위치
    const [knightY, knightX] = (await ps.readLine())
      .split(" ")
      .map((element) => parseInt(element));
    // 목적지 위치
    const [endY, endX] = (await ps.readLine())
      .split(" ")
      .map((element) => parseInt(element));

    result.push(chessCase(chessH, knightY, knightX, endY, endX));
  }

  for (const i in result) {
    console.log(result[i]);
  }

  // bfs 최단 경로 찾기
  function chessCase(chessH, knightY, knightX, endY, endX) {
    const queue = [];
    const chess = Array.from(Array(chessH), () => Array(chessH).fill(0));

    // 나이트가 이동 가능한 위치 배열
    const locYArr = [-1, -2, 1, 2, -1, -2, 1, 2];
    const locXArr = [-2, -1, -2, -1, 2, 1, 2, 1];

    queue.unshift([knightY, knightX]);

    while (queue.length) {
      const [i, j] = queue.pop();

      if (i === endY && j === endX) {
        return chess[i][j];
      }

      for (let k = 0; k < locYArr.length; k++) {
        const locY = i + locYArr[k];
        const locX = j + locXArr[k];

        if (
          locY >= 0 &&
          locY <= chessH - 1 &&
          locX >= 0 &&
          locX <= chessH - 1 &&
          chess[locY][locX] === 0
        ) {
          queue.unshift([locY, locX]);
          chess[locY][locX] = chess[i][j] + 1;
        }
      }
    }
  }
});
