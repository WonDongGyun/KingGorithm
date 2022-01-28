// 원동균 / 1013 / Contact
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
  const T = parseInt(await ps.readLine());
  let result = "";

  // 다른 언어와 자바스크립트의 regexp 작동방식이 달라서 regexp로 풀기 힘듭니다.
  // '+'가 탐욕적으로 작용하기 때문에 전체를 비교하지 않고 가능한 많은 부분을 비교해서 반례가 생길 수 있습니다.
  // DFA(결정적 유한 오토마타, Deterministic finite automaton) 방식을 사용해서 풀어야 합니다.

  const dfs = [
    [2, 1],
    [3, 8],
    [8, 7],
    [4, 8],
    [4, 5],
    [2, 6],
    [9, 6],
    [2, 1],
    [8, 8],
    [4, 7],
  ];

  function isMatch(str) {
    let curState = 0;
    for (let c of str) {
      if (c === "0") {
        curState = dfs[curState][0];
      } else if (c === "1") {
        curState = dfs[curState][1];
      }
    }

    if (curState === 5 || curState === 6 || curState === 7) return true;
    return false;
  }

  for (let i = 0; i < T; i++) {
    const word = await ps.readLine();

    result += isMatch(word) == true ? "YES\n" : "NO\n";
  }

  console.log(result);
});
