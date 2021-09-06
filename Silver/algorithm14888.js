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

  let max = -1000000001;
  let min = 1000000001;

  opDFS(opNumArr[0], opNumArr[1], opNumArr[2], opNumArr[3], 1, arr[0]);

  console.log(max);
  console.log(min);

  function opDFS(plus, minus, multi, divide, count, result) {
    if (count === N) {
      max = Math.max(max, result);
      min = Math.min(min, result);
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
