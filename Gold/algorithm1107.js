// 원동균 / 1107 / 리모컨
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
  const broken = parseInt(await ps.readLine());
  const brokenArr = new Array(10).fill(false);

  (await ps.readLine()).split(" ").forEach((element) => {
    brokenArr[element] = true;
  });

  // 처음 시작 채널은 100번 채널입니다.
  let result = Math.abs(N - 100);

  const remote = (button) => {
    if (button === 0) {
      if (brokenArr[0]) {
        return 0;
      } else {
        return 1;
      }
    }

    let len = 0;
    while (button > 0) {
      // 리모컨 버튼이 고장났다면 눌러도 소용이 없으니 0을 반환합니다.
      if (brokenArr[button % 10]) return 0;

      // 리모컨 버튼이 고장나지 않았다면 횟수를 셉니다.
      button = parseInt(button / 10);
      len += 1;
    }

    return len;
  };

  for (let i = 0; i <= 1000000; i++) {
    let len = remote(i);

    if (len > 0) {
      //
      const press = Math.abs(i - N);
      if (result > press + len) {
        result = press + len;
      }
    }
  }

  console.log(result);
});
