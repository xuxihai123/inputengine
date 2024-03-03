const fs = require("fs");
const MyTrie = require("./src/Trie");
const utils = require("./utils");

run();

async function run() {
  
  try {
    const trie = new MyTrie();
    const insert = (prefix,key, values) => {
      values.forEach((val) => trie.insert(key, prefix+val));
    };
    await utils.parseDictLine("./dict/wb_table.txt", insert.bind(null,'wb_'));
    await utils.parseDictLine("./dict/py_table.txt", insert.bind(null,'py_'));
    await utils.replDemo(function (key, page) {
      page = page || 1;
      let pageSize =  9;
      console.log(`page:${page},size:${pageSize}`);
      const results = trie.findPager(key,page,pageSize);
      results.forEach((temp)=>{
          temp.type=temp.value.replace(/^(py|wb)_.*$/,'$1');
          temp.value=temp.value.replace(/(py|wb)_/,'');
      });
      console.log("repl result:", results);
    });

  } catch (e) {
    console.log("failed:", e);
  }
}

