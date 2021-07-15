// 원동균 / 6549 / 히스토그램에서 가장 큰 직사각형

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
  while (true) {
    const [...input] = (await ps.readLine())
      .split(" ")
      .map((element) => parseInt(element));

    if (input[0] === 0) {
      for (const i of result) {
        console.log(i);
      }
      process.exit();
    } else {
      result.push(findMaxRec(input));
    }
  }

  // 스택으로 해결하기
  function findMaxRec(input) {
    // 해당 배열에서 직사각형의 수만 제거합니다.
    input.shift();

    const stack = [];
    let maxSize = 0;
    for (let i = 0; i < input.length; i++) {
      // 만약 스택이 존재하고, input[스택[스택 Top]]의 값이 현재값 보다 크거나 같다면 수행합니다.
      while (stack.length && input[stack[stack.length - 1]] >= input[i]) {
        // 높이는 input[스택 Top]
        const height = input[stack.pop()];

        // 넓이는 스택이 존재하는 경우,
        // i - 1   ==> 현재 인덱스 값 이전의 인덱스에 해당하는 사각형을 대상으로 하기 때문입니다.
        // - stack[stack.length - 1]  ==> 스택에는 인덱스 번호가 저장되기 때문에 이렇게 함으로서 내가 계산해야 할 넓이를 알 수 있습니다.
        let width = stack.length > 0 ? i - 1 - stack[stack.length - 1] : i;

        maxSize = Math.max(maxSize, width * height);
      }

      // 스택에는 인덱스 번호를 담는다.
      stack.push(i);
    }

    while (stack.length) {
      const height = input[stack.pop()];

      // 위의 경우와는 다르게, 스택이 남아있으므로 처리를 해주어야 합니다.
      // input[스택 Top]의 값과 현재값을 비교하는 경우가 아니기 때문에, input.length - 1로 계산해 주어야 배열 끝을 계산할 수 있습니다.
      let width =
        stack.length > 0
          ? input.length - 1 - stack[stack.length - 1]
          : input.length;
      maxSize = Math.max(maxSize, width * height);
    }

    return maxSize;
  }
});
