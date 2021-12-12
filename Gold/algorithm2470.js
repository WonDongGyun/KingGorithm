// 원동균 / 2470 / 두 용액
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

  const liquidArr = (await ps.readLine())
    .split(" ")
    .map((element) => parseInt(element));

  liquidArr.sort((a, b) => {
    return a - b;
  });

  const cal = (arr) => {
    let left = 0;
    let right = N - 1;
    let min = 2000000000;
    let liquid_1 = 0;
    let liquid_2 = 0;

    while (left < right) {
      const sumLiquid = arr[left] + arr[right];

      if (min >= Math.abs(sumLiquid)) {
        liquid_1 = arr[left];
        liquid_2 = arr[right];
        min = Math.abs(sumLiquid);
      }

      if (sumLiquid > 0) {
        right--;
      } else {
        left++;
      }
    }

    console.log(liquid_1 + " " + liquid_2);
  };

  cal(liquidArr);
});
