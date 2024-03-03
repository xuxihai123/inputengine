class TreeNode {
  constructor(uchar) {
    this.uchar = uchar;
    this.data = [];
    this.children = {};
    this.isWord = 0;
  }
}

class Trie {
  constructor() {
    this.root = new TreeNode("*");
  }
  insert(word, val) {
    let cnode = this.root;
    for (var i = 0; i < word.length; i++) {
      let char = word[i];
      if (!cnode.children[char]) {
        cnode.children[char] = new TreeNode(char);
      }
      cnode = cnode.children[char];
    }
    cnode.data.push(val);
    cnode.isWord = 1;
  }
  findLastNode(keyword) {
    let cnode = this.root;
    for (var i = 0; i < keyword.length; i++) {
      let char = keyword[i];
      if (cnode.children[char]) {
        cnode = cnode.children[char];
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
      const data = cnode.data;
      if (data !== null) {
        const code = paths.join("");
        for (let i = 0; i < data.length; i++) {
          const val1 = data[i];
          // if (keyword.startsWith("zz") && keyword.length === 4 && i === 0) {
          //   continue;
          // }
          const completed = callback(code, val1);
          if (completed) {
            finished = true;
            return;
          }
          // if (keyword.startsWith("zz") && keyword.length < 4) {
          //   break;
          // }
        }
      }

      if (Object.keys(cnode.children).length === 0) {
        return;
      }

      for (let i = 0; i < 26; i++) {
        const charc = String.fromCharCode(97 + i);
        const child = cnode.children[charc];
        if (child) {
          paths.push(child.uchar);
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
}

module.exports = Trie;
