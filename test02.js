const fs = require("fs");
const MyTrie = require("./src/Trie");
const utils = require("./utils");

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
    await utils.replDemo(function (key, page) {
      page = page || 1;
      let pageSize =  9;
      console.log(`page:${page},size:${pageSize}`);
      const results = trie.findPager(key,page,pageSize)
      console.log("repl result:", results);
    });
  } catch (e) {
    console.log("failed:", e);
  }
}
