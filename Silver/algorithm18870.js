// 원동균 / 18870 / 좌표 압축
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

  const A = (await ps.readLine())
    .split(" ")
    .map((element) => parseInt(element));

  const A_sort = Array.from(new Set(A.slice())).sort((a, b) => a - b);

  const compression = (loc) => {
    let left = 0;
    let right = A_sort.length - 1;

    while (left <= right) {
      const mid = parseInt((left + right) / 2);

      if (loc > A_sort[mid]) {
        left = mid + 1;
      } else if (loc < A_sort[mid]) {
        right = mid - 1;
      } else {
        return mid;
      }
    }
  };

  const compress = A.map((element) => {
    return compression(element);
  });

  console.log(compress.join(" "));
});
