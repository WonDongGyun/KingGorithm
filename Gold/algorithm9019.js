// 원동균 / 9019 / DSLR
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
  const T = parseInt(await ps.readLine());
  let result = "";

  // unshift, pop을 사용하면 시간 초과가 발생합니다.

  const bps = (A, B) => {
    const queue = [];
    const visited = Array(10000).fill(false);

    queue.push([A, ""]);

    while (queue.length > 0) {
      const [before, command] = queue.shift();
      visited[before] = true;

      if (before === B) return command;

      // 각 if 문마다 새로운 값들이 queue로 들어갑니다.

      let after = 0;
      after = (2 * before) % 10000;
      if (!visited[after]) {
        queue.push([after, command + "D"]);
        visited[after] = true;
      }

      after = before === 0 ? 9999 : before - 1;
      if (!visited[after]) {
        queue.push([after, command + "S"]);
        visited[after] = true;
      }

      after = (before % 1000) * 10 + parseInt(before / 1000);
      if (!visited[after]) {
        queue.push([after, command + "L"]);
        visited[after] = true;
      }

      after = (before % 10) * 1000 + parseInt(before / 10);
      if (!visited[after]) {
        queue.push([after, command + "R"]);
        visited[after] = true;
      }
    }
  };

  for (let i = 0; i < T; i++) {
    const [A, B] = (await ps.readLine())
      .split(" ")
      .map((element) => parseInt(element));

    result += `${bps(A, B)}\n`;
  }
  console.log(result);
});
