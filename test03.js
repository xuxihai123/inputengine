const events = require("events");
const fs = require("fs");
const readline = require("readline");
const repl = require("./repl");
const MyTrie = require("./src/Trie");

run();

async function run() {
  try {
    const wubipinyinTree = new MyTrie();
    await appendTree(wubipinyinTree, "./dict/wb_table.txt", "wb_");
    await appendTree(wubipinyinTree, "./dict/py_table.txt", "py_");
    await repl(function (key, type, page) {
      let results = searchTree(key, type, page);
      console.log("repl result:", results);
    });

    function searchTree(word, type, page, pageSize) {
      page = page || 1;
      pageSize = pageSize || 9;
      console.log(`page:${page},size:${pageSize}`);
      let offset = (page - 1) * pageSize;
      var result1 = wubipinyinTree.querySuggest(word, type, offset, pageSize);
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

async function appendTree(trie, dictfile, prefix) {
  await processLineByLine(dictfile, function (line) {
    if (!line) return;
    //   console.log('line:', line);
    const values = line.split(" ");
    trie.addWord(
      values[0],
      values.slice(1).map((temp) => prefix + temp)
    );
  });
  //   return tree;
}

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
