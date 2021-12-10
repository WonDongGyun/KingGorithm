// 원동균 / 6603 / 로또
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
  const lottoCombi = [];

  while (true) {
    const lottoArr = (await ps.readLine())
      .split(" ")
      .map((element) => parseInt(element));

    if (lottoArr[0] === 0) {
      break;
    }

    if (lottoCombi.length > 0) {
      lottoCombi.push("");
    }

    const getCombinations = function (arr, selectNumber) {
      const result = [];
      if (selectNumber === 1) return arr.map((element) => [element]);

      arr.forEach((fixed, index, origin) => {
        const rest = origin.slice(index + 1);
        const combinations = getCombinations(rest, selectNumber - 1);
        const attached = combinations.map((element) => [fixed, ...element]);
        result.push(...attached);
      });

      return result;
    };

    lottoArr.shift();
    for (const index of getCombinations(lottoArr, 6)) {
      lottoCombi.push(index);
    }
  }

  for (const index of lottoCombi) {
    index === "" ? console.log("") : console.log(index.join(" "));
  }
});
