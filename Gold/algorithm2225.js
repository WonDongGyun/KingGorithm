// 원동균 / 2225 / 합분해
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
  const [N, K] = (await ps.readLine()).split(" ").map((el) => parseInt(el));
  const dp = Array.from(Array(K + 1), () => new Array(N + 1).fill(0));
  const mod = 1000000000;
  // 1개만 골리서 N이 되는 경우의 수는 오직 자신뿐입니다.
  for (let i = 0; i <= N; i++) {
    dp[1][i] = 1;
  }

  // 1은 위에서 처리했으니까 2부터 시작
  // Down -> Top
  // dp[k][n] = dp[k - 1][0] + dp[k - 1][1] + ... + dp[k - 1][n]
  for (let i = 2; i <= K; i++) {
    for (let j = 0; j <= N; j++) {
      for (let k = 0; k <= j; k++) {
        dp[i][j] = (dp[i][j] + dp[i - 1][j - k]) % mod;
      }
    }
  }

  console.log(dp[K][N]);
});
