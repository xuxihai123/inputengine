const events = require("events");
const fs = require("fs");
const readline = require("readline");
class DoubleArrayTrieNode {
  constructor() {
    this.str = "";
    this.values = [];
  }
}

class DoubleArrayTrie {
  constructor() {
    this.base = [0];
    this.check = [-1];
    this.nodes = [];
  }

  expandArray(newSize) {
    // console.log("expand array====", newSize);
    const base = this.base;
    const check = this.check;
    while (base.length < newSize) {
      base.push(0);
      check.push(-1);
    }
  }
  findNewIndex(index) {
    let start = index;
    while (true) {
      start++;
      if (start >= this.base.length) {
        // 扩展base和check数组
        this.expandArray(start + 1);
      }
      if (this.check[start] === -1) {
        break;
      }
    }
    return start;
  }
  getCode(char) {
    return char.charCodeAt(0) - 96;
  }
  fixBase(targetIndex, offset) {
    const oldbaseval = this.base[targetIndex];
    this.base[targetIndex] = oldbaseval + offset; //fix
    let checkList = this.check;
    for (var i = 0; i < checkList.length; i++) {
      if (checkList[i] === targetIndex) {
        if (this.base[i]!==-1) {
          this.fixBase(i, offset);
        }
      }
    }
  }
  insert(word, values) {
    let currentIndex = 0;
    let nextIndex = 0;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      currentIndex = nextIndex; // for next
      const code = this.getCode(char);
      let tail =false;
      if(this.base[currentIndex]===-1){
        this.base[currentIndex]=0;
        tail = true;
      }
      nextIndex = this.base[currentIndex] + code;
      if (nextIndex >= this.base.length) {
        // 扩展base和check数组
        this.expandArray(nextIndex + 1);
      }
      // not parent is empty,unused node
      if (this.check[nextIndex] === -1) {
        this.check[nextIndex] = currentIndex;
      } else if (word.slice(0, i + 1) === this.nodes[nextIndex].str) {
        continue;
      } else {
        const newIndex = this.findNewIndex(nextIndex);
        const offset = newIndex - nextIndex;
        this.check[newIndex] = currentIndex;
        this.base[newIndex] = -1;
        this.fixBase(currentIndex, offset);
        nextIndex = newIndex;
      }
      if(i===word.length-1){
        
      }

      if (!this.nodes[nextIndex]) {
        const cnode = new DoubleArrayTrieNode();
        cnode.str = word.slice(0, i + 1);
        this.nodes[nextIndex] = cnode;
      }
    }
    // word节点
    const wordLastNode = this.nodes[nextIndex];
    wordLastNode.values.push(...values);
  }

  search(word) {
    const result = [];
    let currentIndex = 0;
    let nextIndex = 0;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      const code = this.getCode(char);
      currentIndex = nextIndex;
      nextIndex = this.base[currentIndex] + code;
      if (nextIndex >= this.check.length || this.check[nextIndex] !== currentIndex) {
        return result;
      }
    }
    console.log("nextIndex====", nextIndex);
    return this.nodes[nextIndex];
  }
}

const trie = new DoubleArrayTrie();

(async function () {
  const start = Date.now();
  [...Array(26)]
    .map((_, index) => index + 97)
    .forEach((key) => {
      trie.insert(String.fromCharCode(key), []);
    });
  await processLineByLine("./dict/wb_table.txt", function (line) {
    if (!line) return;
    // console.log("line:", line);
    const values = line.split(" ");
    if (values[0].charCodeAt(0) >= 99) {
      return;
    }
    console.log("insert=====", values[0]);
    trie.insert(values[0], values.slice(1));
  });
  console.log(`build===${Date.now() - start}ms`);
  console.log(trie.search("b"));
  console.log(trie.search("bb"));
  console.log(trie.search("aaaw"));
  //   return tree;
})();
async function processLineByLine(file, callback) {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream(file),
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => callback(line));
    await events.once(rl, "close");
  } catch (err) {
    console.error(err);
  }
}
