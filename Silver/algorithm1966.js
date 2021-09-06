// 원동균 / 1966/ 프린터 큐
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
    const [n, m] = (await ps.readLine())
      .split(" ")
      .map((element) => parseInt(element));

    const queue = (await ps.readLine())
      .split(" ")
      .map((element) => parseInt(element));

    result.push(findPaper(queue, m));
  }

  // 출력
  for (const i of result) {
    console.log(i);
  }

  // 해당 문서가 몇번째로 인쇄되는지 구하는 함수
  // point 변수값을 이용해서 큐에서 값이 빠져나가거나 뒤로 이동할 때마다, 대상 문서의 위치를 구합니다.
  // 출력할 때 내가 구하려고 했던 문서의 위치가 빠져나가게 되면 count를 반환합니다.
  function findPaper(queue, m) {
    let point = m;
    let count = 0;

    while (queue.length > 0) {
      const max = Math.max(...queue);

      if (queue[0] < max) {
        if (point != 0) {
          point--;
        } else {
          point = queue.length - 1;
        }

        const move = queue.shift();
        queue.push(move);
      } else if (queue[0] === max) {
        count++;
        if (queue[point] == queue[0] && point === 0) {
          return count;
        } else {
          queue.shift();
          point--;
        }
      }
    }
  }
});
