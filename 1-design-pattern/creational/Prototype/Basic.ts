interface Component {
  render(): void;
  clone(): Component;
}

class Circle implements Component {
  #radius = 0;

  getRadius() {
    return this.#radius;
  }

  setRadius(radius: number) {
    this.#radius = radius;
  }

  render(): void {
    console.log("rendering circle");
  }

  clone(): Component {
    const newCircle = new Circle();
    newCircle.setRadius(this.#radius);

    return newCircle;
  }
}

class ContextMenu {
  duplicate(component: Component) {
    const newComponent = component.clone();
  }
}
