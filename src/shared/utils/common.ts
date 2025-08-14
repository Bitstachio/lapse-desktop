import { UnhandledCaseError } from "../../errors/UnhandledCaseError";

/**
 * Asserts that a given value is of type `never`, enabling compile-time
 * exhaustiveness checks in switch or conditional statements.
 *
 * Use this function in the `default` case of a switch statement to ensure all
 * possible cases of a discriminated union are handled. If a new case is added
 * to the union and not handled, TypeScript will raise a compile-time error.
 *
 * @param value - The value that should never occur if all cases are properly handled.
 * @throws {UnhandledCaseError} Thrown when an unhandled case is encountered at runtime.
 *
 * NOTE: Returns the error instead of throwing it directly so that the calling
 * code can explicitly use `throw` keyword. Otherwise, if `assertNever` is used
 * without `throw`, TypeScript will treat that code path as returning `undefined`.
 */
export const assertNever = (value: never) => new UnhandledCaseError(value);
