// 원동균 / 1620 / 나는야 포켓몬 마스터 이다솜
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
  const [N, M] = (await ps.readLine())
    .split(" ")
    .map((element) => parseInt(element));
  const arrMap = new Map();
  const arr = [0];
  let result = "";

  for (let i = 1; i < N + 1; i++) {
    const pokemon = await ps.readLine();
    arrMap.set(pokemon, i);
    arr.push(pokemon);
  }

  for (let i = 0; i < M; i++) {
    const q = await ps.readLine();

    if (!isNaN(parseInt(q))) {
      result += `${arr[q]}\n`;
    } else {
      result += `${arrMap.get(q)}\n`;
    }
  }

  console.log(result);
});
