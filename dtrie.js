const events = require('events');
const fs = require('fs');
const readline = require('readline');

class TrieNode {
  constructor() {
    this.isEndOfWord = false;
    this.word = '';
    this.values = [];
  }
}

class DoubleArrayTrie {
  constructor() {
    this.base = [0];
    this.check = [0];
    this.nodes = [new TrieNode()];
  }

  insert(word, value) {
    let currentIndex = 0;
    console.log('insert===', word, value);
    for (const character of word) {
      const asciiValue = character.charCodeAt(0);
      const nextIndex = this.base[currentIndex] + asciiValue;
      if (nextIndex >= this.check.length) {
        this.expandArrays(nextIndex + 1);
      }
      if (this.check[nextIndex] === 0) {
        console.log('=====11111');
        this.check[nextIndex] = currentIndex;
      } else {
        console.log('===222222');
        let newBase = this.findNewBase(currentIndex,word);
        this.base[currentIndex] = newBase;
      }
      console.log('========8888', currentIndex);
      currentIndex = nextIndex;
    }
    console.log('912919212');
    let cnode = this.nodes[currentIndex];
    if (!cnode) {
      cnode = this.nodes[currentIndex] = new TrieNode();
      cnode.isEndOfWord = true;
      cnode.word = word;
    }
    cnode.values.push(value);
  }

  search(word) {
    let currentIndex = 0;

    for (const character of word) {
      const asciiValue = character.charCodeAt(0);
      // 状态转移...
      const nextIndex = this.base[currentIndex] + asciiValue; //
      // 1 有ab查abc, 2. 有sc, 查sa
      if (nextIndex >= this.check.length || this.check[nextIndex] !== currentIndex) {
        return false;
      }

      currentIndex = nextIndex;
    }

    return this.nodes[currentIndex];
  }

  expandArrays(minSize) {
    const newSize = Math.max(this.check.length * 2, minSize);
    console.log('newSize====', newSize);
    while (this.check.length < newSize) {
      this.check.push(0);
      this.base.push(0);
    }
  }

  findNewBase(currentIndex,word) {
    let newBase = currentIndex;
    console.log('====findNewBase start currentIndex', currentIndex);
    while (true) {
      let isBaseAvailable = true;

      for (let i = 0; i < word.length; i++) {
        const asciival =word[i].charCodeAt(0);
        const next = this.base[newBase] + asciival;
        // console.log('====findNewBase2');
        if (next >= this.check.length) {
          this.expandArrays(next + 1);
        }
        console.log('this.check[next]:', this.check[next]);
        if (this.check[next] !== 0) {
          isBaseAvailable = false;
          break;
        }
      }

      if (isBaseAvailable) {
        console.log('newBase====',newBase);
        return newBase;
      }
      newBase += 1;
    }
  }

  serialize(filename) {
    const serializedData = JSON.stringify(this, null, 2);
    fs.writeFileSync(filename, serializedData);
  }

  static deserialize(filename) {
    const serializedData = fs.readFileSync(filename, 'utf8');
    const trie = JSON.parse(serializedData);

    return Object.assign(new DoubleArrayTrie(), trie);
  }
}

async function processLineByLine(file, callback) {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream(file),
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => callback(line));
    await events.once(rl, 'close');
  } catch (err) {
    console.error(err);
  }
}

(async function() {
  let trie = new DoubleArrayTrie();
  let start = Date.now();
  await processLineByLine('dict/wb_table.txt', function(line) {
    if (!line) return;
    console.log('line:', line);
    const values = line.split(' ');
    values.slice(1).forEach((val) => {
      trie.insert(values[0], val);
    });
  });
  console.log('build ok===', Date.now() - start, 'ms');
  console.log(trie.search('gg'));
  //   return tree;
})();

// 读取并构建双数组前缀树
// const wbTableContent = fs.readFileSync("dict/wb_table.txt", "utf8");
// const words = wbTableContent.split("\n");

// const trie = new DoubleArrayTrie();

// console.log("start build===");
// let start = Date.now();
// for (const word of words) {
//   trie.insert(word);
// }

// console.log("build ===", Date.now() - start, " ms");

// // 序列化并保存到文件
// trie.serialize("serialized_trie.json");

// // 从文件中反序列化
// const deserializedTrie = DoubleArrayTrie.deserialize("serialized_trie.json");

// // 示例用法
// console.log(deserializedTrie.search("言")); // 输出: true
// console.log(deserializedTrie.search("方向")); // 输出: false
