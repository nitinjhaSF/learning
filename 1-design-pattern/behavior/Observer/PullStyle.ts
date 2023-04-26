import {} from "node:assert";

interface Observer {
  update(): void;
}

class Subject {
  #observers = new Set<Observer>();

  addObserver(observer: Observer) {
    this.#observers.add(observer);
  }

  removeObserver(observer: Observer) {
    this.#observers.delete(observer);
  }

  notifyObservers() {
    for (const observer of this.#observers) observer.update();
  }
}

class DataSource extends Subject {
  #value = 0;

  getValue() {
    return this.#value;
  }

  setValue(val: number) {
    this.#value = val;
    super.notifyObservers();
  }
}

class SpreadSheet implements Observer {
  #dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.#dataSource = dataSource;
  }

  update() {
    console.log("spreadsheet get updated data", this.#dataSource.getValue());
  }
}

class Chart implements Observer {
  #dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.#dataSource = dataSource;
  }

  update() {
    console.log("char get updated data", this.#dataSource.getValue());
  }
}

const dataSource = new DataSource();
const spreadsheet = new SpreadSheet(dataSource);
const spreadsheet2 = new SpreadSheet(dataSource);
const chart = new Chart(dataSource);

dataSource.addObserver(spreadsheet);
dataSource.addObserver(spreadsheet2);
dataSource.addObserver(chart);
dataSource.setValue(2);
dataSource.removeObserver(spreadsheet2);
dataSource.setValue(1);
