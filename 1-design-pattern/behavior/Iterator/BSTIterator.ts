import {} from "node:assert";

interface Iterator<T> {
  hasNext(): boolean;
  next(): void;
  current(): T | null;
}

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(val: number) {
    this.val = val;
  }
}

class BinarySearchTree {
  root: TreeNode | null = null;

  insert(val: number) {
    const helper = (node: TreeNode | null): TreeNode => {
      if (!node) return new TreeNode(val);
      if (node.val > val) node.left = helper(node.left);
      else node.right = helper(node.right);

      return node;
    };

    this.root = helper(this.root);
  }

  find(val: number): boolean {
    const helper = (node: TreeNode | null): boolean => {
      if (!node) return false;
      if (node.val == val) return true;

      if (node.val > val) return helper(node.left);
      return helper(node.right);
    };

    return !!helper(this.root);
  }

  delete(val: number) {
    const helper = (node: TreeNode | null, val: number): TreeNode | null => {
      if (!node) return null;

      if (node.val > val) node.left = helper(node.left, val);
      else if (node.val < val) node.right = helper(node.right, val);
      else {
        if (!node.left && !node.right) return null;
        if (node.left && !node.right) return node.left;
        if (node.right && !node.left) return node.right;

        const leftMostNode = getLeftMostNode(node.right!);

        node.val = leftMostNode.val;
        node.right = helper(node.right, leftMostNode.val);
      }

      return node;
    };

    const getLeftMostNode = (node: TreeNode): TreeNode => {
      if (!node.left) return node;
      return getLeftMostNode(node.left);
    };

    this.root = helper(this.root, val);
  }

  createBFSIterator() {
    return new BSTBFSIterator(this.root);
  }

  createDFSIterator(
    DFSStrategy: new (node: TreeNode | null) => Iterator<TreeNode>
  ) {
    return new DFSStrategy(this.root);
  }
}

class BSTBFSIterator implements Iterator<TreeNode> {
  #queue: TreeNode[] = [];

  constructor(tree: TreeNode | null) {
    if (tree) this.#queue.push(tree);
  }

  current(): TreeNode | null {
    return this.#queue[0] ?? null;
  }

  hasNext(): boolean {
    return this.#queue.length > 0;
  }

  next(): void {
    if (!this.hasNext()) throw new Error("No more Elements.");
    const node = this.#queue.shift();

    if (node?.left) this.#queue.push(node.left);
    if (node?.right) this.#queue.push(node.right);
  }
}

class BSTPreDFSIterator implements Iterator<TreeNode> {
  #stack: TreeNode[] = [];

  constructor(node: TreeNode | null) {
    if (node) this.#stack.push(node);
  }

  current(): TreeNode | null {
    return this.#stack.at(-1) ?? null;
  }

  hasNext(): boolean {
    return this.#stack.length > 0;
  }

  next(): void {
    const node = this.#stack.pop();

    if (node?.right) this.#stack.push(node.right);
    if (node?.left) this.#stack.push(node.left);
  }
}

class BSTInOrderDFSIterator implements Iterator<TreeNode> {
  #stack: TreeNode[] = [];

  constructor(root: TreeNode | null) {
    this.#leftMostInOrder(root);
  }

  current(): TreeNode | null {
    return this.#stack.at(-1) ?? null;
  }

  hasNext(): boolean {
    return this.#stack.length > 0;
  }

  next(): void {
    if (!this.hasNext()) throw new Error("No more elements.");

    const node = this.#stack.pop();
    this.#leftMostInOrder(node?.right ?? null);
  }

  #leftMostInOrder(node: TreeNode | null) {
    while (node) {
      this.#stack.push(node);
      node = node.left;
    }
  }
}

class BSTPostOrderDFSIterator implements Iterator<TreeNode> {
  #stack: TreeNode[] = [];

  constructor(root: TreeNode | null) {
    this.#buildStack(root);
  }

  current(): TreeNode | null {
    return this.#stack.at(-1) ?? null;
  }

  hasNext(): boolean {
    return this.#stack.length > 0;
  }

  next(): void {
    if (!this.hasNext()) throw new Error("No more elements.");

    this.#stack.pop();
  }

  #buildStack(node: TreeNode | null) {
    if (!node) return;

    if (node.left) this.#buildStack(node.left);
    if (node.right) this.#buildStack(node.right);

    this.#stack.push(node);
  }
}

const getTreeValChain = (iterator: Iterator<TreeNode>) => {
  let treeValChain = "";

  while (iterator.hasNext()) {
    treeValChain += (iterator.current()?.val || "") + " -> ";
    iterator.next();
  }

  return treeValChain;
};

const bst = new BinarySearchTree();

bst.insert(10);
bst.insert(2);
bst.insert(3);
bst.insert(4);
bst.insert(5);
bst.insert(11);
bst.insert(12);
bst.insert(13);
bst.insert(14);

bst.delete(10);

console.log(bst.find(10));

console.log(getTreeValChain(bst.createBFSIterator()));
console.log(getTreeValChain(bst.createDFSIterator(BSTPreDFSIterator))); //using strategy pattern
console.log(getTreeValChain(bst.createDFSIterator(BSTInOrderDFSIterator)));
console.log(getTreeValChain(bst.createDFSIterator(BSTPostOrderDFSIterator)));
