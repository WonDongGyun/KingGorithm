// 원동균 / 1012 / 유기농 배추

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

  for (let i = 0; i < T; i++) {
    const filedInfo = await ps.readLine();
    const cabbage = filedInfo.split(" ").map((element) => parseInt(element));
    const field = [];

    const cabbageField = Array.from(Array(cabbage[1]), () =>
      Array(cabbage[0]).fill(0)
    );

    for (let j = 0; j < cabbage[2]; j++) {
      const loc = (await ps.readLine())
        .split(" ")
        .map((element) => parseInt(element));

      cabbageField[loc[1]][loc[0]] = 1;
    }

    result.push(cntInsect(cabbageField));
  }

  for (const i in result) {
    console.log(result[i]);
  }

  // 2차원 배열을 돌면서 dfs를 실행
  function cntInsect(cabbageField) {
    let count = 0;

    for (let i = 0; i < cabbageField.length; i++) {
      for (let j = 0; j < cabbageField[0].length; j++) {
        count += dfs(cabbageField, i, j);
      }
    }

    return count;
  }

  // dfs 알고리즘
  // 만약 배열 범위를 벗어나면 return 0을 한다.
  // 배추가 존재하면, 0으로 바꾸고 다음 배추를 찾아 다닌다.
  // 전부 0이라면 1이 반환된다.
  function dfs(cabbageField, i, j) {
    if (
      i < 0 ||
      i > cabbageField.length - 1 ||
      j < 0 ||
      j > cabbageField.length[0] - 1
    ) {
      return 0;
    }

    if (cabbageField[i][j] == 1) {
      cabbageField[i][j] = 0;

      dfs(cabbageField, i + 1, j);
      dfs(cabbageField, i - 1, j);
      dfs(cabbageField, i, j + 1);
      dfs(cabbageField, i, j - 1);
    } else {
      return 0;
    }

    return 1;
  }
});
