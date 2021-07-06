// 원동균 / 1463 / 쉬운 계단수

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
  let n = parseInt(await ps.readLine());
  const dpArr = Array.from(Array(n + 1), () => new Array(10));

  // 한자리 수에서 0으로 끝나는 숫자는 존재하지 않는다.
  dpArr[1][0] = 0;
  for (let i = 1; i < 10; i++) {
    dpArr[1][i] = 1;
  }

  console.log(n === 1 ? 9 : memo(n, dpArr));

  function memo(n, dpArr) {
    let digit = 2;

    while (digit <= n) {
      for (let i = 0; i < 10; i++) {
        // 마지막 숫자가 0으로 끝난다면, 이전 배열의 [1]과 같다

        if (i == 0) {
          dpArr[digit][i] = dpArr[digit - 1][1] % 1000000000;
        }

        // 마지막 숫자가 1 ~ 8로 끝난다면, 그 숫자에서 [-1], [+1] 한 것과 같다.
        if (i >= 1 && i <= 8) {
          dpArr[digit][i] =
            (dpArr[digit - 1][i - 1] + dpArr[digit - 1][i + 1]) % 1000000000;
        }

        // 마지막 숫자가 9로 끝난다면, 이전 배열의 [8]과 같다.
        if (i == 9) {
          dpArr[digit][i] = dpArr[digit - 1][8] % 1000000000;
        }
      }

      digit += 1;
    }

    return dpArr[digit - 1].reduce((acc, cur, index) => {
      return (acc + cur) % 1000000000;
    }, 0);
  }
});
