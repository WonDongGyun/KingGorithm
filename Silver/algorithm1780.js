// 원동균 / 1780 / 종이의 개수

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
  const n = parseInt(await ps.readLine());
  const paper = [];
  const cntArr = [0, 0, 0];
  for (let i = 0; i < n; i++) {
    paper.push(
      (await ps.readLine()).split(" ").map((element) => parseInt(element))
    );
  }

  divide(n, 0, 0, paper, cntArr);

  for (const i of cntArr) {
    console.log(i);
  }

  // 색종이에 같은 번호만 있는지 체크
  function checkPaper(n, row, col, paper, findNum) {
    // 주어진 색종이 크기만큼 해당 배열에서 다른 숫자를 찾습니다.
    for (let i = row; i < row + n; i++) {
      for (let j = col; j < col + n; j++) {
        if (findNum != paper[i][j]) {
          return false;
        }
      }
    }

    return true;
  }

  // 색종이 나누는 함수
  function divide(n, row, col, paper, cntArr) {
    const findNum = paper[row][col];

    if (checkPaper(n, row, col, paper, findNum)) {
      if (findNum === -1) {
        cntArr[0]++;
      } else if (findNum === 0) {
        cntArr[1]++;
      } else {
        cntArr[2]++;
      }
    } else {
      // 종이 작게 9등분 하기
      let mini = n / 3;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          divide(mini, row + mini * i, col + mini * j, paper, cntArr);
        }
      }
    }
  }
});
