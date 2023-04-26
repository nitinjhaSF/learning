import {} from "node:assert";

interface Observer {
  update(): void;
}

abstract class UIControl {
  #observers = new Set<Observer>();

  addEventHandler(observer: Observer) {
    this.#observers.add(observer);
  }

  protected notifyObservers() {
    for (const observer of this.#observers) observer.update();
  }
}

class ElementListControl extends UIControl {
  #selection: string = "";

  getSelection() {
    return this.#selection;
  }

  setSelection(val: string) {
    this.#selection = val;
    this.notifyObservers();
  }
}

class InputTextControl extends UIControl {
  #content: string = "";

  getContent() {
    return this.#content;
  }

  setContent(val: string) {
    this.#content = val;
    this.notifyObservers();
  }
}

class ButtonControl extends UIControl {
  #isEnabled: boolean = false;

  isEnabled() {
    return this.#isEnabled;
  }

  setIsEnabled(enable: boolean) {
    this.#isEnabled = enable;
    this.notifyObservers();
  }
}

class ArticleDialogBox {
  #elementList = new ElementListControl();
  #inputText = new InputTextControl();
  #button = new ButtonControl();

  constructor() {
    this.#elementList.addEventHandler({
      update: () => {
        this.onElementList();
      },
    });
    this.#inputText.addEventHandler({
      update: () => {
        this.onInputText();
      },
    });
    this.#button.addEventHandler({ update() {} });
  }

  simulateUserClick() {
    this.#elementList.setSelection("Article 1");
    console.log(this.#inputText.getContent());
    console.log(this.#button.isEnabled());
  }

  onElementList() {
    this.#inputText.setContent(this.#elementList.getSelection());
    this.#button.setIsEnabled(true);
  }

  onInputText() {
    const isEmpty = this.#inputText.getContent().length > 0;
    this.#button.setIsEnabled(!isEmpty);
  }
}

const article = new ArticleDialogBox();

article.simulateUserClick();
