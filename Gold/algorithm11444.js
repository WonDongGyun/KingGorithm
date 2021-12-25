// 원동균 / 11444 / 피보나치 수 6
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
    async readheapayLine() {
      const line = await readLine();
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
  const n = BigInt(await ps.readLine());
  const mod = 1000000007n;

  const fib = () => {
    const zero = [
      [1n, 1n],
      [1n, 0n],
    ];
    const base = [[1n], [1n]];

    const power = (a, num) => {
      if (num === 1n) return a;
      else if (num % 2n != 0) return multi(power(a, num - 1n), a);
      else return power(multi(a, a), BigInt(num / 2n));
    };

    const multi = (a, b) => {
      const temp = Array.from(Array(2), () => Array(b[0].length).fill(0));

      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < b[0].length; j++) {
          let sum_num = 0n;
          for (let k = 0; k < 2; k++) {
            sum_num += a[i][k] * b[k][j];
          }
          temp[i][j] = sum_num % mod;
        }
      }

      return temp;
    };

    return multi(power(zero, n - 2n), base)[0][0];
  };

  if (n === 0) {
    console.log(0);
  } else if (n < 3) {
    console.log(1);
  } else {
    console.log(parseInt(fib()));
  }
});
