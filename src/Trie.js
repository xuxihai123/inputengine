class Trie {
  constructor() {
    this.root = { _l: {}, _d: [] };
  }
  insert(word, val) {
    let cnode = this.root;
    for (var i = 0; i < word.length; i++) {
      let char = word[i];
      if (!cnode._l[char]) {
        cnode._l[char] = { _l: {}, _d: [] };
      }
      cnode = cnode._l[char];
    }
    cnode._d.push(val);
    // cnode.isWord = 1;
  }
  findLastNode(keyword) {
    let cnode = this.root;
    for (var i = 0; i < keyword.length; i++) {
      let char = keyword[i];
      if (cnode._l[char]) {
        cnode = cnode._l[char];
      } else {
        return null;
      }
    }
    return cnode;
  }
  find(keyword, callback) {
    if (keyword.length === 0) {
      return;
    }

    let finished = false;
    let tracks = [];

    const lastNode = this.findLastNode(keyword);
    if (!lastNode) {
      return;
    }

    backtrack(lastNode, tracks);

    function backtrack(cnode, paths) {
      const data = cnode._d;
      if (data !== null) {
        const code = paths.join("");
        for (let i = 0; i < data.length; i++) {
          const val1 = data[i];
          if (keyword.startsWith("zz") && keyword.length === 4 && i === 0) {
            continue;
          }
          const completed = callback(code, val1);
          if (completed) {
            finished = true;
            return;
          }
          if (keyword.startsWith("zz") && keyword.length < 4) {
            break;
          }
        }
      }

      if (Object.keys(cnode._l).length === 0) {
        return;
      }

      for (let i = 0; i < 26; i++) {
        const charc = String.fromCharCode(97 + i);
        const child = cnode._l[charc];
        if (child) {
          paths.push(charc);
          backtrack(child, paths);
          if (finished) {
            return;
          }
          paths.pop();
        }
      }
    }
  }

  findPager(key, page, size) {
    let index = 0;
    let start = (page - 1) * size;
    let results = [];
    this.find(key, function (code, val) {
      index++;
      if (index > start) {
        results.push({ index, key, value: val, paths: code });
      }
      if (start + size === index) {
        return true;
      }
    });
    return results;
  }
  encode() {
    return JSON.stringify(this.root);
  }
  static decode(str) {
    const root = JSON.parse(str);
    const trie = new Trie();
    trie.root = root;
    return trie;
  }
}

module.exports = Trie;
