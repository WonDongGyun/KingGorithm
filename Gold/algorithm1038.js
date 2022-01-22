// 원동균 / 1038 / 감소하는 수
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
    async readheapayLine() {
      const line = await readLine();
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

  let arr = [];
  //10C1 + 10C2 + ... 10C10 = 2^10 - 1 = 1023
  for (let i = 1; i <= 1023; i++) {
    let num = 0;
    let tmp_i = i;
    for (let idx = 9; idx >= 0; idx--) {
      if (tmp_i % 2 == 1) {
        num = 10 * num + idx;
      }
      tmp_i = Math.floor(tmp_i / 2);
    }
    // if (i <= 20) num, i;
    arr.push(num);
  }

  arr.sort((a, b) => a - b);

  if (N > 1022) {
    console.log(-1);
  } else {
    console.log(arr[N]);
  }
});
