// 원동균 / 1931 / 회의실 배정

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
  let n = parseInt(await ps.readLine());
  const arr = [];

  for (let i = 0; i < n; i++) {
    let m = await ps.readLine();
    let conference = m.split(" ").map((element) => parseInt(element));

    arr.push(conference);
  }

  // 다중 조건 정렬 ==> 끝나는 시간을 기준으로 정렬하고, 같은 경우 시작 시간을 기준으로 정렬
  arr.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  console.log(maxConf(arr));

  function maxConf(arr) {
    let count = 0;
    let endTime = 0;
    arr.forEach((element) => {
      if (endTime <= element[0]) {
        endTime = element[1];
        count += 1;
      }
    });

    return count;
  }
});
