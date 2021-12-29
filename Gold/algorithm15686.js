// 원동균 / 15686 / 치킨 배달
"use strict";

const { memory } = require("console");
const { maxHeaderSize } = require("http");

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
  const [N, M] = (await ps.readLine())
    .split(" ")
    .map((element) => parseInt(element));

  const home = [];
  const chiken = [];
  const city = [];
  let min_chicken = Infinity;

  for (let i = 0; i < N; i++) {
    // 집과 치킨의 좌표를 저장합니다.
    const input = (await ps.readLine()).split(" ").map((element, index) => {
      const num = parseInt(element);
      if (num === 1) home.push([i, index]);
      if (num === 2) chiken.push([i, index]);

      return num;
    });

    city.push(input);
  }

  const getCombinations = function (arr, selectNumber) {
    const results = [];
    if (selectNumber === 1) return arr.map((el) => [el]);

    arr.forEach((fixed, index, origin) => {
      const rest = origin.slice(index + 1);
      const combinations = getCombinations(rest, selectNumber - 1);

      const attached = combinations.map((el) => [fixed, ...el]);
      results.push(...attached);
    });

    return results;
  };

  // 치킨의 좌표들을 M개씩 섞은 조합을 구하는 함수입니다.
  const combi = getCombinations(chiken, M);

  // 조합별로 가장 작은 경로를 찾기 시작합니다.
  for (const c of combi) {
    let cnt = 0;

    // 치킨집 <-> 집 사이의 거리를 구합니다.
    for (const h of home) {
      // 해당 치킨집 <-> 집까지 최소한의 거리로 배달할 수 있는 값을 구합니다.
      let coast = Infinity;
      for (const ck of c) {
        coast = Math.min(
          coast,
          Math.abs(h[0] - ck[0]) + Math.abs(h[1] - ck[1])
        );
      }
      cnt += coast;
    }
    min_chicken = Math.min(min_chicken, cnt);
  }

  console.log(min_chicken);
});
