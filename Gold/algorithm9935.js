// 원동균 / 9935 / 문자열 폭팔
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
  const word = await ps.readLine();
  const bomb = await ps.readLine();
  const stack = [];

  for (let p = 0; p < word.length; p++) {
    stack.push(word.substr(p, 1));
    while (true) {
      let top = stack.length - 1;
      let bottom = top - (bomb.length - 1);
      let w = "";

      if (bottom > -1) {
        for (let i = bottom; i <= top; i++) {
          w += stack[i];
        }
      }

      if (w === bomb) {
        for (let i = 0; i < w.length; i++) {
          stack.pop();
        }
      } else {
        break;
      }
    }
  }

  const result = stack.join("");
  console.log(result === "" ? "FRULA" : result);
});
