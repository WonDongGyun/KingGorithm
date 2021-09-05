// 원동균 / 1654 / 랜선 자르기

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
  const kn = (await ps.readLine())
    .split(" ")
    .map((element) => parseInt(element));

  const lan = [];

  for (let i = 0; i < kn[0]; i++) {
    lan.push(parseInt(await ps.readLine()));
  }

  lan.sort((a, b) => a - b);
  console.log(findMaxLan(kn[1], lan));

  // 이분 탐색 시작
  function findMaxLan(target, lan) {
    // 가장 작은 랜선의 길이를 1cm로 설정하고 가장 긴 랜선의 길이는 주어진 값중 가장 큰 값으로 설정한다.
    let left = 1;
    let right = lan[lan.length - 1];
    let maxLength = 0;

    while (left <= right) {
      let middle = parseInt((left + right) / 2);
      let lanNum = lan.reduce((acc, cur) => {
        return acc + parseInt(cur / middle);
      }, 0);

      // 자를 수 있는 랜선 최대값을 구하는 문제이므로, 랜선이 늘어나는 쪽으로 구해야 한다.
      if (lanNum >= target) {
        if (middle >= maxLength) {
          maxLength = middle;
        }
        left = middle + 1;
      } else {
        right = middle - 1;
      }
    }

    return maxLength;
  }
});
