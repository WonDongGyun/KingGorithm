// 원동균 / 1629 / 곱셈

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
  const [a, b, c] = (await ps.readLine())
    .split(" ")
    .map((element) => BigInt(element));

  console.log(Number(powMod(a, b, c)));

  // b의 값이 짝수일 경우와 홀수일 경우에 따라 형태가 달라진다.
  // biInt를 사용해야만 오류가 나지 않는다.
  function powMod(a, b, c) {
    if (Number(b) === 0) {
      return BigInt(1);
    }

    if (Number(b) === 1) {
      return a % c;
    }

    const temp = powMod(a, BigInt(parseInt(b / BigInt(2))), c);
    if (b % BigInt(2)) {
      return (((temp * temp) % c) * a) % c;
    } else {
      return (temp * temp) % c;
    }
  }
});
