const events = require("events");
const fs = require("fs");
const readline = require("readline");

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

exports.parseDictLine = async function(dictfile, callback) {
  await processLineByLine(dictfile, function (line) {
    if (!line) return;
    //   console.log('line:', line);
    const values = line.split(" ");
    callback(values[0], values.slice(1));
  });
};

exports.replDemo = function replDemo(callback) {
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
      } else if (/^:[a-z]+:(\d+)/.test(line)) {
        console.time("search");
        let parts = line.split(":");
        let key = parts[1];
        console.log("key:", key);
        let page = parts.length === 3 ? Number(parts[2]) : 1;
        callback(key, page);
        // const results = searchTree(key, "dfs", page); //
        // console.log(results);
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
};
