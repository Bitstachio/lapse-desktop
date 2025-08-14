import { TProcessState } from "../features/process/types";

// TODO: Add more parameters
export class UnexpectedProcessStateError extends Error {
  constructor(state: TProcessState) {
    super(`Encountered unexpected process state "${state}", which should never be reachable in this context`);
    this.name = this.constructor.name;

    // Restore prototype chain - necessary when targeting ES5
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
