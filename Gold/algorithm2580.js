// 원동균 / 2580 / 스도쿠
// 스도쿠는 세로줄, 가로줄, 3*3칸에 1 ~ 9 숫자가 각 1개씩만 들어가야 하는 규칙이 존재한다.

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
  const sudoku = [];

  for (let i = 0; i < 9; i++) {
    const numStr = await ps.readLine();
    const sudokuArr = numStr.split(" ").map((element) => parseInt(element));
    sudoku.push(sudokuArr);
  }

  makeSudoku(sudoku);

  function makeSudoku(sudoku) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (sudoku[row][col] === 0) {
          for (let k = 1; k < 10; k++) {
            if (
              checkHori(sudoku, row, k) &&
              checkVerti(sudoku, col, k) &&
              checkNine(sudoku, row, col, k)
            ) {
              sudoku[row][col] = k;
              makeSudoku(sudoku);
            }
            sudoku[row][col] = 0;
          }
          return;
        }

        if (row === 8 && col === 8) {
          for (let i = 0; i < 9; i++) {
            console.log(sudoku[i].join(" "));
          }

          // node 프로세스 강제 종료
          process.exit();
        }
      }
    }
  }

  // 가로줄 검사
  function checkHori(sudoku, row, findNum) {
    if (sudoku[row].indexOf(findNum) === -1) {
      return true;
    }

    return false;
  }

  // 세로줄 검사
  function checkVerti(sudoku, col, findNum) {
    for (let i = 0; i < 9; i++) {
      if (sudoku[i][col] === findNum) {
        return false;
      }
    }

    return true;
  }

  // 3 * 3 사각형 검사
  function checkNine(sudoku, row, col, findNum) {
    let startRow = 0;
    let startCol = 0;
    if (row === 0 || parseInt(row / 3) === 0) {
      startRow = 0;
    } else if (parseInt(row / 3) === 1) {
      startRow = 3;
    } else if (parseInt(row / 3) === 2) {
      startRow = 6;
    }

    if (col === 0 || parseInt(col / 3) === 0) {
      startCol = 0;
    } else if (parseInt(col / 3) === 1) {
      startCol = 3;
    } else if (parseInt(col / 3) === 2) {
      startCol = 6;
    }

    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (sudoku[i][j] === findNum) {
          return false;
        }
      }
    }

    return true;
  }
});
