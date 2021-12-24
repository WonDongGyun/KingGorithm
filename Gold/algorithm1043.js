// 원동균 / 1043 / 거짓말
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
  const [N, M] = (await ps.readLine())
    .split(" ")
    .map((element) => parseInt(element));
  const trueArr = new Set(
    (await ps.readLine())
      .split(" ")
      .map((element) => parseInt(element))
      .slice(1)
  );

  const party = [];
  const cnt = Array(M).fill(1);

  for (let i = 0; i < M; i++) {
    party.push(
      new Set(
        (await ps.readLine())
          .split(" ")
          .map((element) => parseInt(element))
          .slice(1)
      )
    );
  }

  // 해당 파티에 진실을 아는 사람이 있는지 확인하는 교집합 함수
  const intersect = (a, b) => {
    return new Set([...a].filter((element) => b.has(element)));
  };

  // 해당 파티에 진실을 아는 사람이 있는 경우, 해당 파티에 있는 사람 전원을 진실을 아는 사람으로 간주하는 합집합 함수
  const union = (a, b) => {
    b.forEach((element) => a.add(element));
  };

  for (let i = 0; i < M; i++) {
    for (const [index, element] of party.entries()) {
      if (intersect(trueArr, element).size > 0) {
        cnt[index] = 0;
        union(trueArr, element);
      }
    }
  }

  console.log(
    cnt.reduce((acc, cur) => {
      return acc + cur;
    })
  );
});
