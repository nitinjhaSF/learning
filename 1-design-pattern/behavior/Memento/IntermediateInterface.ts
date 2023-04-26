import {} from "node:assert";

interface Originator {
  setState(data: EditorState): void;
  createSnapshot(): Memento;
  restore(snapshot: Memento): void;
}

interface EditorState {
  title: string;
  curX: number;
  curY: number;
  selectedChar: number;
}

interface Memento {
  getTitle(): string;
  getState(): EditorState;
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
    return new Snapshot(this.#state);
  }

  restore(snapshot: Memento) {
    this.#state = snapshot.getState();
  }
}

class Snapshot implements Memento {
  #state: EditorState;

  constructor(state: EditorState) {
    this.#state = state;
  }

  getState() {
    return this.#state;
  }

  getTitle(): string {
    return this.#state.title;
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
    if (snapshot) this.#originator.restore(snapshot);
  }
}

const editor = new Editor();
const careTaker = new CareTaker(editor);

editor.setTitle("first line");
careTaker.save();

editor.setTitle("second line");

editor.print();

careTaker.undo();
editor.print();
