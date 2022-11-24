const fs = require("fs");
const buildDictTrie = require("./buildDictTrie");
const repl = require("./repl");

run();

async function run() {
  try {
    const mainTree = await buildDictTrie("./dict/wb_table.txt");
    const pinyinTree = await buildDictTrie("./dict/py_table.txt");
    await repl(function (key, type, page) {
      let results = searchTree(key, type, page);
      console.log("repl result:", results);
    });

    function searchTree(word, type, page, pageSize) {
      page = page || 1;
      pageSize = pageSize || 9;
      console.log(`page:${page},size:${pageSize}`);
      let offset = (page - 1) * pageSize;
      var result1 = mainTree.querySuggest(word, type, offset, pageSize);
      return result1;
      var result2 = pinyinTree.querySuggest(word, type, offset, pageSize);
      // if (result1.length >= pageSize) {
      //   return result1;
      // } else if (result1.length > 0) {
      //   for (var obj of result2) {
      //     result1.push(obj);
      //     if (result1.length === pageSize) {
      //       break;
      //     }
      //   }
      //   return result1;
      // } else {
      //   return result2;
      // }
    }
  } catch (e) {
    console.log("failed:", e);
  }
}
