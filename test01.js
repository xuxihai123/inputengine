const buildDictTrie = require("./buildDictTrie");

run();

async function run() {
  try {
    const tree = await buildDictTrie("./dict/wb_table.txt");
    var result1 = tree.querySuggest("g", "dfs", 0, 20);
    console.log("repl result:", result1);
  } catch (e) {
    console.log("failed:", e);
  }
}
