// 원동균 / 1300 / k번째 수

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
  const n = parseInt(await ps.readLine());
  const k = parseInt(await ps.readLine());

  console.log(findBk(n, k));

  function findBk(n, k) {
    // 해당 문제의 배열은 (0,0)이 아닌 (1,1) 부터 시작입니다. 따라서 left를 1로 설정합니다.
    // right는 k로 설정합니다. k는  min(10^9, N2)보다 작거나 같은 자연수이기 때문입니다.
    let left = 1;
    let right = k;
    let bk = 0;

    while (left <= right) {
      // middle값이 B[k]의 역할을 합니다.
      let middle = parseInt((left + right) / 2);
      let count = 0;

      // B[k]보다 작은 값을 찾기 위해 2차원 배열이 있다고 가정합니다.
      // i는 행의 역할을 하며, 배열은 1행 부터 시작한다고 가정합니다.
      // 각 행에서 B[k]보다 작은 값들의 개수는 다음과 같은 연산으로 구할 수 있습니다.
      for (let i = 1; i <= n; i++) {
        count += Math.min(parseInt(middle / i), n);
      }

      //B[k]보다 작은 값의 수가 k값과 같을 때까지 right를 줄입니다. 그래야 k값과 같은 작은 값의 수를 얻을 수 있습니다.
      // B[k]보다 작은 값의 수가 k값 보다 작다면 left를 키웁니다. 그래야 작은 값의 범위가 늘어납니다.
      if (count >= k) {
        right = middle - 1;
        bk = middle;
      } else {
        left = middle + 1;
      }
    }

    return bk;
  }
});
