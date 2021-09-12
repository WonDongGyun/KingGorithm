// 원동균 / 14889 / 스타트와 링크
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
  const N = parseInt(await ps.readLine());

  const startLink = [];

  // 팀원 조합을 위한 배열
  const visit = Array.from(Array(N).fill(false));
  let min = Infinity;

  for (let i = 0; i < N; i++) {
    const human = (await ps.readLine())
      .split(" ")
      .map((element) => parseInt(element));

    startLink.push(human);
  }

  drawDFS(0, 0);
  console.log(min);

  // start = 시작 숫자(처음에는 0명을 뽑는 것 부터 시작합니다.)
  // count = 팀에서 몇명을 뽑았는가?
  // count 가 N의 절반이라면 팀을 만든것이기 때문에 계산로직을 수행합니다.
  function drawDFS(start, count) {
    if (count === N / 2) {
      ability();
      return;
    } else {
      // 전체 인원의 절반만큼 뽑아야 두개의 팀을 만들 수 있기 때문에 될 때까지 count를 증가시킵니다.
      for (let i = start; i < N; i++) {
        if (!visit[i]) {
          visit[i] = true;
          drawDFS(i + 1, count + 1);
          visit[i] = false;
        }
      }
    }
  }

  // start 팀은 팀원의 값이 true 일 경우 해당되고, link 팀은 팀원의 값이 false일 경우 해당됩니다.
  function ability() {
    let start = 0;
    let link = 0;

    for (let i = 0; i < N - 1; i++) {
      for (let j = i + 1; j < N; j++) {
        if (visit[i] === true && visit[j] === true) {
          start += startLink[i][j];
          start += startLink[j][i];
        }

        if (visit[i] === false && visit[j] === false) {
          link += startLink[i][j];
          link += startLink[j][i];
        }
      }
    }

    let result = Math.abs(start - link);

    if (result === 0) {
      console.log(result);
      process.exit();
    } else {
      min = Math.min(result, min);
    }
  }
});
