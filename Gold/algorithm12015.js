// 원동균 / 12015 / 가장 긴 증가하는 부분 수열 2

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
  const arr = (await ps.readLine())
    .split(" ")
    .map((element) => parseInt(element));

  console.log(findLis(arr));

  function findLis(arr) {
    // 함수 인자로 들어오는 배열은 정렬되어 있을 필요가 없습니다.
    // 하나의 배열을 준비하고, 해당 배열에 값을 넣으면서 이분 탐색을 진행합니다.

    let result = [];

    for (const i of arr) {
      // 만약 result에 아무런 값이 없거나, result[result.length - 1] < i 조건에 만족하면 반환 배열에 추가합니다.
      if (result.length === 0 || result[result.length - 1] < i) {
        result.push(i);
      } else {
        let left = 0;
        let right = result.length;

        // 이분 탐색을 진행하며 i의 값보다 큰 숫자가 나오는 지점을 찾습니다. (lower Bound)
        // 해당 숫자보다 큰 수가 나오는 시점의 값과 i의 값을 비교해 최소값이 해당 지점의 값이 됩니다.
        while (left < right) {
          let middle = parseInt((left + right) / 2);
          if (result[middle] >= i) {
            right = middle;
          } else {
            left = middle + 1;
          }
        }

        result[right] = Math.min(result[right], i);
      }
    }

    return result.length;
  }
});
