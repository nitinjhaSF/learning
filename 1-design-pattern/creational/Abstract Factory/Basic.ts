//abstract factory interface
interface WidgetFactory {
  createButton(): Button;
  createTextInput(): TextInput;
}

interface TextInput {
  render(): void;
}

interface Button {
  render(): void;
}

class MaterialButton implements Button {
  render(): void {
    console.log("MaterialButton render");
  }
}

class MaterialTexInput implements TextInput {
  render(): void {
    console.log("MaterialTextInput Render");
  }
}

class BootstrapButton implements Button {
  render(): void {
    console.log("BootstrapButton Render");
  }
}

class BootstrapTextInput implements TextInput {
  render(): void {
    console.log("BootstrapTextInput Render");
  }
}

class MaterialWidgetFactory implements WidgetFactory {
  createButton(): Button {
    return new MaterialButton();
  }

  createTextInput(): TextInput {
    return new MaterialTexInput();
  }
}

class BootstrapWidgetFactory implements WidgetFactory {
  createButton(): Button {
    return new BootstrapButton();
  }

  createTextInput(): TextInput {
    return new BootstrapTextInput();
  }
}

class ContactForm {
  render(factory: WidgetFactory) {
    factory.createTextInput().render();
    factory.createButton().render();
  }
}

const contactForm = new ContactForm();

contactForm.render(new MaterialWidgetFactory());
contactForm.render(new BootstrapWidgetFactory());
