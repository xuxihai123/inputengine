const events = require("events");
const fs = require("fs");
const readline = require("readline");
const MyTrie = require("./src/Trie");

var mainTree = new MyTrie();
var pinyinTree = new MyTrie();

function parseLine(tree, line) {
  if (!line) return;
  //   console.log('line:', line);
  const values = line.split(" ");
  tree.addWord(values[0], values.slice(1));
}

function searchTree(word, type, page, pageSize) {
  console.log("page:", page);
  pageSize = pageSize || 10;
  let offset = (page - 1) * pageSize;
  var result1 = mainTree.querySuggest(word, type, offset, pageSize);
  var result2 = pinyinTree.querySuggest(word, type, offset, pageSize);
  if (result1.length >= pageSize) {
    return result1;
  } else if (result1.length > 0) {
    for (var obj of result2) {
      result1.push(obj);
      if (result1.length === pageSize) {
        break;
      }
    }
    return result1;
  } else {
    return result2;
  }
}

run();

function replDemo() {
  return new Promise(function (resolve, reject) {
    let rl = readline.createInterface(process.stdin, process.stdout);
    rl.setPrompt("ready> ");
    rl.prompt();
    rl.on("line", function (line) {
      if (line === "exit" || line === "quit" || line == "q") {
        rl.close();
        return; // bail here, so rl.prompt() isn't called again
      }
      if (line === "help" || line === "?") {
        console.log(`commands:\n  woof\n  exit|quit\n`);
      } else if (line === "hello") {
        console.log("welcome use input method!");
      } else if (/^\?[a-z]+/.test(line)) {
        console.time("search");
        const results = searchTree(line.slice(1), "bfs"); //
        console.log(results);
        console.timeEnd("search");
      } else if (/^:[a-z]+:(\d+)/.test(line)) {
        console.time("search");
        let parts = line.split(":");
        const results = searchTree(
          parts[1],
          "dfs",
          parts.length === 3 ? Number(parts[2]) : 1
        ); //
        console.log(results);
        console.timeEnd("search");
      } else {
        console.log(`unknown command: "${line}"`);
      }

      rl.prompt();
    }).on("close", function () {
      console.log("bye");
      resolve(42); // this is the final result of the function
    });
  });
}

async function run() {
  try {
    await resolveTree();
    let replResult = await replDemo();
    console.log("repl result:", replResult);
  } catch (e) {
    console.log("failed:", e);
  }
}

async function resolveTree() {
  await processLineByLine("./dict/wb_table.txt", (line) => {
    parseLine(mainTree, line);
  });
  await processLineByLine("./dict/py_table.txt", (line) => {
    parseLine(pinyinTree, line);
  });
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
