/**
 * Payload factory for actions (CRUD / inline mutations).
 * - `create[Action]WithSuccess()` -> happy path, `create[Action]WithErrors()` -> validation error
 * - Scope and runtime ids are parameters, never hardcoded.
 * - Return types are inferred from the object literal.
 */
export class ExampleFactory {
  static createItemWithSuccess(name: string = `Item ${Date.now()}`) {
    return { name, quantity: 1 };
  }

  static createItemWithErrors() {
    return { name: 123 as unknown as string, quantity: 'invalid' as unknown as number };
  }

  static updateItemQuantityWithSuccess(quantity: number) {
    return { quantity };
  }
}
