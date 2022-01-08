// 원동균 / 9653 / 스타워즈 로고
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
  console.log("    8888888888  888    88888");
  console.log("   88     88   88 88   88  88");
  console.log("    8888  88  88   88  88888");
  console.log("       88 88 888888888 88   88");
  console.log("88888888  88 88     88 88    888888");
  console.log("");
  console.log("88  88  88   888    88888    888888");
  console.log("88  88  88  88 88   88  88  88");
  console.log("88 8888 88 88   88  88888    8888");
  console.log(" 888  888 888888888 88  88      88");
  console.log("  88  88  88     88 88   88888888");
});
