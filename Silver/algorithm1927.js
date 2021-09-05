// 원동균 / 1927 / 최소 힙

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
  class minHeap {
    constructor() {
      this.heap = [];
    }

    insert(value) {
      this.heap.push(value);
      this.bubbleUp();
    }

    // 방금 들어온 값을 재귀적으로 부모의 값을 비교해 나갑니다. 최상단 루트까지 계속 비교합니다.
    bubbleUp() {
      let currentIndex = this.heap.length - 1;

      while (currentIndex > 0) {
        const parentIndex = Math.floor((currentIndex - 1) / 2);

        // 부모보다 크거나 같으면 재귀를 끝냅니다.
        if (this.heap[parentIndex] <= this.heap[currentIndex]) break;

        // 부모보다 작다면 부모와 바꿉니다.
        [this.heap[currentIndex], this.heap[parentIndex]] = [
          this.heap[parentIndex],
          this.heap[currentIndex],
        ];
        currentIndex = parentIndex;
      }
    }

    // 상단 루트의 최대값을 max로 하고 반환합니다. 이때, 상단 최대값은 배열에서 삭제됩니다.
    // heap의 마지막 부분을 최상단으로 하고 정렬합니다.
    returnMin() {
      const min = this.heap[0];

      if (this.heap.length === 1) {
        this.heap.pop();
        return min;
      }

      this.heap[0] = this.heap.pop();
      this.nodeSort(0);
      return min;
    }

    // 최상단 루트의 값과 왼쪽, 오른쪽 자식 노드 값을 비교하며 자식 노드 값이 부모 노드보다 작은면 값을 바꿉니다.
    // 전체적으로 힙 배열을 재정렬합니다.
    nodeSort(index) {
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;
      const length = this.heap.length;
      let smallestIndex = index;

      if (
        leftIndex < length &&
        this.heap[leftIndex] < this.heap[smallestIndex]
      ) {
        smallestIndex = leftIndex;
      }
      if (
        rightIndex < length &&
        this.heap[rightIndex] < this.heap[smallestIndex]
      ) {
        smallestIndex = rightIndex;
      }

      // 상단 루트가 최소값이 아니라면 스왑
      if (smallestIndex !== index) {
        [this.heap[index], this.heap[smallestIndex]] = [
          this.heap[smallestIndex],
          this.heap[index],
        ];

        this.nodeSort(smallestIndex);
      }
    }
  }

  const n = parseInt(await ps.readLine());
  let result = "";
  const minheap = new minHeap();

  for (let i = 0; i < n; i++) {
    const num = parseInt(await ps.readLine());

    if (num > 0) {
      minheap.insert(num);
    }

    if (num === 0) {
      if (minheap.heap.length === 0) {
        result += "0" + "\n";
      } else {
        const minNum = minheap.returnMin();
        result += minNum + "\n";
      }
    }
  }

  console.log(result.trim());
});
