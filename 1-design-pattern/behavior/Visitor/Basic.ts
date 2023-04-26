import {} from "node:assert";

interface Visitor {
  apply(node: HeadingNode | AnchorNode): void;
}

interface HtmlNode {
  execute(visitor: Visitor): void;
}

class HeadingNode implements HtmlNode {
  execute(visitor: Visitor): void {
    visitor.apply(this);
  }
}

class AnchorNode implements HtmlNode {
  execute(visitor: Visitor): void {
    visitor.apply(this);
  }
}

class HtmlHighlightVisitor implements Visitor {
  apply(node: HeadingNode | AnchorNode): void {
    if (node instanceof HeadingNode) {
      console.log("heading highlight");
    } else if (node instanceof AnchorNode) {
      console.log("anchor highlight");
    }
  }
}

class HtmlDocument {
  #nodes: HtmlNode[] = [];

  add(node: HtmlNode) {
    this.#nodes.push(node);
  }

  execute(visitor: Visitor) {
    for (const node of this.#nodes) node.execute(visitor);
  }
}

const document = new HtmlDocument();
document.add(new HeadingNode());
document.add(new AnchorNode());
document.execute(new HtmlHighlightVisitor());
