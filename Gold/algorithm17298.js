// 원동균 / 17298 / 오큰수

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
  const a = parseInt(await ps.readLine());
  const numStr = await ps.readLine();
  const seq = numStr.split(" ").map((element) => parseInt(element));
  const stack = [];

  for (const i in seq) {
    // 스택에 값이 존재하고, 스택의 top이 현재 seq[i]보다 작으면, 해당 스택을 pop하고 해당 seq에 seq[i]의 값을 넣는다.
    while (stack.length >= 1 && seq[stack[stack.length - 1]] < seq[i]) {
      seq[stack.pop()] = seq[i];
    }

    // 스택에는 해당 인덱스만 push한다.
    stack.push(i);
  }

  // stack에 잔여값이 남은 경우, 해당 인덱스를 모두 -1로 처리한다.
  while (stack.length >= 1) {
    seq[stack.pop()] = -1;
  }
  console.log(seq.join(" "));
});
