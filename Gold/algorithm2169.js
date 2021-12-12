// 원동균 / 2169 / 로봇 조종하기
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
  const [r, c] = (await ps.readLine())
    .split(" ")
    .map((element) => parseInt(element));

  const right = Array.from(new Array(c).fill(0));
  const left = Array.from(new Array(c).fill(0));

  const mars = [];
  for (let i = 0; i < r; i++) {
    mars.push(
      (await ps.readLine()).split(" ").map((element) => parseInt(element))
    );
  }

  const dp = Array.from(Array(r), () => new Array(c).fill(0));

  const robot = (mars, dp, r, c) => {
    // (첫 시작은 1,1이다.)
    dp[0][0] = mars[0][0];

    // DP의 기준 만들기 (첫 시작이 1,1이기 때문에 오른쪽 방향으로 갈 수 밖에 없다.)
    for (let col = 1; col < c; col++) {
      dp[0][col] = dp[0][col - 1] + mars[0][col];
    }

    for (let row = 1; row < r; row++) {
      //오른쪽의 누적값을 구하기 위한 계산 시작값 만들기
      // 바로 윗줄의 최대 누적값과 현재 행의 값을 더해서 가치값을 구한다.
      right[0] = dp[row - 1][0] + mars[row][0];

      // 왼쪽 끝 >>> 오른쪽 끝 으로 이동해나가면서 바로 윗줄에서 구한 dp값들과 비교해가며 해당 경로까지의 가장 높은 가치값을 구함.
      for (let col = 1; col < c; col++) {
        right[col] =
          Math.max(right[col - 1], dp[row - 1][col]) + mars[row][col];
      }

      left[c - 1] = dp[row - 1][c - 1] + mars[row][c - 1];
      for (let col = c - 2; col > -1; col--) {
        left[col] = Math.max(left[col + 1], dp[row - 1][col]) + mars[row][col];
      }

      // 오른쪽 배열과 왼쪽 배열을 비교하여 최대값만 dp에 저장
      for (let col = 0; col < c; col++) {
        dp[row][col] = Math.max(right[col], left[col]);
      }
    }

    return dp[r - 1][c - 1];
  };

  console.log(robot(mars, dp, r, c));
});
