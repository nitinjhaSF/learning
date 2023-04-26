interface Tool {
  onMouseUp(): void;
  onMouseDown(): void;
}

class Canvas implements Tool {
  #currentState: Tool | undefined;

  setCurrentState(state: Tool) {
    this.#currentState = state;
  }

  onMouseUp() {
    this.#currentState?.onMouseUp();
  }

  onMouseDown(): void {
    this.#currentState?.onMouseDown();
  }
}

class Selector implements Tool {
  onMouseUp(): void {
    console.log("completed selector drawing");
  }

  onMouseDown(): void {
    console.log("completed drawing with selector");
  }
}

class Brush implements Tool {
  onMouseUp(): void {
    console.log("completed drawing with brush");
  }

  onMouseDown(): void {
    console.log("drawing with brush");
  }
}

class Eraser implements Tool {
  onMouseUp(): void {
    console.log("completed erasing");
  }

  onMouseDown(): void {
    console.log("using eraser");
  }
}

const canvas = new Canvas();
canvas.setCurrentState(new Selector());
canvas.onMouseDown();
canvas.onMouseUp();
