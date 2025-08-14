export class InvalidArgumentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;

    // Restore prototype chain - necessary when targeting ES5
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
