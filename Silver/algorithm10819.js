// 원동균 / 10819 / 차이를 최대로

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
  let num = parseInt(await ps.readLine());
  let n = await ps.readLine();
  const arr = n.split(" ").map((element) => parseInt(element));
  arr.sort((a, b) => a - b);
  const combiArr = combination(arr, num);
  console.log(combiArr);
  // ps.writeLine(findMax(combiArr));

  // 순열 구하기
  function combination(arr, num) {
    let result = [];
    if (num == 1) return arr.map((e) => [e]);

    arr.forEach((e, i, array) => {
      let rest = [...array.slice(0, i), ...array.slice(i + 1)];
      let combinations = combination(rest, num - 1);
      let combiArr = combinations.map((x) => [e, ...x]);
      result.push(...combiArr);
    });
    return result;
  }

  // 최대값 구하기
  function findMax(arr) {
    let result = [];

    for (let i = 0; i < combiArr.length; i++) {
      let point = 0;

      for (let j = 0; j < combiArr[i].length - 1; j++) {
        point += Math.abs(combiArr[i][j] - combiArr[i][j + 1]);
      }

      result.push(point);
    }

    return Math.max(...result);
  }
});
