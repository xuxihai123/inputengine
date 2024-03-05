const fs = require("fs");
const MyTrie = require("./src/Trie");
const utils = require("./utils");

run();

async function run() {
  
  try {
    const start =Date.now();
    const str = fs.readFileSync('./tries.json','utf8');
    console.log('load trie data===',Date.now()-start,'ms');
    const start2= Date.now();
    const trie = MyTrie.decode(str);
    console.log('parse trie data===',Date.now()-start2,'ms');
    await utils.replDemo(function (key, page) {
      page = page || 1;
      let pageSize =  9;
      console.log(`page:${page},size:${pageSize}`);
      const results = trie.findPager(key,page,pageSize);
      results.forEach((temp)=>{
          temp.type=temp.value.replace(/^(py|wb|sp|us)_.*$/,'$1');
          temp.value=temp.value.replace(/(py|wb|sp|us)_/,'');
      });
      console.log("repl result:", results);
    });

  } catch (e) {
    console.log("failed:", e);
  }
}

