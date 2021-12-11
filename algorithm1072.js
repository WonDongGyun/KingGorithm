// 원동균 / 1072 / 게임
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
  const [X, Y] = (await ps.readLine())
    .split(" ")
    .map((element) => parseInt(element));

  const winR = Math.floor(Y / (X / 100));

  const cal = function (X, Y) {
    let right = 1000000000;
    let left = 1;
    let result = -1;

    while (left <= right) {
      const mid = parseInt((right + left) / 2);
      const cal_winR = Math.floor((Y + mid) / ((X + mid) / 100));

      if (winR >= cal_winR) {
        left = mid + 1;
      } else {
        right = mid - 1;
        result = mid;
      }
    }

    return result;
  };

  if (winR === 99 || winR === 100) {
    console.log(-1);
  } else {
    console.log(cal(X, Y));
  }
});
