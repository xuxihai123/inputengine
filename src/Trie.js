const TrieNode = require("./TrieNode");

// Character that we will use for trie tree root.
const HEAD_CHARACTER = "*";

module.exports = class Trie {
  constructor() {
    this.head = new TrieNode(HEAD_CHARACTER);
  }

  /**
   * @param {string} word
   * @return {Trie}
   */
  addWord(word, value) {
    const characters = Array.from(word);
    let currentNode = this.head;

    for (let charIndex = 0; charIndex < characters.length; charIndex += 1) {
      const isComplete = charIndex === characters.length - 1;
      currentNode = currentNode.addChild(characters[charIndex], isComplete);
      if (isComplete) {
        currentNode.value = value;
      }
    }

    return this;
  }

  /**
   * @param {string} word
   * @return {Trie}
   */
  deleteWord(word) {
    const depthFirstDelete = (currentNode, charIndex = 0) => {
      if (charIndex >= word.length) {
        // Return if we're trying to delete the character that is out of word's scope.
        return;
      }

      const character = word[charIndex];
      const nextNode = currentNode.getChild(character);

      if (nextNode == null) {
        // Return if we're trying to delete a word that has not been added to the Trie.
        return;
      }

      // Go deeper.
      depthFirstDelete(nextNode, charIndex + 1);

      // Since we're going to delete a word let's un-mark its last character isCompleteWord flag.
      if (charIndex === word.length - 1) {
        nextNode.isCompleteWord = false;
      }

      // childNode is deleted only if:
      // - childNode has NO children
      // - childNode.isCompleteWord === false
      currentNode.removeChild(character);
    };

    // Start depth-first deletion from the head node.
    depthFirstDelete(this.head);

    return this;
  }

  querySuggest(word, type, offset, limit) {
    const lastNode = this.getLastCharacterNode(word);
    if (!lastNode) {
      return [];
    }
    if (type === "dfs") {
      return this.dfsQuery(lastNode, word, offset, limit);
    } else {
      return this.bfsQuery(lastNode, word, offset, limit);
    }
  }

  dfsQuery(startNode, word, offset, limit) {
    let result = [];
    let start = 0;
    offset = offset || 0;
    limit = limit || 10;

    // console.log(offset, limit);

    blacktrack(startNode, []);

    return result;

    function blacktrack(node, paths) {
      if (node.value) {
        let list = node.value;
        for (const val of list) {
          if (start >= offset) {
            result.push({ key: word, value: val, paths: paths.join("") });
          }
          start++;
          // resolved
          // console.log('result.length:', result.length, limit);
          if (result.length === limit) {
            return true;
          }
        }
      }
      if (node.hasChildren() === false) {
        return;
      }
      var childrenKeys = node.suggestChildren();
      for (const char of childrenKeys) {
        let child = node.getChild(char);
        // do select
        paths.push(char);
        let ret = blacktrack(child, paths);
        if (ret) return true;
        // undo select
        paths.pop();
      }
    }
  }
  // 有问题搜索:如下：输入a or aa, 不能只拿一层，使用层序遍历
  /**
   *          a
   *         /
   *        a
   *       /
   *      a
   *     / \
   *    a   b
   * @param {*} startNode
   * @param {*} word
   * @returns
   */
  bfsQuery(startNode, word, offset, limit) {
    let result = [];
    if (startNode.vlaue) {
      let list = startNode.vlaue;
      for (const item of list) {
        result.push({ key: word, value: item, paths: "" });
      }
    }
    let char;
    for (var i = 97; i < 122; i++) {
      char = String.fromCharCode(i);
      let obj = startNode.getChild(char);
      if (obj && obj.value) {
        obj.value.forEach((temp) => {
          result.push({ key: word, value: temp, paths: word + char });
        });
      }
    }
    return result;
  }

  /**
   * @param {string} word
   * @return {string[]}
   */
  suggestNextCharacters(word) {
    const lastCharacter = this.getLastCharacterNode(word);

    if (!lastCharacter) {
      return null;
    }

    return lastCharacter.suggestChildren();
  }

  /**
   * Check if complete word exists in Trie.
   *
   * @param {string} word
   * @return {boolean}
   */
  doesWordExist(word) {
    const lastCharacter = this.getLastCharacterNode(word);

    return !!lastCharacter && lastCharacter.isCompleteWord;
  }

  /**
   * @param {string} word
   * @return {TrieNode}
   */
  getLastCharacterNode(word) {
    const characters = Array.from(word);
    let currentNode = this.head;

    for (let charIndex = 0; charIndex < characters.length; charIndex += 1) {
      if (!currentNode.hasChild(characters[charIndex])) {
        return null;
      }

      currentNode = currentNode.getChild(characters[charIndex]);
    }

    return currentNode;
  }
};
