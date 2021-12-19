// 원동균 / 2775 / 부녀회장이 될테야
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
  const T = parseInt(await ps.readLine());
  let result = "";
  const rec = (arr, row, col) => {
    if (col === 0) {
      return 0;
    }

    if (arr[row][col] != 0) {
      return arr[row][col];
    }

    return rec(arr, row, col - 1) + rec(arr, row - 1, col);
  };

  for (let i = 0; i < T; i++) {
    const k = parseInt(await ps.readLine());
    const n = parseInt(await ps.readLine());

    const apt = Array.from(Array(k + 1), () => new Array(n + 1).fill(0));

    for (let i = 1; i <= n; i++) {
      apt[0][i] = i;
    }
    result += `${rec(apt, k, n)}\n`;
  }

  console.log(result);
});
