const MyTrie = require("./src/Trie");
const utils = require("./utils/index");

run();

async function run() {
  try {
    const trie = new MyTrie();
    const insert = (key, values) => {
      values.forEach((val) => trie.insert(key, val));
    };
    await utils.parseDictLine("./dict/user_table.txt", insert);
    await utils.parseDictLine("./dict/sp_table.txt", insert);
    await utils.parseDictLine("./dict/wb_table.txt", insert);
    await utils.parseDictLine("./dict/py_table.txt", insert);

    require('fs').writeFileSync('tries.json',JSON.stringify(trie));
    console.log(trie.findPager("g", 1, 9));
  } catch (e) {
    console.log("failed:", e);
  }
}
