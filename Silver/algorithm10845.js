// 원동균 / 10845 / 큐
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
  const queue = [];
  let result = "";

  const q_push = (num) => {
    queue.push(parseInt(num));
  };

  const q_pop = () => {
    return queue.length > 0 ? queue.shift() : -1;
  };

  const q_size = () => {
    return queue.length;
  };

  const q_empty = () => {
    return queue.length > 0 ? 0 : 1;
  };

  const q_front = () => {
    return queue.length > 0 ? queue[0] : -1;
  };

  const q_back = () => {
    return queue.length > 0 ? queue[queue.length - 1] : -1;
  };

  for (let i = 0; i < N; i++) {
    const order = (await ps.readLine()).split(" ");

    if (order[0] === "push") q_push(order[1]);
    if (order[0] === "pop") result += `${q_pop()}\n`;
    if (order[0] === "size") result += `${q_size()}\n`;
    if (order[0] === "empty") result += `${q_empty()}\n`;
    if (order[0] === "front") result += `${q_front()}\n`;
    if (order[0] === "back") result += `${q_back()}\n`;
  }

  console.log(result);
});
