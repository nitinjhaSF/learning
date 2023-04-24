import {} from "node:assert";

enum PointType {
  CAFE,
  HOSPITAL,
  HOTEL,
}

class PointIcon {
  constructor(private type: PointType, private icon: string | null) {}

  getType() {
    return this.type;
  }

  getIcon() {
    return this.icon;
  }
}

class Point {
  constructor(public x: number, public y: number, public icon: PointIcon) {}

  draw() {
    console.log("draw point", this.icon.getType(), this.x, this.y);
  }
}

//flyweight factory object
class PointIconFactory {
  #hmap = new Map<PointType, PointIcon>();

  getPointIcon(type: PointType): PointIcon {
    if (!this.#hmap.get(type)) this.#hmap.set(type, new PointIcon(type, null));

    return this.#hmap.get(type)!;
  }
}

class PointService {
  #points: Point[] = [];
  constructor(private iconFactory: PointIconFactory) {}

  getPoints() {
    const point = new Point(
      12,
      32,
      this.iconFactory.getPointIcon(PointType.CAFE)
    );
    this.#points.push(point);

    return this.#points;
  }
}

const service = new PointService(new PointIconFactory());

for (const point of service.getPoints()) point.draw();
