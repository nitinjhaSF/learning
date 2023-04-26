class ConfigManager {
  static #instance = new ConfigManager();
  #settings = new Map<string, Object>();

  private constructor() {}

  get(key: string) {
    return this.#settings.get(key);
  }

  set(key: string, val: Object) {
    this.#settings.set(key, val);
  }

  static getInstance() {
    return this.#instance;
  }
}

const manager = ConfigManager.getInstance();
manager.set("name", "Nitin");

const otherManager = ConfigManager.getInstance();

console.log(otherManager.get("name"));
