import {} from "node:assert";

interface Command {
  execute(): void;
}

class AddCustomerService {
  addCustomer() {
    console.log("adding customer");
  }
}

class AddCustomerCommand implements Command {
  #service: AddCustomerService;

  constructor(service: AddCustomerService) {
    this.#service = service;
  }

  execute(): void {
    this.#service.addCustomer();
  }
}

class Button {
  #command: Command;
  #label: string = "";

  constructor(command: Command) {
    this.#command = command;
  }

  getLabel() {
    return this.#label;
  }

  setLabel(val: string) {
    this.#label = val;
  }

  click() {
    this.#command.execute();
  }
}

const service = new AddCustomerService();
const command = new AddCustomerCommand(service);
const button = new Button(command);

button.click();
