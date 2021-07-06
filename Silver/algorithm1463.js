// 원동균 / 1463 / 1로 만들기

"use strict";

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
  let n = await ps.readLine();
  const dpArr = new Array(n + 1);

  dpArr[0] = 0;
  dpArr[1] = 0;

  console.log(n < 2 ? dpArr[1] : memo(n, dpArr));

  function memo(n, dpArr) {
    let num = 2;

    while (num <= n) {
      // 전의 연산에다가 1을 더함 (1을 뺀다 방법)
      dpArr[num] = dpArr[num - 1] + 1;

      // 만약 2로 나누어 떨어졌을 때, 해당 배열에 + 1한것보다 크다면 해당 값으로 대체
      if (num % 2 == 0 && dpArr[num / 2] + 1 < dpArr[num]) {
        dpArr[num] = dpArr[num / 2] + 1;
      }

      // 만약 3로 나누어 떨어졌을 때, 해당 배열에 + 1한것보다 크다면 해당 값으로 대체
      if (num % 3 == 0 && dpArr[num / 3] + 1 < dpArr[num]) {
        dpArr[num] = dpArr[num / 3] + 1;
      }
      num += 1;
    }

    return dpArr[num - 1];
  }
});
