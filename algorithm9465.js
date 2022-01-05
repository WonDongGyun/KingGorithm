// 원동균 / 9465 / 스티커
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
  const T = parseInt(await ps.readLine());
  let result = "";

  for (let i = 0; i < T; i++) {
    const col = parseInt(await ps.readLine());
    const sticker = [];
    const dp = Array.from(Array(2), () => new Array(col).fill(0));

    for (let j = 0; j < 2; j++) {
      sticker.push((await ps.readLine()).split(" ").map((el) => parseInt(el)));
    }

    dp[0][0] = sticker[0][0];
    dp[1][0] = sticker[1][0];

    if (col === 1) {
      result += `${Math.max(dp[0][0], dp[1][0])}\n`;
      continue;
    }

    if (col >= 2) {
      dp[0][1] = dp[1][0] + sticker[0][1];
      dp[1][1] = dp[0][0] + sticker[1][1];

      if (col === 2) {
        result += `${Math.max(dp[0][1], dp[1][1])}\n`;
        continue;
      }

      for (let j = 2; j <= col; j++) {
        dp[0][j] = sticker[0][j] + Math.max(dp[1][j - 1], dp[1][j - 2]);
        dp[1][j] = sticker[1][j] + Math.max(dp[0][j - 1], dp[0][j - 2]);
      }

      result += `${Math.max(dp[0][col - 1], dp[1][col - 1])}\n`;
      continue;
    }
  }

  console.log(result);
});
