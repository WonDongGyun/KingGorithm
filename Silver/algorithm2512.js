// 원동균 / 2512 / 예산
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
  const country = parseInt(await ps.readLine());

  const budgetArr = (await ps.readLine())
    .split(" ")
    .map((element) => parseInt(element));

  const allBudget = parseInt(await ps.readLine());

  const cal = (budgetArr) => {
    let sumBudget = 0;

    for (const index of budgetArr) {
      sumBudget += index;
    }

    const maxBudget = Math.max(...budgetArr);

    if (sumBudget <= allBudget) {
      return maxBudget;
    } else {
      let left = 0;
      let right = maxBudget;
      let result = 0;

      while (left < right) {
        const mid = parseInt((right + left) / 2);
        let sum = 0;

        for (let index of budgetArr) {
          if (index > mid) {
            index = mid;
          }
          sum += index;
        }

        if (sum > allBudget) {
          right = mid - 1;
        } else if (sum < allBudget) {
          left = mid + 1;
          result = mid;
        } else {
          result = mid;
          break;
        }
      }

      return result;
    }
  };

  console.log(cal(budgetArr));
});
