// 원동균 / 4563 / 리벤지 오브 피타고라스
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
  const result = [];
  while (true) {
    const A = parseInt(await ps.readLine());

    if (A === 0) {
      break;
    }

    let k = A * A;
    let ans = 0;
    for (let i = 1; i <= A; i++) {
      if (k % i == 0) {
        if (
          (parseInt(k / i) + i) / 2 == parseInt((parseInt(k / i) + i) / 2) &&
          (parseInt(k / i) - i) / 2 == parseInt((parseInt(k / i) - i) / 2) &&
          parseInt(parseInt(k / i) - i) / 2 > A
        )
          ans++;
      }
    }
    result.push(ans);
  }

  for (let index of result) {
    console.log(index);
  }
});
