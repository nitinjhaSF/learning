interface Adaptor<T> {
  execute(data: T): void;
}

interface XMLFormat {
  data: string;
}

interface JsonFormat {
  json: string;
}

class StockDataProvider {
  getData(adaptor: Adaptor<XMLFormat>) {
    adaptor.execute({ data: "Some xml data" });
  }
}

class AnalysisLibrary {
  init() {
    console.log("initialized");
  }

  analyses(data: JsonFormat) {
    console.log("Analysing json data", data.json);
  }
}

class XMLToJsonAdaptor implements Adaptor<XMLFormat> {
  #lib = new AnalysisLibrary();

  execute(data: XMLFormat): void {
    this.#lib.analyses({ json: data.data });
  }
}

const stockDataProvider = new StockDataProvider();

stockDataProvider.getData(new XMLToJsonAdaptor());
