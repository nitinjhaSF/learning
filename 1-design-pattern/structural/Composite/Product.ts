import {} from "node:assert";

interface Component {
  totalPrice(): number;
}

class Product implements Component {
  totalPrice(): number {
    return Math.floor(Math.random() * 1000);
  }
}

//composite class
class Box implements Component {
  #components: Component[] = [];

  add(component: Component) {
    this.#components.push(component);
  }

  totalPrice(): number {
    return this.#components.reduce(
      (acc, component) => acc + component.totalPrice(),
      0
    );
  }
}

const box1 = new Box();
box1.add(new Product());
box1.add(new Product());

const box2 = new Box();
box2.add(new Product());
box2.add(new Product());

const box = new Box();
box.add(box1);
box.add(box2);

console.log(box.totalPrice());
