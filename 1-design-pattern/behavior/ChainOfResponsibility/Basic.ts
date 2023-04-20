interface Handler {
  setNext(handler: Handler): void;
}

class BaseHandler implements Handler {
  #nextPtr: null | BaseHandler = null;
  setNext(handler: BaseHandler): BaseHandler {
    this.#nextPtr = handler;
    return handler;
  }

  handler(data: string): string | null {
    if (this.#nextPtr == null) return null;
    return this.#nextPtr.handler(data);
  }
}

class Button extends BaseHandler {
  handler(data: string): string | null {
    if (data == "button") {
      return "Button handled the request";
    }
    return super.handler(data);
  }
}

class Dialog extends BaseHandler {
  handler(data: string): string | null {
    if (data === "dialog") return "Dialog handled the request";
    return super.handler(data);
  }
}

class SideBar extends BaseHandler {
  handler(data: string): string | null {
    if (data === "sidebar") return "Sidebar handled the request";
    return super.handler(data);
  }
}

const sidebar = new SideBar();
const dialog = new Dialog();
const button = new Button();

button.setNext(dialog).setNext(sidebar);

console.log(button.handler("dialog"));
console.log(button.handler("button"));
console.log(button.handler("sidebar"));
console.log(button.handler("sidebar2"));
console.log(dialog.handler("sidebar"));
