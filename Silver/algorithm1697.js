// 원동균 / 1697 / 숨바꼭질

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
  const [start, end] = (await ps.readLine())
    .split(" ")
    .map((element) => parseInt(element));

  // 방문 배열 선언
  const visited = Array(100001).fill(false);
  const queue = [];
  queue.unshift([start, 0]);

  while (queue.length) {
    const [loc, count] = queue.pop();

    // 해당 노드를 방문하지 않았다면 수행
    if (visited[loc] === false) {
      visited[loc] = true;
      if (loc === end) {
        console.log(count);
        break;
      }

      if (loc - 1 >= 0) queue.unshift([loc - 1, count + 1]);
      if (loc + 1 <= 100000) queue.unshift([loc + 1, count + 1]);
      if (loc * 2 <= 100000) queue.unshift([loc * 2, count + 1]);
    }
  }
});
