// 원동균 / 2133 / 타일 채우기
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
  const dp = Array(31).fill(0);
  dp[0] = 1;
  dp[2] = 3;

  // n = 홀수일 경우에는 방법이 존재하지 않기 때문에 0입니다.
  for (let i = 4; i <= N; i += 2) {
    dp[i] = dp[i - 2] * 3;

    // 4 이상부터 채울수 있는 방법당 2가지의 경우의수가 추가됩니다.
    for (let j = 4; j <= i; j += 2) {
      dp[i] += dp[i - j] * 2;
    }
  }

  console.log(dp[N]);
});
