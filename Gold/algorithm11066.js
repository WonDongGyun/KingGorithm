// 원동균 / 11066 / 파일 합치기
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
  const result = [];
  const N = parseInt(await ps.readLine());

  // 이 문제에서 dp를 직관적으로 사용하기 위해 index 0이 아니라 1부터 시작합니다. 따라서 501의 크기를 갖는 배열을 선언합니다.
  const dp = Array.from(Array(501), () => Array(501).fill(0));
  const sum = Array.from(Array(501).fill(0));

  for (let i = 0; i < N; i++) {
    const K = parseInt(await ps.readLine());
    const novel = (await ps.readLine())
      .split(" ")
      .map((element) => parseInt(element));

    // 입력된 값의 누적합을 구합니다.
    for (let j = 1; j <= K; j++) {
      sum[j] = sum[j - 1] + novel[j - 1];
    }

    result.push(combine(novel, K));
  }

  for (const i of result) {
    console.log(i);
  }

  // 합치기 함수
  // 최소 비용으로 소설을 합치기 위해서는 최소 비용의 부분합을 구해야 합니다.
  function combine(novel, K) {
    for (let i = 1; i < K; i++) {
      for (let j = 1; i + j <= K; j++) {
        dp[j][i + j] = Infinity;

        for (let k = j; k < i + j; k++) {
          dp[j][i + j] = Math.min(
            dp[j][i + j],
            dp[j][k] + dp[k + 1][i + j] + sum[i + j] - sum[j - 1]
          );
        }
      }
    }

    return dp[1][K];
  }
});
