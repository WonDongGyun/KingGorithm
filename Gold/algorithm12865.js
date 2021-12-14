// 원동균 / 12865 / 평범한 배낭
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
  const [n, k] = (await ps.readLine())
    .split(" ")
    .map((element) => parseInt(element));

  const dp = Array.from(Array(n), () => new Array(k).fill(0));
  const arr = [];

  for (let i = 0; i < n; i++) {
    arr.push(
      (await ps.readLine()).split(" ").map((element) => parseInt(element))
    );
  }

  const backpack = (i, w) => {
    // 비교할 물건이 없는 경우
    if (i === n) {
      return 0;
    }

    if (dp[i][w] > 0) {
      return dp[i][w];
    }

    let n1 = 0;

    // 현재 무게와 더하려고 하는 물건의 무게를 더했을때 무게를 넘지 않는가를 확인합니다.
    if (w + arr[i][0] <= k) {
      n1 = arr[i][1] + backpack(i + 1, w + arr[i][0]); // 더하려고 하는 물건을 포함하여 재귀 시작 (해당 물건을 포함했을 때의 최대 가치를 찾기 위함)
    }

    let n2 = backpack(i + 1, w); // 더하려고 하는 물건을 미포함한 경우 (해당 물건을 포함하지 않았을 때, 다른 물건들을 사용해 최대 가치를 찾기 위함)

    // 해당 물건을 포함했을 때와 미포함 했을 때를 비교합니다.
    dp[i][w] = Math.max(n1, n2);
    return dp[i][w];
  };

  console.log(backpack(0, 0));
});
