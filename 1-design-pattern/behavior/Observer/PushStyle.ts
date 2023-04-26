interface Observer {
  update(val: number): void;
}

class Subject {
  #observers = new Set<Observer>();

  addObserver(observer: Observer) {
    this.#observers.add(observer);
  }

  removeObserver(observer: Observer) {
    this.#observers.delete(observer);
  }

  notifyObservers(val: number) {
    for (const observer of this.#observers) observer.update(val);
  }
}

class DataSource extends Subject {
  #value = 0;

  setValue(val: number) {
    this.#value = val;
    super.notifyObservers(val);
  }
}

class SpreadSheet implements Observer {
  update(val: number) {
    console.log("spreadsheet get updated data", val);
  }
}

class Chart implements Observer {
  update(val: number) {
    console.log("char get updated data", val);
  }
}

const dataSource = new DataSource();
const spreadsheet = new SpreadSheet();
const spreadsheet2 = new SpreadSheet();
const chart = new Chart();

dataSource.addObserver(spreadsheet);
dataSource.addObserver(spreadsheet2);
dataSource.addObserver(chart);
dataSource.setValue(2);
