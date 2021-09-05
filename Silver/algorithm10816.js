// 원동균 / 10816 / 숫자 카드 2

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
  const ownCardNum = parseInt(await ps.readLine());
  const [...own] = (await ps.readLine())
    .split(" ")
    .map((element) => parseInt(element))
    .sort((a, b) => a - b);

  const targetCardNum = parseInt(await ps.readLine());
  const [...target] = (await ps.readLine())
    .split(" ")
    .map((element) => parseInt(element));

  console.log(divide(own, target));

  //이분 탐색 시작
  function divide(own, target) {
    const result = [];

    for (const num of target) {
      const lower = lowerBound(num, own);

      // 만약 값이 존재한다면 lower의 값은 -1이 아닐것이다.
      if (lower === -1) {
        result.push(0);
      } else {
        const upper = upperBound(num, own);
        result.push(upper - lower === 0 ? 1 : upper - lower);
      }
    }

    return result.join(" ");
  }

  // 해당 숫자가 처음 나오는 시점 찾기
  function lowerBound(num, own) {
    let left = 0;
    let right = own.length;
    let middle = 0;
    while (left < right) {
      middle = parseInt((left + right) / 2);
      if (num <= own[middle]) {
        right = middle;
      } else {
        left = middle + 1;
      }
    }

    if (own[left] != num) {
      return -1;
    } else {
      return left;
    }
  }

  // 해당 숫자보다 큰 수가 나오는 시점 찾기
  function upperBound(num, own) {
    let left = 0;
    let right = own.length;
    let middle = 0;
    while (left < right) {
      middle = parseInt((left + right) / 2);
      if (num >= own[middle]) {
        left = middle + 1;
      } else {
        right = middle;
      }
    }

    return left;
  }
});
