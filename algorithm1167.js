// 원동균 / 1167 / 트리의 지름
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
  const V = parseInt(await ps.readLine());

  const vertax = Array.from(Array(V + 1).fill(0), () => Array(V + 1).fill(0));
  const stack = [];
  let max = 0;

  for (let i = 0; i < V; i++) {
    const dis = (await ps.readLine())
      .split(" ")
      .map((element) => parseInt(element));

    for (let j = 1; j < dis.length; j++) {
      if (j % 2 !== 0 && dis[j] !== -1) {
        vertax[dis[0]][dis[j]] = dis[j + 1];
      }
    }
  }
  console.log(vertax);

  function dfs() {}
});
