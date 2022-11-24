const events = require("events");
const fs = require("fs");
const readline = require("readline");
const MyTrie = require("./src/Trie");

module.exports = buildTree;

async function buildTree(dictfile) {
  var tree = new MyTrie();
  await processLineByLine(dictfile, function (line) {
    if (!line) return;
    //   console.log('line:', line);
    const values = line.split(" ");
    tree.addWord(values[0], values.slice(1));
  });
  return tree;
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
