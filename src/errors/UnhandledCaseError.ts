/*
 * Error thrown when a case is encountered that is not handled in an
 * exhaustive conditional or switch statement.
 *
 * This typically indicates that a new value was added to a type but the
 * corresponding logic for handling that case has not been implemented.
 *
 * Use this error in conjunction with TypeScript's `never` type to enforce
 * compile-time checks for exhaustive handling of process states.
 */
export class UnhandledCaseError extends Error {
  constructor(value: never) {
    super(`Unhandled process state: ${value}`);
    this.name = this.constructor.name;

    // Restore prototype chain - necessary when targeting ES5
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
