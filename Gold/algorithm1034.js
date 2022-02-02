// 원동균 / 1034 / 램프
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
  const [N, M] = (await ps.readLine()).split(" ").map((el) => parseInt(el));
  const lamp = [];
  let maxLamp = 0;

  for (let i = 0; i < N; i++) {
    lamp.push((await ps.readLine()).split("").map((el) => parseInt(el)));
  }

  const K = parseInt(await ps.readLine());

  for (let i = 0; i < N; i++) {
    let count = 0;
    let onLamp = 0;

    // 한 행의 0의 개수는 k보다 작거나 같아야 합니다.
    for (let j = 0; j < M; j++) {
      if (lamp[i][j] == 0) {
        count++;
      }
    }

    // 해당 행과 같은 상태의 모든 행을 찾고, 같으면 최대로 킬 수 있는 램프에 추가합니다
    if (count <= K && count % 2 == K % 2) {
      for (let j = 0; j < N; j++) {
        if (JSON.stringify(lamp[i]) == JSON.stringify(lamp[j])) {
          onLamp++;
        }
      }
    }

    maxLamp = Math.max(maxLamp, onLamp);
  }

  console.log(maxLamp);
});
