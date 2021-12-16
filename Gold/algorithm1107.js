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

  // 리모콘에 부서진 버튼이 없는 경우도 있다.
  if (broken > 0) {
    (await ps.readLine()).split(" ").forEach((element) => {
      brokenArr[element] = true;
    });
  }

  // 처음 시작 채널은 100번 채널입니다.
  let result = Math.abs(N - 100);

  const remote = (channel) => {
    if (channel === 0) {
      if (brokenArr[0]) {
        return 0;
      } else {
        return 1;
      }
    }

    let click = 0;

    // 해당 채널을 10으로 나누어가며 각 자리수마다 리모컨 버튼의 고장 유무를 검사합니다.
    while (channel > 0) {
      // 해당 자리수의 리모컨 버튼이 고장났다면 눌러도 소용이 없으니 0을 반환합니다.
      if (brokenArr[channel % 10]) return 0;

      // 리모컨 버튼이 고장나지 않았다면 횟수를 셉니다. 해당 버튼을 눌렀기 때문에 다음 자리수로 넘어가면 됩니다.
      // 리모컨의 고장나지 않은 버튼을 눌러서 이동하는 것이므로 click 수는 하나씩만 증가시킵니다.
      channel = parseInt(channel / 10);
      click++;
    }

    return click;
  };

  /* 최대 500000 채널까지 입력할 수 있지만, 고장나지않은 버튼을 사용해서 100채널에서 시작해서
   상위의 채널로 이동 후 시작할 수 있기 때문에 0 ~1000000번 채널까지 모든 경우의 수를 검토합니다. */

  for (let i = 0; i <= 1000000; i++) {
    let len = remote(i);

    if (len > 0) {
      // press는 + 혹은 - 버튼을 사용해서 1씩 이동한 경우의 수가 저장됩니다.
      // press + len ==> 고장나지 않은 리모컨 버튼을 사용해서 가장 가까운 채널로 이동 + (+, -) 버튼을 사용해 조정한 경우
      const press = Math.abs(i - N);
      if (result > press + len) {
        result = press + len;
      }
    }
  }

  console.log(result);
});
