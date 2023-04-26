interface Originator {
  setState(data: EditorState): void;
  createSnapshot(): Memento;
}

interface EditorState {
  title: string;
  curX: number;
  curY: number;
  selectedChar: number;
}

interface Memento {
  restore(): void;
}

class Editor implements Originator {
  #state: EditorState = {
    title: "default",
    curX: 0,
    curY: 0,
    selectedChar: 23,
  };

  setState(data: EditorState): void {
    this.#state = data;
  }

  setTitle(title: string) {
    this.#state = { ...this.#state, title };
  }

  print(): void {
    console.log(this.#state);
  }

  createSnapshot(): Memento {
    return new Snapshot(this, this.#state);
  }
}

class Snapshot implements Memento {
  #originator;
  #state;

  constructor(originator: Originator, state: EditorState) {
    this.#originator = originator;
    this.#state = state;
  }

  restore(): void {
    this.#originator.setState(this.#state);
  }
}

class CareTaker {
  history: Memento[] = [];
  #originator: Originator;

  constructor(originator: Originator) {
    this.#originator = originator;
  }

  save() {
    const originator = this.#originator;
    if (originator) this.history.push(originator.createSnapshot());
  }

  undo() {
    const snapshot = this.history.pop();

    snapshot?.restore();
  }
}

const editor = new Editor();
const careTaker = new CareTaker(editor);

careTaker.save(); //we are calling save first because we want to store the previous state not the new update state inside our historyStack
editor.setTitle("first line");

careTaker.save();
editor.setTitle("second line");

editor.print();

careTaker.undo();
editor.print();

class BasicEditor {
  #content = "";
  #historyStack: string[] = [];

  getContent(): string {
    return this.#content;
  }

  setContent(val: string) {
    this.#historyStack.push(this.#content);
    this.#content = val;
  }

  undo() {
    const historyStack = this.#historyStack;
    const val = historyStack.pop();
    if (val != undefined) this.#content = val;
  }
}

const basicEditor = new BasicEditor();

basicEditor.setContent("A");
basicEditor.setContent("B");
basicEditor.setContent("C");
basicEditor.setContent("D");

console.log(basicEditor.getContent());
basicEditor.undo();
console.log(basicEditor.getContent());
