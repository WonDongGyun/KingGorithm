// 원동균 / 9095 / 1, 2, 3 더하기
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
  const dp = new Array(12).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  dp[2] = 2;

  const result = [];

  const recursion = (num) => {
    if (dp[num] == 0) {
      dp[num] = recursion(num - 3) + recursion(num - 2) + recursion(num - 1);
    }
    return dp[num];
  };

  for (let i = 0; i < T; i++) {
    const num = parseInt(await ps.readLine());
    result.push(recursion(num));
  }

  for (const index of result) {
    console.log(index);
  }
});
