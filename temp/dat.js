class DoubleArrayTrieNode {
    constructor() {
      this.base = 0;  // base值
      this.check = 0;  // check值
      this.isEnd = false;  // 是否是一个单词的结束节点
      this.data=[];
    }
  }

  class DoubleArrayTrie {

    /**
     * trie.insert('gg',['五'])
     * trie.insert('ggtt',['五笔'])
     * trie.insert('a',['工','戈'])
     * 
     * @param {string} word 
     * @param {string[]} values 
     */
    insert(word,values){
        // TODO
    }
    /**
     *  const resut = trie.search('gg') // result: ['五','一式'...]
     * 
     * @param {string} word 
     * @return {string[]}
     */
    search(word){
        // TODO
    }
    
  }
  
  class DoubleArrayTrie {
    constructor() {
      this.base = [0];  // base数组
      this.check = [0];  // check数组
      this.nextCheckPos = 1;  // 下一个可用的check位置
      this.root = new DoubleArrayTrieNode();  // 根节点
    }
    insert(word,values){

    }
    /**
     * 构建双数组前缀树
     * @param {Array} words - 单词数组
     */
    build(words) {
      const base = this.base;
      const check = this.check;
      const root = this.root;
  
      // 构建Trie树
      const trie = {};
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        let node = trie;
        for (let j = 0; j < word.length; j++) {
          const char = word[j];
          if (!node[char]) {
            node[char] = {};
          }
          node = node[char];
        }
        node.isEnd = true;
      }
  
      // 构建双数组前缀树
      this._resize(base.length + words.length * 2);
      this._insert(root, '', trie, 0, 0);
    }
  
    /**
     * 插入节点到双数组前缀树
     * @param {DoubleArrayTrieNode} parent - 父节点
     * @param {string} prefix - 当前节点的前缀
     * @param {Object} trie - 原始Trie树
     * @param {number} baseIndex - 当前节点的base索引
     * @param {number} parentIndex - 父节点的base索引
     */
    _insert(parent, prefix, trie, baseIndex, parentIndex) {
      const base = this.base;
      const check = this.check;
      const nextCheckPos = this.nextCheckPos;
  
      parent.base = baseIndex;
  
      // 检查当前节点的子节点
      const children = Object.keys(trie);
      for (let i = 0; i < children.length; i++) {
        const char = children[i];
        const node = trie[char];
        const code = char.charCodeAt(0);
  
        let baseValue = base[baseIndex] + code;
        if (baseValue >= base.length) {
          // 扩展base和check数组
          this._resize(baseValue + 1);
        }
  
        // 检查base值是否已被占用
        if (base[baseValue] !== 0) {
          // 寻找合适的位置
          let newPos = nextCheckPos;
          while (true) {
            newPos++;
            if (newPos >= base.length) {
              // 扩展base和check数组
              this._resize(newPos + 1);
            }
            if (base[newPos] === 0) {
              break;
            }
          }
          this.nextCheckPos = newPos;
          this._insert(parent, prefix, trie, newPos, parentIndex);
          continue;
        }
  
        // 更新check值
        check[baseValue] = parentIndex;
  
        // 检查当前节点是否为叶子节点
        if (node.isEnd) {
          base[baseValue] = -base[baseValue];
        } else {
          base[baseValue] = baseIndex;
        }
  
        // 递归插入子节点
        this._insert(parent, prefix + char, node, baseValue, baseIndex);
      }
    }
  
    /**
     * 扩展base和check数组的长度
     * @param {number} newSize - 新的长度
     */
    _resize(newSize) {
      const base = this.base;
      const check = this.check;
      while (base.length < newSize) {
        base.push(0);
        check.push(0);
      }
    }
  
    /**
     * 查询拼音
     * @param {string} pinyin - 拼音
     * @returns {boolean} - 是否存在
     */
    search(pinyin) {
      const base = this.base;
      const check = this.check;
      const root = this.root;
  
      let node = root;
      for (let i = 0; i < pinyin.length; i++) {
        const char = pinyin[i];
        const code = char.charCodeAt(0);
        const baseValue = base[node.base] + code;
        if (baseValue >= base.length || check[baseValue] !== node.base) {
          return false;
        }
        node = new DoubleArrayTrieNode();
        node.base = baseValue;
      }
  
      return node.isEnd;
    }
  }
  
  // 示例用法
  const words = ['apple', 'banana', 'cat', 'dog','abc','dsss'];
  const trie = new DoubleArrayTrie();
  trie.build(words);
  
  console.log(trie.search('apple'));  // true
  console.log(trie.search('banana'));  // true
  console.log(trie.search('cat'));  // true
  console.log(trie.search('dog'));  // true
  console.log(trie.search('elephant'));  // false
  
  