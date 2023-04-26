interface Component {
  render(): void;
  move(): void;
}

class Leaf implements Component {
  render(): void {
    console.log("rendering a leaf");
  }

  move(): void {
    console.log("moving a leaf");
  }
}

class Composite implements Component {
  #components: Component[] = [];

  add(component: Component) {
    this.#components.push(component);
  }

  render(): void {
    for (const component of this.#components) component.render();
  }

  move(): void {
    for (const component of this.#components) component.move();
  }
}

const composite1 = new Composite();
composite1.add(new Leaf());
composite1.add(new Leaf());

const composite2 = new Composite();
composite2.add(new Leaf());
composite2.add(new Leaf());

const composite = new Composite();
composite.add(composite1);
composite.add(composite2);

composite.render();
composite.move();
