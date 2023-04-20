type HandlerFunc = (next: () => void) => void;

interface Handler {
  setNext(handler: Handler): void;
}

class Layer implements Handler {
  #handlerFunc: HandlerFunc;
  #nextHandler: Layer | null = null;

  constructor(handler: HandlerFunc) {
    this.#handlerFunc = handler;
  }

  setNext(handler: Layer): Layer {
    this.#nextHandler = handler;

    return handler;
  }

  handler = () => {
    const nextHandler =
      this.#nextHandler?.handler ||
      (() => {
        console.log("middleware chain ended");
      });
    this.#handlerFunc(nextHandler);
  };
}

const middlewareHandlers = (...handlers: HandlerFunc[]) => {
  let wrapperHandler: Layer | undefined;
  let firstHandler: Layer | null = null;

  for (const handler of handlers) {
    if (wrapperHandler)
      wrapperHandler = wrapperHandler.setNext(new Layer(handler));
    else {
      wrapperHandler = new Layer(handler);
      firstHandler = wrapperHandler;
    }
  }

  return () => {
    return firstHandler?.handler();
  };
};

const callHandler = middlewareHandlers(
  (next) => {
    console.log("running first handler");
    next();
  },
  (next) => {
    console.log("running second handler");
    next();
  },
  (next) => {
    console.log("running third handler");
    next();
  }
);

callHandler();
