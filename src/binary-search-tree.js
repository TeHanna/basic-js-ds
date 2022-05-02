const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor () {
    this.rootTree = null
  }

  root() {
    return this.rootTree
  }

  add(data) {    
    this.rootTree = addWithin(this.rootTree, data);

    function addWithin(node, data) {
      if (node === null) {
        return new Node(data);
    }

    if (node.data === data) {
        return;
    }
      if (data < node.data) {
        node.left = addWithin(node.left, data);
      } else {
        node.right = addWithin(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return this.find(data) !== null
  }

  find(data) {
    let findNode = this.rootTree;

    while (findNode !== null) {
      if (data < findNode.data) {
        findNode = findNode.left;
      } else if (data > findNode.data) {
        findNode = findNode.right;
      } else {
        return findNode;
      }
    }
    return null;
  }

  remove(data) {
    this.rootTree = removeNode(this.rootTree, data)

    function removeNode (node, data) {
      if (!node) return null
    
      if (data < node.data) {
        node.left = removeNode(node.left, data)
        return node
      } else if (node.data < data) {
        node.right = removeNode(node.right, data)
        return node
      } else {
        if (!node.left && !node.right) {
          return null
        }
        
        if (!node.left) {
          return node.right;
        }

        if (!node.right) {
          return node.left
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;
        node.right = removeNode(node.right, minFromRight.data);
        return node;
    
      }
    }
  }

  min() {
    if (!this.rootTree) return null;

    let node = this.rootTree;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.rootTree) return null;
    let node = this.rootTree;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }

}


module.exports = {
  BinarySearchTree
};