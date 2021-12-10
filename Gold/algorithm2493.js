// 원동균 / 2493 / 탑
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
  const number = parseInt(await ps.readLine());

  const stack = [];
  const result = [];

  const arr = (await ps.readLine())
    .split(" ")
    .map((element) => parseInt(element));

  function checkStack(num, index) {
    while (true) {
      if (stack.length === 0) {
        result.push(0);
        stack.push(index + 1);
        break;
      }

      const top = stack.length - 1;

      if (arr[stack[top] - 1] < num) {
        stack.pop();
      } else if (arr[stack[top] - 1] >= num) {
        result.push(stack[top]);

        if (arr[stack[top] - 1] > num) {
          stack.push(index + 1);
        } else {
          stack.pop();
          stack.push(index + 1);
        }

        break;
      }
    }
  }

  for (let i = 0; i < arr.length; i++) {
    checkStack(arr[i], i);
  }

  console.log(result.join(" "));
});
