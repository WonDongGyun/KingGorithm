// 원동균 / 2836 / 수상 택시
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
  const [N, M] = (await ps.readLine())
    .split(" ")
    .map((element) => parseInt(element));

  const desti = [];

  //출발지 > 도착지 인 경로만 배열에 추가해줍니다.
  for (let i = 0; i < N; i++) {
    const back = (await ps.readLine())
      .split(" ")
      .map((element) => parseInt(element));

    if (back[0] > back[1]) {
      desti.push(back);
    }
  }

  // 정렬은 내림차순으로 진행합니다.
  desti.sort((a, b) => {
    if (a[0] != b[0]) {
      return b[0] - a[0];
    }
    return b[1] - a[1];
  });

  console.log(sweeping());

  // 역방향으로 선분을 합칩니다.
  function sweeping() {
    let start = M;
    let end = M;
    let result = 0;
    for (let i = 0; i < desti.length; i++) {
      // 역방향이 지금 처리중인 운행 구간과 겹치지 않음
      // 겹치지 않는다면, 중복이 되는것이 아니기 때문에 반환값에 추가해주고 start값을 교체해야 합니다.
      if (end > desti[i][0]) {
        result += (start - end) * 2;
        start = desti[i][0];
      }

      // 역방향이 지금 처리중인 운행 구간과 겹치는데, 훨씬 더 먼 거리를 가는 경우 end값을 교체합니다.
      if (end > desti[i][1]) {
        end = desti[i][1];
      }
    }

    // for문이 끝나면 연산이 안된 거리가 남아있기 때문에 한번 더 연산을 해야 합니다.
    // 원래 정방향의 방향값에 result를 더하면 최소값이 출력됩니다.
    result += (start - end) * 2;
    return M + result;
  }
});
