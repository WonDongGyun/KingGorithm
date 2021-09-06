// 원동균 / 5430 / AC
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
  const result = [];
  const T = parseInt(await ps.readLine());

  // 입력 받기
  for (let i = 0; i < T; i++) {
    const funcArr = (await ps.readLine()).split("");
    const arrLength = parseInt(await ps.readLine());
    const testArr = (
      await ps
        .readLine()
        .then((element) => element.substring(1, element.length - 1))
    )
      .split(",")
      .filter((element) => {
        if (!isNaN(element)) {
          return element;
        }
      });

    result.push(AC(funcArr, testArr));
  }

  for (let i of result) {
    console.log(i);
  }

  // status 변수를 선언해서 reverse로 뒤집는것이 아니라, 뒤집었다고 가정하고 진행합니다.
  // 기본 상태에서는 shift로 맨 앞 요소를 삭제하고, 아닐 경우는 pop으로 맨 뒤의 요소를 삭제합니다.
  // 최종 반환시 status 변수값에 따라 뒤집은 배열을 출력할지, 그냥 출력할지를 결정합니다.
  function AC(funcArr, testArr) {
    let status = 1;

    for (let i of funcArr) {
      if (i === "R") {
        status = status * -1;
      } else {
        if (status === 1) {
          if (testArr.length > 0) {
            testArr.shift();
          } else {
            return "error";
          }
        } else {
          if (testArr.length > 0) {
            testArr.pop();
          } else {
            return "error";
          }
        }
      }
    }

    // 기본 배열로 반환하면 출력형식이 올바르지 않기 때문에 이런식으로 반환합니다.
    const str =
      status === 1
        ? "[" + testArr.join() + "]"
        : "[" + testArr.reverse().join() + "]";

    return str;
  }
});
