// 원동균 / 2740 / 행렬 곱셈

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
  const [n, m] = (await ps.readLine())
    .split(" ")
    .map((element) => parseInt(element));
  const aArr = [];

  for (let i = 0; i < n; i++) {
    aArr.push(
      (await ps.readLine()).split(" ").map((element) => parseInt(element))
    );
  }

  const [o, p] = (await ps.readLine())
    .split(" ")
    .map((element) => parseInt(element));
  const bArr = [];

  for (let i = 0; i < o; i++) {
    bArr.push(
      (await ps.readLine()).split(" ").map((element) => parseInt(element))
    );
  }

  const result = matrix(aArr, bArr);

  for (const i in result) {
    console.log(result[i].join(" "));
  }

  function matrix(aArr, bArr) {
    const mult = [];
    for (let i = 0; i < aArr.length; i++) {
      const result = [];
      for (let j = 0; j < bArr[0].length; j++) {
        let element = 0;
        for (let k = 0; k < aArr[0].length; k++) {
          element += aArr[i][k] * bArr[k][j];
        }
        result.push(element);
      }
      mult.push(result);
    }
    return mult;
  }
});
