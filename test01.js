const MyTrie = require("./src/Trie");
const utils = require("./utils/index");

run();

async function run() {
  try {
    const trie = new MyTrie();
    const insert = (key, values) => {
      values.forEach((val) => trie.insert(key, val));
    };
    await utils.parseDictLine("./dict/wb_table.txt", insert);
    await utils.parseDictLine("./dict/py_table.txt", insert);
    console.log(trie.findPager("g", 1, 9));
  } catch (e) {
    console.log("failed:", e);
  }
}
