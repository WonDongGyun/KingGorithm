// 원동균 / 2110 / 공유기 설치

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
  const nc = (await ps.readLine())
    .split(" ")
    .map((element) => parseInt(element));

  const house = [];

  for (let i = 0; i < nc[0]; i++) {
    house.push(parseInt(await ps.readLine()));
  }
  house.sort((a, b) => a - b);
  console.log(findDistance(nc[1], house));

  function findDistance(routerCnt, house) {
    // 최소거리 = 1, 최대 거리 = 처음 집과 마지막 집 사이의 거리
    let left = 1;
    let right = house[house.length - 1] - house[0];
    let maxLength = 0;

    while (left <= right) {
      let middle = parseInt((left + right) / 2);
      let count = 1;

      // 항상 처음 설치하는 공유기는 첫번째 집에 설치하는 것이 유리하다.
      let stand = house[0];
      for (let i = 1; i < house.length; i++) {
        if (house[i] - stand >= middle) {
          count++;
          stand = house[i];
        }
      }

      // 두 공유기 사이를 최대로 하는 문제이므로, left가 늘어나는 쪽으로 구하여야 한다.
      if (count >= routerCnt) {
        left = middle + 1;
        maxLength = Math.max(maxLength, middle);
      } else {
        right = middle - 1;
      }
    }

    return maxLength;
  }
});
