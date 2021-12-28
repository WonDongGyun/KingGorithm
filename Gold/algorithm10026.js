// 원동균 / 10026 / 적록색약
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
    async readheapayLine() {
      const line = await readLine();
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
  const colorArr = [];
  const blindArr = [];
  let colorCnt = 0;
  let blindCnt = 0;

  const bfs = (r, c, arr) => {
    let x = [0, 1, 0, -1];
    let y = [1, 0, -1, 0];
    const queue = [[r, c]];

    if (arr[r][c] === 0) {
      return 0;
    }

    while (queue.length > 0) {
      const loc = queue.pop();
      const row = loc[0];
      const col = loc[1];
      const color = arr[row][col];

      arr[row][col] = 0;

      for (let i = 0; i < x.length; i++) {
        if (
          row + y[i] > -1 &&
          row + y[i] < N &&
          col + x[i] > -1 &&
          col + x[i] < N
        ) {
          if (arr[row + y[i]][col + x[i]] === color && color != 0) {
            queue.unshift([row + y[i], col + x[i]]);
          }
        }
      }
    }

    return 1;
  };

  for (let i = 0; i < N; i++) {
    const input = (await ps.readLine()).split("");
    colorArr.push(input);
    blindArr.push(
      input.map((element) => {
        if (element === "G") element = "R";
        return element;
      })
    );
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      colorCnt += bfs(i, j, colorArr);
      blindCnt += bfs(i, j, blindArr);
    }
  }

  console.log(`${colorCnt} ${blindCnt}`);
});
