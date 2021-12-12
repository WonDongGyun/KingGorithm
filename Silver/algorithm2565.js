// 원동균 / 2565 / 전깃줄
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
  const elec = [];
  for (let i = 0; i < N; i++) {
    elec.push(
      (await ps.readLine()).split(" ").map((element) => parseInt(element))
    );
  }

  elec.sort((a, b) => a[0] - b[0]);
  const dp = Array.from(new Array(N).fill(1));

  const LIS = (arr, dp) => {
    let result = 1;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < i; j++) {
        if (arr[i][1] > arr[j][1]) {
          // 줄이 안겹치기 위해서는 B 전봇대의 값이 더 커야 가능하다.
          dp[i] = Math.max(dp[i], dp[j] + 1);
        }
      }
      result = Math.max(dp[i], result);
    }

    return result;
  };

  console.log(N - LIS(elec, dp));
});
