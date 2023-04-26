//mediator
abstract class Mediator {
  abstract notify(control: UIControl): void;
}

class UIControl {
  protected owner: Mediator;

  constructor(owner: Mediator) {
    this.owner = owner;
  }
}

class ElementListControl extends UIControl {
  #selection: string = "";

  getSelection() {
    return this.#selection;
  }

  setSelection(val: string) {
    this.#selection = val;
    this.owner.notify(this);
  }
}

class InputTextControl extends UIControl {
  #content: string = "";

  getContent() {
    return this.#content;
  }

  setContent(val: string) {
    this.#content = val;
    this.owner.notify(this);
  }
}

class ButtonControl extends UIControl {
  #isEnabled: boolean = false;

  isEnabled() {
    return this.#isEnabled;
  }

  setIsEnabled(enable: boolean) {
    this.#isEnabled = enable;
    this.owner.notify(this);
  }
}

class ArticleMediator extends Mediator {
  #elementList = new ElementListControl(this);
  #inputText = new InputTextControl(this);
  #button = new ButtonControl(this);

  simulateUserClick() {
    this.#elementList.setSelection("Article 1");
    console.log(this.#inputText.getContent());
    console.log(this.#button.isEnabled());
  }

  notify(control: UIControl): void {
    if (control == this.#elementList) this.onElementList();
    else if (control == this.#inputText) this.onInputText();
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

const article = new ArticleMediator();

article.simulateUserClick();
