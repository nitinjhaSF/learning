interface Ebook {
  show(): void;
  getFileName(): string;
}

class RealEbook implements Ebook {
  constructor(private fileName: string) {
    this.load();
  }

  load() {
    console.log("load ebook: ", this.fileName);
  }

  show() {
    console.log("show ebook: ", this.fileName);
  }

  getFileName(): string {
    return this.fileName;
  }
}

class ProxyEbook implements Ebook {
  ebook: Ebook | null = null;

  constructor(private fileName: string) {}

  show(): void {
    if (this.ebook == null) this.ebook = new RealEbook(this.fileName);
    this.ebook.show();
  }

  getFileName(): string {
    return this.fileName;
  }
}

class LoggingEbook implements Ebook {
  #ebook: Ebook | null = null;

  constructor(private fileName: string) {}

  show(): void {
    if (this.#ebook == null) this.#ebook = new RealEbook(this.fileName);

    console.log("logging ebook");
    this.#ebook.show();
  }

  getFileName(): string {
    return this.fileName;
  }
}

class Library {
  #ebooks = new Map<string, Ebook>();

  add(ebook: Ebook) {
    this.#ebooks.set(ebook.getFileName(), ebook);
  }

  openEbook(fileName: string) {
    const ebook = this.#ebooks.get(fileName);
    if (ebook == undefined) return;

    ebook.show();
  }
}

const ebookNames = [
  "Quantum Physics",
  "String Theory",
  "Quantum Enlightenment",
];

const library = new Library();

for (const ebookName of ebookNames) library.add(new LoggingEbook(ebookName));

library.openEbook("Quantum Physics");
library.openEbook("Quantum Enlightenment");
