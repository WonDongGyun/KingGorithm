// 원동균 / 14888 / 연산자 끼워넣기
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
  const N = parseInt(await ps.readLine());

  const arr = (await ps.readLine())
    .split(" ")
    .map((element) => parseInt(element));
  const opNumArr = (await ps.readLine())
    .split(" ")
    .map((element) => parseInt(element));

  const results = [];

  let max = -Infinity;
  let min = Infinity;

  opDFS(opNumArr[0], opNumArr[1], opNumArr[2], opNumArr[3], 1, arr[0]);

  // -0으로 출력된다. 자바스크립트의 number가 실수형이라서 +0과 -0이 나온다고 합니다.
  // 그래서 -0으로 출력되는걸 0으로 고치게 한 코드입니다. -0과 0은 같습니다. 하지만 정답이 아니라서 오류가 난거죠
  console.log(Math.max(...results) === 0 ? 0 : Math.max(...results));
  console.log(Math.min(...results) === 0 ? 0 : Math.min(...results));

  function opDFS(plus, minus, multi, divide, count, result) {
    if (count === N) {
      results.push(result);
    }

    if (plus > 0)
      opDFS(plus - 1, minus, multi, divide, count + 1, result + arr[count]);
    if (minus > 0)
      opDFS(plus, minus - 1, multi, divide, count + 1, result - arr[count]);
    if (multi > 0)
      opDFS(plus, minus, multi - 1, divide, count + 1, result * arr[count]);
    if (divide > 0)
      opDFS(
        plus,
        minus,
        multi,
        divide - 1,
        count + 1,
        parseInt(result / arr[count])
      );
  }
});
