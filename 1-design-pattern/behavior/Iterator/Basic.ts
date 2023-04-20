import {} from "node:assert";

interface Iterator<T> {
  next(): void;
  hasNext(): boolean;
  current(): T;
}

class BrowseHistory {
  #urls: string[] = [];

  push(url: string) {
    this.#urls.push(url);
  }

  pop() {
    return this.#urls.pop();
  }

  getUrls() {
    return this.#urls;
  }

  createIterator(): Iterator<string> {
    return new ArrayHistoryIterator(this);
  }
}

class ArrayHistoryIterator implements Iterator<string> {
  #history: BrowseHistory;
  #iteratorPtr = 0;

  constructor(history: BrowseHistory) {
    this.#history = history;
  }

  hasNext(): boolean {
    return this.#history.getUrls().length > this.#iteratorPtr;
  }

  current(): string {
    return this.#history.getUrls()[this.#iteratorPtr];
  }

  next() {
    if (this.hasNext()) this.#iteratorPtr++;
  }
}

const history = new BrowseHistory();
history.push("google.com");
history.push("yahoo.com");
history.push("apple.com");
history.push("code.com");

const iterator = history.createIterator();

while (iterator.hasNext()) {
  console.log(iterator.current());
  iterator.next();
}
