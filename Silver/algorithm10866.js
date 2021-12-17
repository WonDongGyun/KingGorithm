// 원동균 / 10866 / 덱
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
  const deque = [];
  let result = "";

  const dq_push_front = (num) => {
    deque.unshift(parseInt(num));
  };

  const dq_push_back = (num) => {
    deque.push(parseInt(num));
  };

  const dq_pop_front = () => {
    return deque.length > 0 ? deque.shift() : -1;
  };

  const dq_pop_back = () => {
    return deque.length > 0 ? deque.pop() : -1;
  };

  const dq_size = () => {
    return deque.length;
  };

  const dq_empty = () => {
    return deque.length > 0 ? 0 : 1;
  };

  const dq_front = () => {
    return deque.length > 0 ? deque[0] : -1;
  };

  const dq_back = () => {
    return deque.length > 0 ? deque[deque.length - 1] : -1;
  };

  for (let i = 0; i < N; i++) {
    const order = (await ps.readLine()).split(" ");

    if (order[0] === "push_front") dq_push_front(order[1]);
    if (order[0] === "push_back") dq_push_back(order[1]);
    if (order[0] === "pop_front") result += `${dq_pop_front()}\n`;
    if (order[0] === "pop_back") result += `${dq_pop_back()}\n`;
    if (order[0] === "size") result += `${dq_size()}\n`;
    if (order[0] === "empty") result += `${dq_empty()}\n`;
    if (order[0] === "front") result += `${dq_front()}\n`;
    if (order[0] === "back") result += `${dq_back()}\n`;
  }

  console.log(result);
});
