// 원동균 / 1092 / 배
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
  const crane = (await ps.readLine()).split(" ").map((el) => parseInt(el));
  const M = parseInt(await ps.readLine());
  const box = (await ps.readLine()).split(" ").map((el) => parseInt(el));
  let result = 0;

  crane.sort((a, b) => b - a);
  box.sort((a, b) => b - a);

  if (crane[0] < box[0]) {
    console.log(-1);
  } else {
    while (box.length != 0) {
      // 하나의 크래인은 하나의 상자만 옮길 수 있습니다.
      // 따라서 하나 옮기면 다음 크레인을 사용해서 옮겨야 합니다.
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
          if (crane[i] >= box[j]) {
            box.splice(j, 1);
            break;
          }
        }
      }

      // N개의 크래인을 사용해서 box를 옮긴후 상자가 빌때까지 다시 while 루프를 수행합니다.
      result++;
    }
    console.log(result);
  }
});
