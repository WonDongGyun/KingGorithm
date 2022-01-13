// 원동균 / 2096 / 내려가기
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
  const dp = [0, 0, 0];

  for (let i = 0; i < N; i++) {
    const arr = (await ps.readLine())
      .split(" ")
      .map((element) => parseInt(element));

    if (i == 0) {
      dpMax[0] = arr[0];
      dpMax[1] = arr[1];
      dpMax[2] = arr[2];

      dpMin[0] = arr[0];
      dpMin[1] = arr[1];
      dpMin[2] = arr[2];
    } else {
      dpMax[0] = Math.max(dpMax[0] + arr[0], dpMax[0] + arr[1]);
      dpMin[0] = Math.min(dpMin[0] + arr[0], dpMin[0] + arr[1]);

      dpMax[1] = Math.max(
        Math.max(dpMax[1] + arr[0], dpMax[1] + arr[1]),
        dpMax[1] + arr[2]
      );
      dpMin[1] = Math.min(
        Math.min(dpMin[1] + arr[0], dpMin[1] + arr[1]),
        dpMin[1] + arr[2]
      );

      dpMax[2] = Math.max(dpMax[2] + arr[1], dpMax[2] + arr[2]);
      dpMin[2] = Math.min(dpMin[2] + arr[1], dpMin[2] + arr[2]);
    }
  }

  console.log(Math.max(...dpMax) + " " + Math.min(...dpMin));
});
