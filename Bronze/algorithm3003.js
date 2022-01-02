// 원동균 / 3003 / 킹, 퀸, 룩, 비숍, 나이트, 폰
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
  const chess = (await ps.readLine())
    .split(" ")
    .map((element) => parseInt(element));

  const result = chess.map((element, index) => {
    if (index === 0 || index === 1) {
      if (element === 0) {
        return 1;
      } else if (element === 1) {
        return 0;
      } else {
        return 1 - element;
      }
    }
    if (index === 2 || index === 3 || index === 4) {
      if (element === 0) {
        return 2;
      } else if (element === 2) {
        return 0;
      } else {
        return element === 1 ? 1 : 2 - element;
      }
    }

    if (index === 5) {
      if (element === 0) {
        return 8;
      } else if (element === 8) {
        return 0;
      } else {
        return 8 - element;
      }
    }
  });

  console.log(result.join(" "));
});
