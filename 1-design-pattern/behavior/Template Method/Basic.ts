import {} from "node:assert";

class AuditTrail {
  record() {
    console.log("Audit");
  }
}

abstract class Task {
  #auditTrail: AuditTrail;

  constructor(auditTrail: AuditTrail) {
    this.#auditTrail = auditTrail;
  }

  execute() {
    this.#auditTrail.record();
    this.doExecute();
  }

  protected abstract doExecute(): void;
}

class TransferMoneyTask extends Task {
  protected doExecute() {
    console.log("Transferring money.");
  }
}

const task = new TransferMoneyTask(new AuditTrail());

task.execute();
