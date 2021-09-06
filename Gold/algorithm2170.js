// 원동균 / 2170 / 선 긋기
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
  const lineArr = [];
  for (let i = 0; i < N; i++) {
    lineArr.push(
      (await ps.readLine()).split(" ").map((element) => parseInt(element))
    );
  }

  lineArr.sort((a, b) => {
    if (a[0] != b[0]) {
      return a[0] - b[0];
    }
    return a[1] - b[1];
  });

  console.log(swipping(lineArr));

  // 현재선이 이전선에 완전히 포함됨
  // 현재선이 이전선에 일부만 포함되고, 더 긴 경우
  // 현재선이 이전선에 아예 포함되지 않는 경우
  function swipping(lineArr) {
    let min = lineArr[0][0];
    let max = lineArr[0][1];
    let leng = max - min;

    for (let i = 1; i < N; i++) {
      if (min <= lineArr[i][0] && max >= lineArr[i][1]) {
        continue;
        // 두번째 조건에 min과 관련한 조건을 사용하면, 아예 포함되지 않는 경우를 제대로 찾을 수 없습니다.
      } else if (lineArr[i][0] < max) {
        leng += lineArr[i][1] - max;
      } else if (max < lineArr[i][0]) {
        leng += lineArr[i][1] - lineArr[i][0];
      }

      max = lineArr[i][1];
      min = lineArr[i][0];
    }

    return leng;
  }
});
